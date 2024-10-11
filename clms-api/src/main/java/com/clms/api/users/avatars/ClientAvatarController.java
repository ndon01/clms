package com.clms.api.users.avatars;

import com.clms.api.common.domain.User;
import com.clms.api.common.security.currentUser.CurrentUser;
import com.clms.api.common.security.requiresUser.RequiresUser;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/v1/users/client/avatar")
@RequiredArgsConstructor
@Slf4j
public class ClientAvatarController {

    private final ClientAvatarService clientAvatarService;

    @GetMapping
    @RequiresUser
    public ResponseEntity<Resource> getClientAvatar(@CurrentUser User user, HttpServletRequest request) {
        Resource avatarResource = clientAvatarService.getAvatar(user);

        // If the file doesn't exist, return 404.
        if (avatarResource == null) {
            return ResponseEntity.notFound().build();
        }

        // Try to determine file's content type
        String contentType = null;
        try {
            contentType = request.getServletContext().getMimeType(avatarResource.getFile().getAbsolutePath());
        } catch (Exception e) {
            log.error("Could not determine file type.", e);
        }

        // Fallback to a default content type if not able to determine
        if (contentType == null) {
            contentType = "application/octet-stream";
        }

        // Return the file as a ResponseEntity with proper headers
        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(contentType))
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + avatarResource.getFilename() + "\"")
                .body(avatarResource);
    }
    @PostMapping
    @RequiresUser
    public ResponseEntity<Resource> updateClientAvatar(@CurrentUser User user, MultipartFile file) {
        clientAvatarService.updateAvatar(user, file);
        return ResponseEntity.ok().build();
    }


    @DeleteMapping
    @RequiresUser
    public ResponseEntity<Void> deleteClientAvatar(@CurrentUser User user) {
        clientAvatarService.deleteAvatar(user);
        return ResponseEntity.ok().build();
    }
}
