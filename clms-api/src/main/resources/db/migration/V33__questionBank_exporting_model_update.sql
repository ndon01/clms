ALTER TABLE question_bank_questions
    ADD COLUMN IF NOT EXISTS source_question_id INT REFERENCES questions(id);
ALTER TABLE questions
    ADD COLUMN IF NOT EXISTS source_question_bank_question_id INT REFERENCES question_bank_questions(id);