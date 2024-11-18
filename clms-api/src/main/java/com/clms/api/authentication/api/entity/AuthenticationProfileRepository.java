package com.clms.api.authentication.api.entity;

import com.clms.api.authentication.api.entity.AuthenticationProfile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AuthenticationProfileRepository extends JpaRepository<AuthenticationProfile, Integer> {
    @Query("SELECT a FROM AuthenticationProfile a WHERE LOWER(a.username) = LOWER(:username)")
    Optional<AuthenticationProfile> getByUsername(@Param("username") String username);
}
