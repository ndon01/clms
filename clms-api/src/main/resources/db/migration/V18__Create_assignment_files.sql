CREATE TABLE IF NOT EXISTS assignment_files (
    id UUID PRIMARY KEY,
    assignment_id INT,
    file_metadata_id UUID,
    CONSTRAINT fk_file_metadata_id FOREIGN KEY (file_metadata_id) REFERENCES file_metadata (id) ON DELETE CASCADE,
    CONSTRAINT fk_assignment_id FOREIGN KEY (assignment_id) REFERENCES assignments (id) ON DELETE CASCADE
)