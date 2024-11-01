package com.clms.api.questions.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class QuestionsFromYoutubeVideoRequest {
    private String videoUrl;
}
