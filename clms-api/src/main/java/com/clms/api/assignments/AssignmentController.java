package com.clms.api.assignments;

import com.clms.api.assignments.attempts.AssignmentQuestionAttempt;
import com.clms.api.filestorage.FileMetadata;
import com.clms.api.filestorage.FileMetadataRepository;
import com.clms.api.filestorage.FileStorageService;
import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.transaction.Transactional;
import lombok.Builder;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.extern.slf4j.Slf4j;
import org.aspectj.weaver.patterns.TypePatternQuestions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/assignments")
@RequiredArgsConstructor
@Slf4j
public class AssignmentController {

    private final AssignmentRepository assignmentRepository;
    private final FileStorageService fileStorageService;
    private final FileMetadataRepository fileMetadataRepository;
    private final AssignmentFileRepository assignmentFileRepository;
    private final ObjectMapper mapper = new ObjectMapper();
    // Get all assignments
    @GetMapping
    public List<Assignment> getAllAssignments() {
        return assignmentRepository.findAll();
    }

    // Get an assignment by ID
    @GetMapping("/{id}")
    public ResponseEntity<Assignment> getAssignmentById(@PathVariable int id) {
        Optional<Assignment> assignment = assignmentRepository.findById(id);
        if (assignment.isPresent()) {
            return ResponseEntity.ok(assignment.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/getAssignmentDetails")
    public ResponseEntity<AssignmentDetailsResponse> getAssignmentDetails(@RequestParam("assignmentId") Integer assignmentId) {
        Assignment assignment = assignmentRepository.findById(assignmentId).orElse(null);
        if (assignment == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(
                AssignmentDetailsResponse
                .builder()
                .id(assignment.getId())
                .name(assignment.getName())
                .description(assignment.getDescription())
                .startDate(assignment.getStartDate())
                .dueDate(assignment.getDueDate())
                .build()
        );
    }

    @GetMapping("/{id}/attempt")
    public ResponseEntity<AssignmentQuestionAttemptResponse> getAssignmentForAttemptById(@PathVariable int id) {
        log.info("Fetching assignment with id: {}", id);

        Optional<Assignment> assignmentOptional = assignmentRepository.findById(id);

        if (assignmentOptional.isPresent()) {
            Assignment assignment = assignmentOptional.get();
            log.info("Assignment found: {}", assignment);

            AssignmentQuestionAttemptResponse response = new AssignmentQuestionAttemptResponse();
            response.setAssignmentId(assignment.getId());
            response.setQuestions(assignment.getQuestions());

            List<AssignmentQuestionAnswerAttempt> filteredAnswers = new ArrayList<>();

            // Process each question in the assignment
            for (AssignmentQuestion question : assignment.getQuestions()) {
                log.info("Processing question with id: {}", question.getId());
                try {
                    List<AssignmentQuestionAnswerAttempt> filteredAnswerAttempts = new ArrayList<>();
                    for (AssignmentQuestionAnswer answer : question.getAnswers()) {
                        AssignmentQuestionAnswerAttempt answerAttempt = new AssignmentQuestionAnswerAttempt();
                        answerAttempt.setText(answer.getText());
                        filteredAnswerAttempts.add(answerAttempt);
                    }

                    // Set the filtered answers to the response
                    response.setAnswers(filteredAnswerAttempts);

                } catch (Exception e) {
                    log.error("Error parsing answers JSON for question id: {}", question.getId(), e);
                    return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
                }
            }

            log.info("Returning response for assignment id: {}", assignment.getId());
            return ResponseEntity.ok(response);
        } else {
            log.warn("Assignment with id {} not found", id);
            return ResponseEntity.notFound().build();
        }
    }

    // Utility method to save answers as JSON
    public String serializeAnswersToJson(List<AssignmentQuestionAnswer> answers) {
        try {
            return mapper.writeValueAsString(answers);  // Serializing list of answers to JSON string
        } catch (Exception e) {
            log.error("Error serializing answers to JSON", e);
            return "[]";  // Return an empty JSON array in case of an error
        }
    }


    // Create a new assignment
    @PostMapping
    public Assignment createAssignment(@RequestBody Assignment assignment) {
        assignment.setCreatedAt(new Date()); // Set created_at to the current timestamp
        assignment.setUpdatedAt(new Date()); // Set updated_at to the current timestamp
        return assignmentRepository.save(assignment);
    }

    // Update an existing assignment
    @PutMapping("/{id}")
    public ResponseEntity<Assignment> updateAssignment(@PathVariable int id, @RequestBody Assignment assignmentDetails) {
        Optional<Assignment> optionalAssignment = assignmentRepository.findById(id);

        if (optionalAssignment.isPresent()) {
            Assignment assignment = optionalAssignment.get();
            assignment.setName(assignmentDetails.getName());
            assignment.setDescription(assignmentDetails.getDescription());
            assignment.setStartDate(assignmentDetails.getStartDate());
            assignment.setDueDate(assignmentDetails.getDueDate());
            assignment.setUpdatedAt(new Date()); // Update the updated_at timestamp
            assignment.setMaxAttempts(assignmentDetails.getMaxAttempts());
            assignment.setTimeLimitMinutes(assignmentDetails.getTimeLimitMinutes());

            Assignment updatedAssignment = assignmentRepository.save(assignment);
            return ResponseEntity.ok(updatedAssignment);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // Delete an assignment
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAssignment(@PathVariable int id) {
        Optional<Assignment> optionalAssignment = assignmentRepository.findById(id);
        if (optionalAssignment.isPresent()) {
            assignmentRepository.delete(optionalAssignment.get());
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/{id}/files")
    public ResponseEntity<?> uploadFile(@PathVariable int id, MultipartFile file) {
        Optional<Assignment> assignmentOptional = assignmentRepository.findById(id);
        if (assignmentOptional.isEmpty()) {
            return ResponseEntity.badRequest().body("Assignment not found");
        }

        FileMetadata fileMetadata = fileStorageService.createFile("assignments/files", file);
        AssignmentFile assignmentFile = new AssignmentFile();
        assignmentFile.setFileMetadata(fileMetadata);
        assignmentFile.setAssignment(assignmentOptional.get());
        assignmentFileRepository.saveAndFlush(assignmentFile);

        return ResponseEntity.status(201).header("location", "/api/assignments/files/" + assignmentFile.getId()).build();
    }

    @GetMapping("/files/{fileId}")
    public ResponseEntity<Resource> downloadFile(@PathVariable UUID fileId, HttpServletRequest request) {
        Optional<AssignmentFile> assignmentFileOptional = assignmentFileRepository.findById(fileId);
        if (assignmentFileOptional.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        AssignmentFile assignmentFile = assignmentFileOptional.get();
        FileMetadata fileMetadata = assignmentFile.getFileMetadata();

        Resource fileResource = fileStorageService.getFile(fileMetadata);

        if (fileResource == null) {
            return ResponseEntity.notFound().build();
        }

        // Try to determine file's content type
        String contentType = null;
        try {
            contentType = request.getServletContext().getMimeType(fileResource.getFile().getAbsolutePath());
        } catch (Exception e) {
            log.error("Could not determine file type.", e);
        }

        // Fallback to a default content type if not able to determine
        if (contentType == null) {
            contentType = "application/octet-stream";
        }

        // Return the file as a ResponseEntity with proper headers
        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(contentType))
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + fileResource.getFilename() + "\"")
                .body(fileResource);
    }
}

