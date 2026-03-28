BEGIN TRANSACTION;
CREATE TABLE assignments (
	id INTEGER NOT NULL, 
	title VARCHAR NOT NULL, 
	description TEXT, 
	subject VARCHAR, 
	priority VARCHAR, 
	status VARCHAR, 
	due_date DATE, 
	created_at DATETIME, 
	updated_at DATETIME, 
	PRIMARY KEY (id)
);
CREATE INDEX ix_assignments_id ON assignments (id);
COMMIT;
