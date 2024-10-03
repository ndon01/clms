-- Alter assignments table to change id to serial
ALTER TABLE assignments
    ALTER COLUMN id SET DATA TYPE serial;

-- Alter course_assignments table to keep id references consistent
-- No change needed as course_id and assignment_id reference other tables

-- Alter questions table to change id to serial
ALTER TABLE questions
    ALTER COLUMN id SET DATA TYPE serial;

-- Alter assignment_questions table to keep id references consistent
-- No change needed as assignment_id and question_id reference other tables

-- Alter assignment_attempts table to change id to serial
ALTER TABLE assignment_attempts
    ALTER COLUMN id SET DATA TYPE serial;

-- Alter question_attempts table to change id to serial
ALTER TABLE question_attempts
    ALTER COLUMN id SET DATA TYPE serial;
