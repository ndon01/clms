package com.clms.api.authentication.api.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "authentication_profiles")
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AuthenticationProfile {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(unique = true)
    private String username;

    @Column(name="password_hash")
    private String passwordHash;

    @Column(name = "google_id")
    private String googleId;

    private int userId;
}
