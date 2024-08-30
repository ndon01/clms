CREATE TABLE IF NOT EXISTS user_sessions(
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL
);