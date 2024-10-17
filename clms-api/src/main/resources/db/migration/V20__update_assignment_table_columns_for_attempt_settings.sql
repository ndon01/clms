DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1
        FROM information_schema.columns
        WHERE table_name='assignments' AND column_name='time_limit_minutes'
    ) THEN
        ALTER TABLE assignments ADD COLUMN time_limit_minutes INT NOT NULL DEFAULT -1;
    END IF;
END $$;

DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1
        FROM information_schema.columns
        WHERE table_name='assignments' AND column_name='max_attempts'
    ) THEN
        ALTER TABLE assignments ADD COLUMN max_attempts INT NOT NULL DEFAULT 1;
    END IF;
END $$;