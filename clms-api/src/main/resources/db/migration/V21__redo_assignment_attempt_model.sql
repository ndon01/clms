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

        -- Recreate the 'assignment_attempts' table with UUID primary key
        CREATE TABLE assignment_attempts
        (
            id            UUID DEFAULT gen_random_uuid() PRIMARY KEY,
            assignment_id INTEGER NOT NULL REFERENCES assignments(id),
            user_id       INTEGER NOT NULL REFERENCES users(id)
        );

        -- Recreate the 'assignment_question_attempts' table with foreign key reference to 'assignment_attempts'
        CREATE TABLE assignment_question_attempts
        (
            id               UUID DEFAULT gen_random_uuid() PRIMARY KEY,
            assignment_attempt_id UUID NOT NULL REFERENCES assignment_attempts(id),
            assignment_question_id INTEGER NOT NULL REFERENCES questions(id)
        );

        -- Set the owner of both tables to 'admin'
        ALTER TABLE assignment_attempts OWNER TO admin;
        ALTER TABLE assignment_question_attempts OWNER TO admin;
    END IF;
END $$;

CREATE TABLE IF NOT EXISTS assignment_attempts (
    id            UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    assignment_id INTEGER NOT NULL REFERENCES assignments(id),
    user_id       INTEGER NOT NULL REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS assignment_question_attempts (
    id               UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    assignment_attempt_id UUID NOT NULL REFERENCES assignment_attempts(id),
    assignment_question_id INTEGER NOT NULL REFERENCES questions(id)
);
