-- Enable the pgcrypto extension for generating UUIDs
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

DO $$
BEGIN
    -- Check if the 'id' column in 'assignment_attempts' is of type 'integer'
    IF EXISTS (
        SELECT 1
        FROM information_schema.columns
        WHERE table_name = 'assignment_attempts'
        AND column_name = 'id'
        AND data_type = 'integer'
    ) THEN
        -- Rename the existing 'assignment_attempts' table to keep a backup
        ALTER TABLE IF EXISTS assignment_attempts RENAME TO assignment_attempts_backup;

        -- Rename the existing 'question_attempts' table to keep a backup
        ALTER TABLE IF EXISTS question_attempts RENAME TO question_attempts_backup;
    END IF;
END $$;