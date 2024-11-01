package com.clms.api.youtube;

import com.clms.api.filestorage.CustomMultipartFile;
import com.clms.api.filestorage.FileMetadata;
import com.clms.api.filestorage.FileStorageService;
import lombok.RequiredArgsConstructor;
import org.json.JSONObject;
import org.json.JSONArray;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.safety.Safelist;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClientException;
import org.springframework.web.client.RestTemplate;

import java.util.*;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Service
@RequiredArgsConstructor
public class YoutubeTranscriptService {

    private static final String WATCH_URL = "https://www.youtube.com/watch?v={videoId}";

    private final RestTemplate restTemplate = new RestTemplate();

    private final FileStorageService fileStorageService;

    private final YoutubeVideoTranscriptRepository transcriptRepository;

    public YoutubeVideoTranscriptEntity fetchAndStoreTranscript(String videoId, boolean preserveFormatting) throws Exception {
        Optional<YoutubeVideoTranscriptEntity> existingTranscript = transcriptRepository.findFirstByVideoId(videoId);

        if (existingTranscript.isPresent()) {
            return existingTranscript.get();
        }

        List<Map<String, Object>> transcriptData = fetchTranscript(videoId, preserveFormatting);
        String captionsXml = generateCaptionsXml(transcriptData);

        CustomMultipartFile captionFile = CustomMultipartFile.builder()
                .bytes(captionsXml.getBytes())
                .originalFilename("captions_" + videoId + ".xml")
                .contentType("text/xml")
                .build();

        FileMetadata fileMetadata = fileStorageService.createFile("yt-captions", captionFile);

        YoutubeVideoTranscriptEntity transcriptEntity = YoutubeVideoTranscriptEntity.builder()
                .videoId(videoId)
                .fileMetadata(fileMetadata)
                .build();

        return transcriptRepository.save(transcriptEntity);
    }

    private List<Map<String, Object>> fetchTranscript(String videoId, boolean preserveFormatting) throws Exception {
        String html = fetchVideoHtml(videoId);
        JSONObject captionsJson = extractCaptionsJson(html, videoId);
        return parseTranscripts(captionsJson, videoId, preserveFormatting);
    }

    private String fetchVideoHtml(String videoId) throws RestClientException {
        HttpHeaders headers = new HttpHeaders();
        headers.add("Accept-Language", "en-US");
        HttpEntity<String> entity = new HttpEntity<>(headers);

        ResponseEntity<String> response = restTemplate.getForEntity(WATCH_URL, String.class, videoId);
        return response.getBody();
    }

    private JSONObject extractCaptionsJson(String html, String videoId) throws Exception {
        String[] splittedHtml = html.split("\"captions\":");
        if (splittedHtml.length <= 1) throw new Exception("Transcripts Disabled");

        String captionsString = splittedHtml[1].split(",\"videoDetails")[0].replace("\n", "");
        JSONObject captionsJson = new JSONObject(captionsString).getJSONObject("playerCaptionsTracklistRenderer");
        if (!captionsJson.has("captionTracks")) throw new Exception("No Transcript Available");

        return captionsJson;
    }

    private List<Map<String, Object>> parseTranscripts(JSONObject captionsJson, String videoId, boolean preserveFormatting) {
        JSONArray captionTracks = captionsJson.getJSONArray("captionTracks");
        String url = captionTracks.getJSONObject(0).getString("baseUrl");

        HttpHeaders headers = new HttpHeaders();
        headers.add("Accept-Language", "en-US");
        HttpEntity<String> entity = new HttpEntity<>(headers);

        ResponseEntity<String> response = restTemplate.getForEntity(url, String.class);
        return TranscriptParser.parse(response.getBody(), preserveFormatting);
    }

    private String generateCaptionsXml(List<Map<String, Object>> transcriptData) {
        StringBuilder captionsXml = new StringBuilder("<captions>");
        for (Map<String, Object> line : transcriptData) {
            captionsXml.append("<caption>")
                    .append("<start>").append(line.get("start")).append("</start>")
                    .append("<duration>").append(line.get("duration")).append("</duration>")
                    .append("<text>").append(line.get("text")).append("</text>")
                    .append("</caption>");
        }
        captionsXml.append("</captions>");
        return captionsXml.toString();
    }

    static class TranscriptParser {
        public static List<Map<String, Object>> parse(String plainData, boolean preserveFormatting) {
            Document doc = Jsoup.parse(plainData);
            doc.outputSettings(new Document.OutputSettings().prettyPrint(false));
            doc.select("br").before("\\n");
            doc.select("p").before("\\n\\n");

            List<Map<String, Object>> transcripts = new ArrayList<>();
            Matcher matcher = Pattern.compile("<text start=\"(\\d+(\\.\\d+)?)\" dur=\"(\\d+(\\.\\d+)?)\">(.*?)</text>")
                    .matcher(doc.toString());

            while (matcher.find()) {
                Map<String, Object> transcriptData = new HashMap<>();
                transcriptData.put("start", Double.parseDouble(matcher.group(1)));
                transcriptData.put("duration", Double.parseDouble(matcher.group(3)));
                transcriptData.put("text", Jsoup.clean(matcher.group(5), Safelist.none()));
                transcripts.add(transcriptData);
            }

            return transcripts;
        }
    }
}
