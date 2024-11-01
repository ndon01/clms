CREATE TABLE IF NOT EXISTS youtube_video_transcripts (
    id SERIAL PRIMARY KEY,
    video_id VARCHAR(255) NOT NULL,
    file_metadata_id UUID NOT NULL,
    
    CONSTRAINT fk_file_metadata_id FOREIGN KEY (file_metadata_id) REFERENCES file_metadata(id)
);