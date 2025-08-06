# init_db.py
import sqlite3

# Define your core skills here (make sure they match the frontend)
CORE_SKILLS = [
    "Python", "JavaScript", "HTML", "CSS", "SQL",
]

def init_db():
    conn = sqlite3.connect('skill_tracker.db')
    c = conn.cursor()
    
    c.execute('DROP TABLE IF EXISTS projects') 
    
    c.execute('''
        CREATE TABLE IF NOT EXISTS projects (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            skills TEXT NOT NULL, 
            details TEXT,
            completion_date TEXT NOT NULL
        )
    ''')

        
    conn.commit()
    conn.close()
    print("Database initialized successfully with updated schema.")

if __name__ == "__main__":
    init_db()