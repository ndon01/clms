ALTER TABLE question_bank_categories
    ADD COLUMN parent_id INTEGER REFERENCES question_bank_categories(id);
