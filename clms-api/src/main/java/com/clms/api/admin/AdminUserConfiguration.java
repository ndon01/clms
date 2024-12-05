package com.clms.api.admin;

import com.clms.api.authentication.api.entity.AuthenticationProfile;
import com.clms.api.authentication.api.entity.AuthenticationProfileRepository;
import com.clms.api.authentication.passwords.services.PasswordHashingComponent;
import com.clms.api.authorization.permissions.PermissionRepository;
import com.clms.api.authorization.roles.RoleRepository;
import com.clms.api.users.UserRepository;
import com.clms.api.users.api.User;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.ApplicationListener;
import org.springframework.context.annotation.Configuration;
import org.springframework.boot.context.event.ApplicationReadyEvent;

import java.util.stream.Collectors;

@Configuration
@RequiredArgsConstructor
public class AdminUserConfiguration implements ApplicationListener<ApplicationReadyEvent> {

    private final AuthenticationProfileRepository authenticationProfileRepository;
    private final UserRepository userRepository;
    private final PasswordHashingComponent passwordHashingComponent;
    private final RoleRepository roleRepository;
    private final PermissionRepository permissionRepository;

    @Value("${clms.admin-user.password:Changeme#2024}")
    private String defaultPassword;

    @Value("${clms.admin-user.username:Admin}")
    private String adminUsername;

    @Value("${clms.admin-user.enabled:false}")
    private boolean adminUserEnabled;

    @Override
    @Transactional
    public void onApplicationEvent(ApplicationReadyEvent event) {
        if (!adminUserEnabled) {
            System.out.println("Admin user initialization is disabled. Skipping initialization.");
            return;
        }

        User adminUser = userRepository.findByUsername(adminUsername);
        if (adminUser == null) {
            adminUser = new User();
            adminUser.setUsername(adminUsername);
            adminUser.setRoles(roleRepository.findAll().stream().collect(Collectors.toSet()));
            adminUser.setPermissions(permissionRepository.findAll().stream().collect(Collectors.toSet()));
            userRepository.save(adminUser);
            System.out.println("Admin user has been created with default credentials.");
        } else {
            System.out.println("Admin user already exists. Skipping initialization.");
        }

        AuthenticationProfile authenticationProfile = authenticationProfileRepository.findById(adminUser.getAuthenticationProfileId()).orElse(null);
        if (authenticationProfile == null) {
            System.out.println("Admin user does not have an authentication profile. Skipping initialization.");
            authenticationProfile = new AuthenticationProfile();
            authenticationProfile.setUserId(adminUser.getId());
            authenticationProfile.setPasswordHash(passwordHashingComponent.hash(defaultPassword));
            authenticationProfileRepository.save(authenticationProfile);
            adminUser.setAuthenticationProfileId(authenticationProfile.getId());
            userRepository.save(adminUser);
        } else {
            if (passwordHashingComponent.match(defaultPassword, authenticationProfile.getPasswordHash())) {
                System.out.println("Admin user has the default password. Skipping initialization.");
            } else {
                authenticationProfile.setPasswordHash(passwordHashingComponent.hash(defaultPassword));
                authenticationProfileRepository.save(authenticationProfile);
                System.out.println("Admin user password has been reset to the default password.");
            }
        }

        System.out.println("Ensuring Admin user has all authorizations initialized.");
        adminUser.setRoles(roleRepository.findAll().stream().collect(Collectors.toSet()));
        adminUser.setPermissions(permissionRepository.findAll().stream().collect(Collectors.toSet()));
        adminUser.setUsername(adminUsername);
        userRepository.save(adminUser);

    }
}
