-- Step 1: Drop the existing foreign key constraint
ALTER TABLE course_module_items
DROP CONSTRAINT fk_course_module;

-- Step 2: Recreate the foreign key constraint with ON DELETE CASCADE
ALTER TABLE course_module_items
ADD CONSTRAINT fk_course_module
FOREIGN KEY (course_module_id)
REFERENCES course_modules(id)
ON DELETE CASCADE;
