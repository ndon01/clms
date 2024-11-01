package com.clms.api.filestorage;

import lombok.RequiredArgsConstructor;
import org.springframework.core.io.InputStreamResource;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.GetObjectRequest;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;
import software.amazon.awssdk.services.s3.model.PutObjectResponse;

import java.io.*;
import java.util.UUID;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Service
@RequiredArgsConstructor
public class FileStorageService {

    private static final Logger logger = LoggerFactory.getLogger(FileStorageService.class);

    private final FileMetadataRepository fileMetadataRepository;
    private final S3Client s3Client;

    private final String defaultBucketName = "clms";
    private final String defaultLocation = "files";

    public FileMetadata createFile(MultipartFile file) {
        return createFile(defaultBucketName, defaultLocation, file);
    }

    public FileMetadata createFile(String location, MultipartFile file) {
        return createFile(defaultBucketName, location, file);
    }

    public FileMetadata createFile(String bucketName, String location, MultipartFile file) {
        String effectiveBucketName = (bucketName != null && !bucketName.isEmpty()) ? bucketName : defaultBucketName;

        try {
            // Generate a unique file identifier
            String uniqueFileName = UUID.randomUUID().toString() + "-" + file.getOriginalFilename().strip().replace(" ", "");

            // Create the S3 PutObjectRequest
            PutObjectRequest putObjectRequest = PutObjectRequest.builder()
                    .bucket(effectiveBucketName) // Use the provided bucket name or default
                    .key(location + "/" + uniqueFileName) // Use the provided location and unique file name
                    .build();

            // Upload the file to S3
            PutObjectResponse putObjectResponse = s3Client.putObject(putObjectRequest, RequestBody.fromBytes(file.getBytes()));

            // Create file metadata and save it to the repository
            FileMetadata fileMetadata = new FileMetadata();
            fileMetadata.setFileName(uniqueFileName);
            fileMetadata.setAwsFileBucket(effectiveBucketName);
            fileMetadata.setAwsFileKey(location + "/" + uniqueFileName); // Set the S3 file path
            fileMetadata.setFileType(file.getContentType());
            fileMetadata.setFileSize(file.getSize());

            // Save metadata to the repository
            fileMetadataRepository.save(fileMetadata);

            return fileMetadata; // Return saved file metadata
        } catch (Exception e) {
            logger.error("Failed to upload file to S3: {}", e.getMessage());
            throw new RuntimeException("Failed to upload file to S3", e);
        }
    }

    public Resource getFileById(UUID fileId) {
        FileMetadata fileMetadata = fileMetadataRepository.findById(fileId)
                .orElseThrow(() -> new RuntimeException("File not found"));

        return getFile(fileMetadata);
    }

    public Resource getFileById(String fileId) {
        return getFileById(UUID.fromString(fileId));
    }

    public Resource getFile(FileMetadata fileMetadata) {
        try {
            GetObjectRequest getObjectRequest = GetObjectRequest.builder()
                    .bucket(fileMetadata.getAwsFileBucket())
                    .key(fileMetadata.getAwsFileKey())
                    .build();

            // Fetch the file from S3 and return it as a Resource
            InputStream s3ObjectStream = s3Client.getObject(getObjectRequest);
            return new InputStreamResource(s3ObjectStream);

        } catch (Exception e) {
            logger.error("Failed to get file from S3: {}", e.getMessage());
            throw new RuntimeException("Failed to get file from S3", e);
        }
    }

    public void deleteFile(FileMetadata fileMetadata) {
        try {
            s3Client.deleteObject(builder -> builder.bucket(fileMetadata.getAwsFileBucket()).key(fileMetadata.getAwsFileKey()));
            fileMetadataRepository.delete(fileMetadata);
        } catch (Exception e) {
            logger.error("Failed to delete file from S3: {}", e.getMessage());
            throw new RuntimeException("Failed to delete file from S3", e);
        }
    }
}

