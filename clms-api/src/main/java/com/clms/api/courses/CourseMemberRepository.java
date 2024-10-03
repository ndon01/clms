package com.clms.api.courses;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CourseMemberRepository extends JpaRepository<CourseMember, CourseMemberId> {
    // You can add custom query methods here if needed
}
