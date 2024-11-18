package com.clms.api.users.settings;

import com.clms.api.common.interfaces.GenericConverter;
import com.clms.api.common.security.currentUser.CurrentUser;
import com.clms.api.users.UserRepository;
import com.clms.api.users.UserService;
import com.clms.api.users.api.User;
import com.clms.api.users.api.projections.UserProjection;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/users/settings")
@RequiredArgsConstructor
@Slf4j
@Tag(name = "Settings", description = "Settings endpoints")
public class SettingsController
{
    private final SettingsService settingsService;
    private final UserRepository userRepository;
    private final GenericConverter<User, UserProjection> userProjectionConverterService;

    @PostMapping("/updatePassword")
    public ResponseEntity<?> updatePassword(@CurrentUser User user, @RequestParam String newPassword) {
        try {
            settingsService.updatePassword(user, newPassword);
        }catch(Exception e) {
            log.error("Error updating password", e);
            return ResponseEntity.badRequest().body(e.getMessage());
        }

        return ResponseEntity.ok().build();
    }
}
