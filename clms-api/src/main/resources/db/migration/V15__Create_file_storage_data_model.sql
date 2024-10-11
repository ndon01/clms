CREATE TABLE IF NOT EXISTS file_metadata (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,  -- Using UUID as the primary key
    file_name VARCHAR(255) NOT NULL,                -- File name, required
    file_size BIGINT NOT NULL,                      -- File size in bytes
    file_type VARCHAR(50) NOT NULL,                 -- File type (e.g., 'image/jpeg')
    aws_file_link VARCHAR(2048),                    -- AWS file link
    aws_file_bucket VARCHAR(255),                   -- AWS file bucket
    aws_file_key VARCHAR(255),                      -- AWS file key
    file_owner_id INT,                              -- Foreign key for file owner, references users(id)
    file_access_policy VARCHAR(50) DEFAULT 'PRIVATE',  -- Access policy, default to 'PRIVATE'
    CONSTRAINT fk_file_owner FOREIGN KEY (file_owner_id) REFERENCES users (id) ON DELETE SET NULL
);