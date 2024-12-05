package com.clms.api.assignments.api.entity;

import com.clms.api.assignments.api.entity.Assignment;
import com.clms.api.filestorage.FileMetadata;
import jakarta.persistence.*;
import lombok.Data;

import java.util.UUID;

/*
CREATE TABLE IF NOT EXISTS assignment_files (
    id UUID PRIMARY KEY,
    assignment_id INT,
    file_metadata_id UUID,
    CONSTRAINT fk_file_metadata_id FOREIGN KEY (file_metadata_id) REFERENCES file_metadata (id) ON DELETE CASCADE,
    CONSTRAINT fk_assignment_id FOREIGN KEY (assignment_id) REFERENCES assignments (id) ON DELETE CASCADE
)
 */

@Entity
@Table(name = "assignment_files")
@Data
public class AssignmentFile {
    @Id
    @GeneratedValue
    @Column(name = "id", columnDefinition = "UUID")
    private UUID id;

    @ManyToOne
    @JoinColumn(name = "assignment_id")
    private Assignment assignment;

    @ManyToOne
    @JoinColumn(name = "file_metadata_id")
    private FileMetadata fileMetadata;
}
