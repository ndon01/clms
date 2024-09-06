package com.clms.api.authentication.core.authentication_profiles;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface AuthenticationProfileRepository extends JpaRepository<AuthenticationProfile, Integer> {
    boolean existsByUsername(String username);

    @Query("SELECT a FROM AuthenticationProfile a WHERE LOWER(a.username) = LOWER(:username)")
    Optional<AuthenticationProfile> getByUsername(@Param("username") String username);
}
