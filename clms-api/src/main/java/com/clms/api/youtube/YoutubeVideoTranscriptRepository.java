package com.clms.api.youtube;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface YoutubeVideoTranscriptRepository extends JpaRepository<YoutubeVideoTranscriptEntity, Long> {
    Optional<YoutubeVideoTranscriptEntity> findFirstByVideoId(String videoId);
}
