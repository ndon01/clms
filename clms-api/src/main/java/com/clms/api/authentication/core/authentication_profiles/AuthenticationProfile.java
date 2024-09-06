package com.clms.api.authentication.core.authentication_profiles;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "authentication_profiles")
@Data
public class AuthenticationProfile {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(unique = true)
    private String username;

    @Column(name="password_hash")
    private String passwordHash;

    private int userId;
}
