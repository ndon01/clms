CREATE TABLE IF NOT EXISTS authentication_profiles (
    id SERIAL PRIMARY KEY,
    user_id INTEGER,
    username VARCHAR(255) UNIQUE,
    password_hash VARCHAR(255)
    )