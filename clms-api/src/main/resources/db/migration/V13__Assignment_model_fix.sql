-- 1. Create a sequence for each table
CREATE SEQUENCE assignments_id_seq;
CREATE SEQUENCE questions_id_seq;
CREATE SEQUENCE assignment_attempts_id_seq;
CREATE SEQUENCE question_attempts_id_seq;

-- 2. Attach the sequence to the existing id column for each table
ALTER TABLE assignments ALTER COLUMN id SET DEFAULT nextval('assignments_id_seq');
ALTER TABLE questions ALTER COLUMN id SET DEFAULT nextval('questions_id_seq');
ALTER TABLE assignment_attempts ALTER COLUMN id SET DEFAULT nextval('assignment_attempts_id_seq');
ALTER TABLE question_attempts ALTER COLUMN id SET DEFAULT nextval('question_attempts_id_seq');

-- 3. Set the sequence to start from the max current value + 1
SELECT setval('assignments_id_seq', (SELECT MAX(id) FROM assignments));
SELECT setval('questions_id_seq', (SELECT MAX(id) FROM questions));
SELECT setval('assignment_attempts_id_seq', (SELECT MAX(id) FROM assignment_attempts));
SELECT setval('question_attempts_id_seq', (SELECT MAX(id) FROM question_attempts));
