-- Study Planner Database - Sample Data
-- Insert sample assignments for testing

INSERT INTO assignments
    (id, title, description, subject, priority, status, due_date, created_at, updated_at)
VALUES
    (1, 'Calculus Problem Set 4', 'Complete problems 1-20 from chapter 8. Focus on integration by parts.', 'Mathematics', 'High', 'Pending', '2026-03-10', datetime('now'), datetime('now')),
    (2, 'Essay: Industrial Revolution', '2500 word essay analyzing economic impacts. Include primary sources.', 'History', 'Medium', 'Pending', '2026-03-20', datetime('now'), datetime('now')),
    (3, 'Reading Chapters 5-7', 'Read and annotate chapters 5 through 7 of The Great Gatsby.', 'Literature', 'Low', 'Pending', '2026-03-18', datetime('now'), datetime('now'));
