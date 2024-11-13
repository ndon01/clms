ALTER TABLE assignment_attempts ADD COLUMN IF NOT EXISTS started_at timestamp;

create table if not exists event_publication
(
    id               uuid not null
        primary key,
    completion_date  timestamp(6) with time zone,
    event_type       varchar(255),
    listener_id      varchar(255),
    publication_date timestamp(6) with time zone,
    serialized_event varchar(255)
);

DO $$
BEGIN
    -- Check if `keep_answers_ordered` column does not exist in the `questions` table
    IF NOT EXISTS (
        SELECT 1
        FROM information_schema.columns
        WHERE table_name = 'questions'
        AND column_name = 'keep_answers_ordered'
    ) THEN

        -- Add `keep_answers_ordered` column as a boolean with a default value of `false`
        ALTER TABLE questions
        ADD COLUMN keep_answers_ordered BOOLEAN DEFAULT false;

    END IF;
END $$;


