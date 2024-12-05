package com.clms.api.questions.generation.impl;

import com.clms.api.assignments.api.entity.AssignmentQuestion;
import com.clms.api.assignments.api.entity.AssignmentQuestionAnswer;
import com.clms.api.assignments.api.repository.AssignmentQuestionRepository;
import com.clms.api.gemini.GeminiService;
import com.clms.api.questions.api.dto.GeneratedQuestionDTO;
import com.clms.api.youtube.YoutubeTranscriptService;
import com.clms.api.filestorage.FileStorageService;
import com.clms.api.questions.api.entity.QuestionGenerationOrderEntity;
import com.clms.api.questions.api.entity.QuestionGenerationOrderRepository;
import com.clms.api.questions.api.entity.QuestionGenerationOrderState;
import com.clms.api.questions.api.entity.QuestionGenerationOrderType;
import com.clms.api.questions.generation.QuestionGenerationHandler;
import com.clms.api.youtube.YoutubeVideoTranscriptEntity;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.*;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Service;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class YoutubeVideoQuestionGenerationHandler implements QuestionGenerationHandler {

    private final FileStorageService fileStorageService;
    private final QuestionGenerationOrderRepository questionGenerationOrderRepository;
    private final YoutubeTranscriptService transcriptService;
    private final GeminiService geminiService;
    private final ObjectMapper objectMapper = new ObjectMapper();
    private final AssignmentQuestionRepository assignmentQuestionRepository;

    @Override
    public boolean canHandle(QuestionGenerationOrderEntity order) {
        return order.getOrderType() == QuestionGenerationOrderType.YOUTUBE_VIDEO;
    }

    @Override
    public void handle(QuestionGenerationOrderEntity order) {
        order.setOrderState(QuestionGenerationOrderState.IN_PROGRESS);
        questionGenerationOrderRepository.save(order);

        Map<String, Object> orderDetails = order.getOrderDetails();

        if (orderDetails == null || !orderDetails.containsKey("videoUrl")) {
            log.error("Order details or video URL are missing");
            return;
        }

        // Retrieve video ID
        String videoUrl = (String) orderDetails.get("videoUrl");
        String videoId = extractVideoId(videoUrl);
        orderDetails.put("videoId", videoId);
        order.setOrderDetails(orderDetails);
        questionGenerationOrderRepository.save(order);

        // Download captions if not already present
        if (!orderDetails.containsKey("captionsFile")) {
            downloadCaptions(videoId, order, orderDetails);
        }

        Resource captionsFile = fileStorageService.getFileById((String) orderDetails.get("captionsFile"));
        String captionsText = extractTextBetweenTags(captionsFile);
        String prompt = loadPrompt(captionsText);
        String response = geminiService.sendPrompt(prompt);

        List<GeneratedQuestionDTO> generatedQuestions = null;
        try {
            // Deserialize response into DTOs
            generatedQuestions = parseGeminiResponse(response);
            // Handle or store the generated questions as needed
            log.info("Generated Questions: {}", generatedQuestions);
        } catch (Exception e) {
            log.error("Failed to parse question generation response", e);
            throw new RuntimeException("Failed to parse question generation response", e);
        }

        List<AssignmentQuestion> assignmentQuestions = new ArrayList<>();
        generatedQuestions.forEach(generatedQuestion -> {
            AtomicInteger i = new AtomicInteger(0);
            AssignmentQuestion assignmentQuestion = new AssignmentQuestion();
            assignmentQuestion.setTitle(generatedQuestion.getTitle());
            assignmentQuestion.setQuestion(generatedQuestion.getQuestion());
            assignmentQuestion.setAnswers(generatedQuestion.getAnswers().stream()
                    .map(generatedAnswer ->{
                        AssignmentQuestionAnswer assignmentQuestionAnswer = new AssignmentQuestionAnswer();
                        assignmentQuestionAnswer.setOrder(i.getAndIncrement());
                        assignmentQuestionAnswer.setText(generatedAnswer.getText());
                        assignmentQuestionAnswer.setCorrect(generatedAnswer.isCorrect());
                        return assignmentQuestionAnswer;
                    }).collect(Collectors.toList())

            );
            try {
                ObjectMapper objectMapper = new ObjectMapper();
                String answersJson = objectMapper.writeValueAsString(assignmentQuestion.getAnswers());
                assignmentQuestion.setAnswers(objectMapper.readValue(answersJson,
                        objectMapper.getTypeFactory().constructCollectionType(List.class, AssignmentQuestionAnswer.class)));
            } catch (JsonProcessingException e) {
            }
            assignmentQuestionRepository.save(assignmentQuestion);
            assignmentQuestions.add(assignmentQuestion);
        });

        order.setOrderOutput(
                Map.of("questions", generatedQuestions.stream()
                        .map(generatedQuestion -> Map.of(
                                "title", generatedQuestion.getTitle(),
                                "question", generatedQuestion.getQuestion(),
                                "answers", generatedQuestion.getAnswers().stream()
                                        .map(generatedAnswer -> Map.of(
                                                "text", generatedAnswer.getText(),
                                                "isCorrect", generatedAnswer.isCorrect()
                                        ))
                                        .collect(Collectors.toList())
                        ))
                        .collect(Collectors.toList()),
                        "generatedQuestionIds", assignmentQuestions.stream()
                                .map(AssignmentQuestion::getId)
                                .collect(Collectors.toList())
                )
        );

        order.setOrderState(QuestionGenerationOrderState.COMPLETED);
        questionGenerationOrderRepository.saveAndFlush(order);
    }

    private String extractVideoId(String videoUrl) {
        String videoIdExtractorRegex = "(?:https?://)?(?:www\\.)?(?:youtube\\.com/(?:[^/]+/|(?:v|e(?:mbed)?)|.*[?&]v=)|youtu\\.be/)([a-zA-Z0-9_-]{11})";
        return videoUrl.replaceAll(videoIdExtractorRegex, "$1");
    }

    private void downloadCaptions(String videoId, QuestionGenerationOrderEntity order, Map<String, Object> orderDetails) {
        try {
            YoutubeVideoTranscriptEntity transcript = transcriptService.fetchAndStoreTranscript(videoId, false);
            orderDetails.put("captionsFile", transcript.getFileMetadata().getId().toString());
            order.setOrderDetails(orderDetails);
            questionGenerationOrderRepository.save(order);
        } catch (Exception e) {
            log.error("Failed to download captions", e);
            throw new RuntimeException("Failed to download captions");
        }
    }

    private String extractTextBetweenTags(Resource captionsFile) {
        StringBuilder extractedText = new StringBuilder();
        Pattern pattern = Pattern.compile("<text>(.*?)</text>"); // Regular expression to find text between <text> tags

        try (BufferedReader reader = new BufferedReader(new InputStreamReader(captionsFile.getInputStream(), StandardCharsets.UTF_8))) {
            String line;
            while ((line = reader.readLine()) != null) {
                Matcher matcher = pattern.matcher(line);
                while (matcher.find()) {
                    extractedText.append(matcher.group(1)).append(" ");
                }
            }
            return extractedText.toString().replaceAll("&amp;#39;", "'").replaceAll("\\[&nbsp;__&nbsp;\\]", "").replaceAll("\\s{2,}", " ");
        } catch (Exception e) {
            log.error("Error reading captions file", e);
            throw new RuntimeException("Error reading captions file");
        }
    }

    private String loadPrompt(String captionsText) {
        try {
            Path path = Paths.get(new ClassPathResource("questions/generation/prompts/prompt1.txt").getURI());
            String template = Files.readString(path);
            return template.replace("{{transcript}}", captionsText);
        } catch (Exception e) {
            log.error("Failed to load prompt template", e);
            throw new RuntimeException("Failed to load prompt template", e);
        }
    }

    private List<GeneratedQuestionDTO> parseGeminiResponse(String response) throws Exception {
        JsonNode rootNode = objectMapper.readTree(response);
        String jsonContent = rootNode.path("candidates").get(0)
                .path("content").path("parts").get(0)
                .path("text").asText();

        // Remove the triple backticks and parse JSON
        String cleanedJson = jsonContent.replaceAll("```json\\n|\\n```", "");

        JsonNode questionsNode = objectMapper.readTree(cleanedJson).path("questions");

        // Map questionsNode directly to a list of GeneratedQuestionDTO
        return objectMapper.convertValue(questionsNode, new TypeReference<List<GeneratedQuestionDTO>>() {});
    }}


