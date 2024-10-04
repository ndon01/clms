package com.clms.api.users;

import com.clms.api.common.domain.User;
import org.hibernate.query.Page;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {
    @Query("SELECT u FROM User u WHERE LOWER(u.username) = LOWER(:username)")
    Optional<User> getByUsername(String username);

    Optional<User> getUserByUsernameIgnoreCase(String username);

    boolean existsByUsername(String username);

    @Query("SELECT u FROM User u")
    List<User> getUsers();

}