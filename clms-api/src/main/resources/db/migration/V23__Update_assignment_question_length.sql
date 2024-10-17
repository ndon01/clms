BEGIN;

-- Step 1: Rename the original 'question' column to 'question_backup'
ALTER TABLE questions
    RENAME COLUMN question TO question_backup;

-- Step 2: Add a new 'question' column with the 'text' type
ALTER TABLE questions
    ADD COLUMN question text;

-- Step 3: Copy the data from 'question_backup' to the new 'question' column
UPDATE questions
    SET question = question_backup;

-- Step 4: (Optional) Set a default value for the new 'question' column
ALTER TABLE questions
    ALTER COLUMN question SET DEFAULT '';

-- Step 5: Drop the 'question_backup' column if no longer needed
ALTER TABLE questions
    DROP COLUMN question_backup;

COMMIT;

BEGIN;

-- Step 1: Rename the original 'question' column to 'question_backup'
ALTER TABLE questions
    RENAME COLUMN answers TO answers_backup;

-- Step 2: Add a new 'question' column with the 'text' type
ALTER TABLE questions
    ADD COLUMN answers text;

ALTER TABLE questions
    ALTER COLUMN answers SET DEFAULT '';

-- Step 3: Copy the data from 'question_backup' to the new 'question' column
UPDATE questions
    SET answers = answers_backup;

-- Step 5: Drop the 'question_backup' column if no longer needed
ALTER TABLE questions
    DROP COLUMN answers_backup;

COMMIT;