DO $$
BEGIN
    -- Check if `question_answers` is of type `jsonb`
    IF (SELECT data_type FROM information_schema.columns 
        WHERE table_name = 'assignment_attempts' 
        AND column_name = 'question_answers') = 'jsonb' THEN
        
        -- Step 1: Alter `question_answers` column type from `jsonb` to `text`
        ALTER TABLE assignment_attempts
        ALTER COLUMN question_answers
        SET DATA TYPE text
        USING question_answers::text;
        
    END IF;
END $$;
