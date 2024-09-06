ALTER TABLE users
DROP COLUMN email_address;

ALTER TABLE users
DROP COLUMN password_hash;

ALTER TABLE users
ADD COLUMN username VARCHAR(255) UNIQUE;

ALTER TABLE users
ADD COLUMN authentication_profile_id INTEGER