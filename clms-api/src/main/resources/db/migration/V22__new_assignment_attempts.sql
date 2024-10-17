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