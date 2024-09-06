package com.clms.api.users;

import com.clms.api.authentication.core.authentication_profiles.AuthenticationProfile;
import jakarta.persistence.*;
import lombok.Data;

import java.sql.Date;

@Entity
@Table(name = "users")
@Data
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private int authenticationProfileId;

    private String firstName;
    private String lastName;
    @Column(unique = true)
    private String username;
    private Date dateOfBirth;
}
