package com.clms.api.gemini;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
@RequiredArgsConstructor
@Slf4j
public class GeminiService {

    private final RestTemplate restTemplate = new RestTemplate();
    private final GeminiConfiguration geminiConfiguration;


    public String sendPrompt(String prompt) {
        if (!geminiConfiguration.isEnabled()) {
            log.error("Gemini is disabled");
            throw new RuntimeException("Gemini is disabled");
        }

        try {
            HttpHeaders headers = new HttpHeaders();
            headers.set("Content-Type", "application/json");

            String urlWithApiKey = geminiConfiguration.getApiUrl() + "?key=" + geminiConfiguration.getApiKey();

            String requestBody = String.format(
                    "{\"contents\": [{\"parts\": [{\"text\": \"%s\"}]}]}",
                    prompt.replace("\"", "\\\"") // Escape double quotes
            );

            HttpEntity<String> requestEntity = new HttpEntity<>(requestBody, headers);

            ResponseEntity<String> response = restTemplate.exchange(
                    urlWithApiKey,
                    HttpMethod.POST,
                    requestEntity,
                    String.class
            );

            if (response.getBody() != null) {
                return response.getBody(); // Response from the API
            } else {
                log.error("Empty response from Gemini API");
                throw new RuntimeException("Empty response from Gemini API");
            }
        } catch (Exception e) {
            log.error("Error sending prompt to Gemini API", e);
            throw new RuntimeException("Error sending prompt to Gemini API", e);
        }
    }
}

