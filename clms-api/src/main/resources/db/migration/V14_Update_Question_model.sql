ALTER TABLE questions ADD COLUMN question_type VARCHAR(255) NOT NULL DEFAULT 'SingleChoice';
ALTER TABLE questions ADD COLUMN answers JSONB;
