-- Add the 'question_type' column if it doesn't already exist
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1
        FROM information_schema.columns
        WHERE table_name='questions' AND column_name='question_type'
    ) THEN
ALTER TABLE questions ADD COLUMN question_type VARCHAR(255) NOT NULL DEFAULT 'SingleChoice';
END IF;
END $$;

-- Add the 'answers' column if it doesn't already exist
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1
        FROM information_schema.columns
        WHERE table_name='questions' AND column_name='answers'
    ) THEN
ALTER TABLE questions ADD COLUMN answers JSONB;
END IF;
END $$;

-- Add the 'assignment_id' foreign key column if it doesn't already exist
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1
        FROM information_schema.columns
        WHERE table_name='questions' AND column_name='assignment_id'
    ) THEN
ALTER TABLE questions ADD COLUMN assignment_id INT;
ALTER TABLE questions ADD CONSTRAINT fk_assignment FOREIGN KEY (assignment_id) REFERENCES assignments(id);
END IF;
END $$;