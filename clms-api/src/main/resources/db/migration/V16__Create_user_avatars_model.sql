CREATE TABLE IF NOT EXISTS user_avatars (
    user_id INT PRIMARY KEY,                          -- Foreign key for user, references users(id)
    file_metadata_id UUID,                            -- Foreign key for file metadata, references file_metadata(id)
    CONSTRAINT fk_user_id FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE,
    CONSTRAINT fk_file_metadata_id FOREIGN KEY (file_metadata_id) REFERENCES file_metadata (id) ON DELETE CASCADE
)