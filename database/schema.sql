-- Study Planner Database Schema
-- SQLite

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

