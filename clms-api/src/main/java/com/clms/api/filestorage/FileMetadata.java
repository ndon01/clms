package com.clms.api.filestorage;

import com.clms.api.users.api.User;
import jakarta.persistence.*;
import lombok.Data;

import java.util.UUID;

@Entity
@Table(name = "file_metadata")
@Data
public class FileMetadata {

    @Id
    @GeneratedValue
    @Column(name = "id", columnDefinition = "UUID")
    private UUID id;

    @Column(name = "file_name", nullable = false)
    private String fileName;

    @Column(name = "file_size", nullable = false)
    private long fileSize;  // Added file_size column

    @Column(name = "file_type", length = 50, nullable = false)
    private String fileType;  // Added file_type column (e.g., 'image/jpeg')

    @Column(name = "aws_file_link", length = 2048)
    private String awsFileLink;

    @Column(name = "aws_file_key", length = 2048)
    private String awsFileKey;

    @Column(name = "aws_file_bucket", length = 50)
    private String awsFileBucket;

    @ManyToOne
    @JoinColumn(name = "file_owner_id")
    private User fileOwner;

    @Column(name = "file_access_policy")
    @Enumerated(EnumType.STRING)
    private FileAccessPolicy fileAccessPolicy;
}
