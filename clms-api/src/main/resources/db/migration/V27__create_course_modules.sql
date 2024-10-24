-- Migration for course_module table
CREATE TABLE IF NOT EXISTS course_modules (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    course_id INT,
    module_order INT,
    CONSTRAINT fk_course FOREIGN KEY (course_id) REFERENCES courses(id)
);

-- Migration for course_module_item table
CREATE TABLE IF NOT EXISTS course_module_items (
    id SERIAL PRIMARY KEY,
    course_module_id INT,
    item_order INT,
    assignment_id INT,
    CONSTRAINT fk_course_module FOREIGN KEY (course_module_id) REFERENCES course_modules(id),
    CONSTRAINT fk_assignment FOREIGN KEY (assignment_id) REFERENCES assignments(id)
);
