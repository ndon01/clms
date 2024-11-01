CREATE TABLE IF NOT EXISTS question_generation_orders (
    id SERIAL PRIMARY KEY,
    ordered_by INT REFERENCES users(id),
    order_state VARCHAR(255),
    order_type VARCHAR(255),
    order_details TEXT,
    order_output TEXT
);