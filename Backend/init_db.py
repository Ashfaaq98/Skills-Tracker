# init_db.py
import sqlite3

# Define your core skills here (make sure they match the frontend)
CORE_SKILLS = [
    "Python", "JavaScript", "HTML", "CSS", "SQL",
]

def init_db():
    conn = sqlite3.connect('skill_tracker.db')
    c = conn.cursor()
    
    # Drop table if it exists to ensure clean setup (optional, good for development)
    c.execute('DROP TABLE IF EXISTS projects') 
    
    # Create the updated projects table
    # Store skills as a comma-separated string
    c.execute('''
        CREATE TABLE IF NOT EXISTS projects (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            skills TEXT NOT NULL, 
            details TEXT,
            completion_date TEXT NOT NULL
        )
    ''')
    
    # Optional: You could pre-populate a skills table if needed later, 
    # but for now, we'll manage the list directly in the backend code.
    # c.execute('DROP TABLE IF EXISTS skills')
    # c.execute('CREATE TABLE IF NOT EXISTS skills (name TEXT PRIMARY KEY)')
    # for skill in CORE_SKILLS:
    #     c.execute('INSERT OR IGNORE INTO skills (name) VALUES (?)', (skill,))
        
    conn.commit()
    conn.close()
    print("Database initialized successfully with updated schema.")

if __name__ == "__main__":
    init_db()