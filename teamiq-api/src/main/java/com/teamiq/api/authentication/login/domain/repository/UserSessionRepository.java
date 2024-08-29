package com.teamiq.api.authentication.login.domain.repository;

import com.teamiq.api.authentication.login.domain.entity.UserSession;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.RequestBody;

@Repository
public interface UserSessionRepository extends JpaRepository<UserSession, Integer> {

}
