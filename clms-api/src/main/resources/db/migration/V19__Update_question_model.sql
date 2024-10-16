DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1
        FROM information_schema.columns
        WHERE table_name='questions' AND column_name='title'
    ) THEN
ALTER TABLE questions ADD COLUMN title VARCHAR(255) NOT NULL DEFAULT '';
END IF;
END $$;
