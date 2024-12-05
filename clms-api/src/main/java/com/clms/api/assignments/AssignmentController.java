package com.clms.api.assignments;

import com.clms.api.assignments.api.entity.Assignment;
import com.clms.api.assignments.api.entity.AssignmentFile;
import com.clms.api.assignments.api.entity.AssignmentQuestion;
import com.clms.api.assignments.api.entity.AssignmentQuestionAnswer;
import com.clms.api.assignments.api.projections.AssignmentDetailsProjection;
import com.clms.api.assignments.api.projections.AssignmentEditDetailsProjection;
import com.clms.api.assignments.api.projections.AssignmentProjection;
import com.clms.api.assignments.api.repository.AssignmentFileRepository;
import com.clms.api.assignments.api.repository.AssignmentQuestionRepository;
import com.clms.api.assignments.api.repository.AssignmentRepository;
import com.clms.api.common.interfaces.GenericConverter;
import com.clms.api.courses.CourseRepository;
import com.clms.api.courses.api.Course;
import com.clms.api.filestorage.FileMetadata;
import com.clms.api.filestorage.FileMetadataRepository;
import com.clms.api.filestorage.FileStorageService;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.transaction.Transactional;
import lombok.*;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
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
@Tag(name = "Assignments", description = "Endpoints for managing assignments")
public class AssignmentController {

    private final AssignmentRepository assignmentRepository;
    private final FileStorageService fileStorageService;
    private final FileMetadataRepository fileMetadataRepository;
    private final AssignmentFileRepository assignmentFileRepository;
    private final CourseRepository courseRepository;
    private final AssignmentQuestionRepository assignmentQuestionRepository;


    private final GenericConverter<Assignment, AssignmentDetailsProjection> assignmentDetailsProjectionConverter;
    private final GenericConverter<Assignment, AssignmentEditDetailsProjection> assignmentEditDetailsProjectionConverter;
    private final GenericConverter<Assignment, AssignmentProjection> assignmentProjectionConverter;
    private final ObjectMapper mapper = new ObjectMapper();
    @GetMapping
    public List<AssignmentDetailsProjection> getAllAssignments() {
        return assignmentRepository.findAll().stream().map(assignmentDetailsProjectionConverter::convert).collect(Collectors.toList());
    }

    @GetMapping("/getAssignmentEditDetails")
    @Transactional
    public AssignmentEditDetailsProjection getAssignmentEditDetails(@RequestParam Integer assignmentId) {
        Assignment assignment = assignmentRepository.findById(assignmentId).orElse(null);
        if (assignment == null) {
            return null;
        }


        return assignmentEditDetailsProjectionConverter.convert(assignment);
    }

    @GetMapping("/{id}")
    @Transactional
    public ResponseEntity<AssignmentDetailsProjection> getAssignmentById(@PathVariable int id) {
        Optional<Assignment> assignment = assignmentRepository.findById(id);
        if (assignment.isPresent()) {
            return ResponseEntity.ok(assignmentDetailsProjectionConverter.convert(assignment.get()));
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/getAssignmentDetails")
    public ResponseEntity<AssignmentDetailsProjection> getAssignmentDetails(@RequestParam("assignmentId") Integer assignmentId) {
        Assignment assignment = assignmentRepository.findById(assignmentId).orElse(null);
        if (assignment == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(
                AssignmentDetailsProjection
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
    public ResponseEntity<AssignmentProjection> getAssignmentForAttemptById(@PathVariable int id) {
        log.info("Fetching assignment with id: {}", id);

        Assignment assignment = assignmentRepository.findById(id).orElse(null);
        if (assignment == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(assignmentProjectionConverter.convert(assignment));
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
    @PostMapping("/upsert")
    public ResponseEntity<Integer> upsertAssignment(@RequestParam Boolean cloneQuestions ,@RequestBody CreateAssignmentRequestDTO createAssignmentRequestDTO) {
        Assignment assignment = createAssignmentRequestDTO.getAssignmentInfo();
        List<Integer> listOfQuestionIds = createAssignmentRequestDTO.getQuestionIds();
        Integer courseId = createAssignmentRequestDTO.getCourseId();

        Course currentCourse = courseRepository.findById(courseId).orElse(null);
        if (currentCourse == null) {
            return ResponseEntity.status(400).build();
        }

        if (assignment == null || assignment.getId() != null) {
            return ResponseEntity.status(400).build();
        }

        assignment.setCourse(currentCourse);
        assignmentRepository.save(assignment);

        if(cloneQuestions) {
            List<AssignmentQuestion> clonedQuestions = assignmentQuestionRepository.findAllById(listOfQuestionIds).stream().map(
                    question -> {
                        AssignmentQuestion assignmentQuestion = new AssignmentQuestion();
                        assignmentQuestion.setAssignment(assignment);
                        assignmentQuestion.setQuestion(question.getQuestion());
                        assignmentQuestion.setTitle(question.getTitle());
                        assignmentQuestion.setCreatedAt(new Date());
                        assignmentQuestion.setUpdatedAt(new Date());
                        assignmentQuestion.setOrder(question.getOrder());
                        assignmentQuestion.setQuestionType(question.getQuestionType());
                        assignmentQuestion.setKeepAnswersOrdered(question.getKeepAnswersOrdered());
                        assignmentQuestion.setAnswers(question.getAnswers().stream().map(
                                answer -> {
                                    AssignmentQuestionAnswer assignmentQuestionAnswer = new AssignmentQuestionAnswer();
                                    assignmentQuestionAnswer.setText(answer.getText());
                                    assignmentQuestionAnswer.setOrder(answer.getOrder());
                                    assignmentQuestionAnswer.setCorrect(answer.isCorrect());
                                    return assignmentQuestionAnswer;
                                }
                        ).collect(Collectors.toList()));
                        return assignmentQuestion;
                    }
            ).collect(Collectors.toList());

            assignmentQuestionRepository.saveAll(clonedQuestions);
        }


        return ResponseEntity.ok(assignment.getId());
    }
}


