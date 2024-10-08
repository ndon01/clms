package com.clms.api.assignments;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;
import java.util.Date;

@RestController
@RequestMapping("/api/assignments")
public class AssignmentController {

    @Autowired
    private AssignmentRepository assignmentRepository;

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

    @GetMapping("/{id}/client-scope")
    public void getClientScope(@PathVariable int id) {

    }
}
