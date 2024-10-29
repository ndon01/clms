package com.clms.api.users.avatars;

import com.clms.api.users.api.User;
import com.clms.api.filestorage.FileAccessPolicy;
import com.clms.api.filestorage.FileMetadata;
import com.clms.api.filestorage.FileStorageService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import software.amazon.awssdk.services.s3.model.NoSuchKeyException;

@Service
@RequiredArgsConstructor
@Slf4j
public class ClientAvatarService {

    private final UserAvatarRepository userAvatarRepository;
    private final FileStorageService fileStorageService;

    public Resource getAvatar(User user) {
        if (user == null) {
            return null;
        }

        // find the avatar file metadata for the user
        UserAvatar userAvatar = userAvatarRepository.findById(new UserAvatarId(user)).orElse(null);
        if (userAvatar == null) {
            return null;
        }

        // find the file metadata for the avatar
        FileMetadata fileMetadata = userAvatar.getFileMetadata();
        if (fileMetadata == null) {
            return null;
        }

        try {
            return fileStorageService.getFile(fileMetadata);
        } catch (NoSuchKeyException e) {
            log.info("File {} not found in s3 for Avatar {} ", fileMetadata.getId(), userAvatar.getId());
        }catch (Exception e) {
            return null;
        }

        // return the image from s3
        return fileStorageService.getFile(fileMetadata);
    }

    @Transactional
    public Resource updateAvatar(User user, MultipartFile file) {
        if (user == null) {
            throw new IllegalArgumentException("User cannot be null");
        }

        if (file == null) {
            throw new IllegalArgumentException("File cannot be null");
        }

        if (!file.getContentType().startsWith("image/")) {
            throw new IllegalArgumentException("Invalid file type");
        }

        UserAvatar userAvatar = userAvatarRepository.findById(new UserAvatarId(user)).orElse(null);
        if (userAvatar != null) {
            FileMetadata fileMetadata = userAvatar.getFileMetadata();
            if (fileMetadata != null) {
                fileStorageService.deleteFile(fileMetadata);
            }
        } else {
            userAvatar = new UserAvatar();
            userAvatar.setId(new UserAvatarId(user));
        }

        FileMetadata fileMetadata = fileStorageService.createFile("users/avatars", file);
        if (fileMetadata == null) {
            throw new RuntimeException("Failed to upload file");
        }

        fileMetadata.setFileOwner(user);
        fileMetadata.setFileAccessPolicy(FileAccessPolicy.PUBLIC);
        userAvatar.setFileMetadata(fileMetadata);
        userAvatarRepository.saveAndFlush(userAvatar);

        return fileStorageService.getFile(fileMetadata);
    }

    @Transactional
    public void deleteAvatar(User user) {
        if (user == null) {
            throw new IllegalArgumentException("User cannot be null");
        }

        UserAvatar userAvatar = userAvatarRepository.findById(new UserAvatarId(user)).orElse(null);
        if (userAvatar != null) {
            FileMetadata fileMetadata = userAvatar.getFileMetadata();
            if (fileMetadata != null) {
                fileStorageService.deleteFile(fileMetadata);
            }
            userAvatarRepository.delete(userAvatar);
        }
    }
}
