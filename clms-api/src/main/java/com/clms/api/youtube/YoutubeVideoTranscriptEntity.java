package com.clms.api.youtube;

import com.clms.api.filestorage.FileMetadata;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "youtube_video_transcripts")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class YoutubeVideoTranscriptEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "video_id", nullable = false)
    private String videoId;

    @ManyToOne
    @JoinColumn(name = "file_metadata_id", referencedColumnName = "id", foreignKey = @ForeignKey(name = "fk_file_metadata_id"), nullable = false)
    private FileMetadata fileMetadata;
}
