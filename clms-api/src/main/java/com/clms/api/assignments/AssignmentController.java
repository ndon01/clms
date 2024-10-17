package com.clms.api.assignments;

import com.clms.api.filestorage.FileMetadata;
import com.clms.api.filestorage.FileMetadataRepository;
import com.clms.api.filestorage.FileStorageService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Optional;
import java.util.Date;
import java.util.UUID;

@RestController
@RequestMapping("/api/assignments")
@RequiredArgsConstructor
@Slf4j
public class AssignmentController {

    private final AssignmentRepository assignmentRepository;
    private final FileStorageService fileStorageService;
    private final FileMetadataRepository fileMetadataRepository;
    private final AssignmentFileRepository assignmentFileRepository;

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
