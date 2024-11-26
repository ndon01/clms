CREATE TABLE IF NOT EXISTS category_recommendation_data (
    id BIGSERIAL PRIMARY KEY,  -- Auto-increment primary key
    user_id INT NOT NULL REFERENCES users(id),   -- Foreign key to 'user' table
    category_frequency BIGINT ,  -- Mapping for categoryFrequency
    category_id INT NOT NULL REFERENCES question_bank_categories(id),  -- Foreign key to 'question_bank_category' table
    category_score BIGINT  -- Mapping for categoryScore

    );