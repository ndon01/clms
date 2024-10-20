BEGIN;

-- Step 1: Add course_id column to assignments table
ALTER TABLE assignments
ADD COLUMN IF NOT EXISTS course_id INTEGER references courses(id);

COMMIT;


BEGIN;

UPDATE assignments a
SET course_id = ca.course_id
FROM course_assignments ca
WHERE a.id = ca.assignment_id;

COMMIT;
