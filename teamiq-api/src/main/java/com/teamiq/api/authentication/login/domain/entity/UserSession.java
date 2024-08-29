package com.teamiq.api.authentication.login.domain.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "user_sessions")
@Data
public class UserSession {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private int userId;
}
