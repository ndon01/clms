package com.clms.api.assignments;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface AssignmentFileRepository extends JpaRepository<AssignmentFile, UUID> {
}
