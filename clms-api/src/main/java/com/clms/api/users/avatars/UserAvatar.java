package com.clms.api.users.avatars;

import com.clms.api.common.domain.User;
import com.clms.api.filestorage.FileMetadata;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Entity
@Table(name = "user_avatars")
@Data
public class UserAvatar {

    @EmbeddedId
    private UserAvatarId id;

    @ManyToOne
    @JoinColumn(name = "file_metadata_id", referencedColumnName = "id", foreignKey = @ForeignKey(name = "fk_file_metadata_id"), nullable = false)
    private FileMetadata fileMetadata;
}

@Embeddable
@Data
@AllArgsConstructor
@NoArgsConstructor
class UserAvatarId implements Serializable {
    @OneToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id", foreignKey = @ForeignKey(name = "fk_user_id"))
    private User user;
}
