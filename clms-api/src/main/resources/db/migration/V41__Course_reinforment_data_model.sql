
-- Table: category_reinforcement_assigned_question
CREATE TABLE IF NOT EXISTS category_reinforcement_assigned_question (
  id SERIAL PRIMARY KEY,          -- Unique identifier for each assignment
  user_id INT NOT NULL,           -- The user to whom the question is assigned
  course_id INT,                  -- The course for the assigned question (nullable)
  question_id INT NOT NULL,       -- The question assigned to the user
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Timestamp when the assignment is created
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Timestamp for updates
  UNIQUE (user_id, course_id)     -- A user can only have one assigned question per course
);

-- Table: category_reinforcement_question_attempts
CREATE TABLE IF NOT EXISTS category_reinforcement_question_attempts (
  id SERIAL PRIMARY KEY,          -- Unique identifier for each attempt
  user_id INT NOT NULL,           -- The user making the attempt
  course_id INT,                  -- The course associated with the question (nullable)
  question_id INT NOT NULL,       -- The question being attempted
  attempt_data jsonb NOT NULL,    -- Data about the attempt (e.g., submission details)
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP -- Timestamp of the attempt
);

DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1
        FROM information_schema.table_constraints
        WHERE constraint_name = 'fk_assigned_question_user'
        AND table_name = 'category_reinforcement_assigned_question'
    ) THEN
        ALTER TABLE category_reinforcement_assigned_question
            ADD CONSTRAINT fk_assigned_question_user
            FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE;
    END IF;

    IF NOT EXISTS (
        SELECT 1
        FROM information_schema.table_constraints
        WHERE constraint_name = 'fk_question_attempts_user'
        AND table_name = 'category_reinforcement_question_attempts'
    ) THEN
        ALTER TABLE category_reinforcement_question_attempts
            ADD CONSTRAINT fk_question_attempts_user
            FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE;
    END IF;

    IF NOT EXISTS (
        SELECT 1
        FROM information_schema.table_constraints
        WHERE constraint_name = 'fk_question_attempts_question'
        AND table_name = 'category_reinforcement_question_attempts'
    ) THEN
        ALTER TABLE category_reinforcement_question_attempts
            ADD CONSTRAINT fk_question_attempts_question
            FOREIGN KEY (question_id) REFERENCES questions(id) ON DELETE CASCADE;
    END IF;
END $$;
