# app.py
from flask import Flask, request, jsonify
from flask_cors import CORS
import sqlite3
from datetime import datetime

app = Flask(__name__)
CORS(app) 

DATABASE = 'skill_tracker.db'

# Define your core skills here (MUST MATCH init_db.py and Frontend)
CORE_SKILLS = [
    "Python", "JavaScript", "HTML", "CSS", "SQL",
]

def get_db_connection():
    conn = sqlite3.connect(DATABASE)
    conn.row_factory = sqlite3.Row 
    return conn


def calculate_skill_scores():
    conn = get_db_connection()
    projects = conn.execute('SELECT skills FROM projects ORDER BY completion_date ASC').fetchall()
    conn.close()
    
    # Initialize scores for all defined core skills to 0
    scores = {skill: 0 for skill in CORE_SKILLS}
    
    # Simple scoring: +1 point for each skill mentioned in a project
    for project in projects:
    
        project_skills = project['skills'].split(',')
        for skill in project_skills:
            trimmed_skill = skill.strip()
            if trimmed_skill in scores:
                scores[trimmed_skill] += 1 

    return scores

@app.route('/skills', methods=['GET'])
def get_skills():
    """Returns the current calculated scores for all core skills."""
    scores = calculate_skill_scores()
    return jsonify(scores)

@app.route('/projects', methods=['GET'])
def get_projects():
    """Returns all projects, ordered by most recent first."""
    conn = get_db_connection()
    projects = conn.execute('SELECT id, title, skills, details, completion_date FROM projects ORDER BY completion_date DESC').fetchall()
    conn.close()

    projects_list = [dict(p) for p in projects]
    return jsonify(projects_list)

@app.route('/projects', methods=['POST'])
def add_project():
    """Adds a new project to the database."""
    data = request.get_json()
    

    if not data or 'title' not in data or 'skills' not in data:
        return jsonify({'error': 'Missing required fields: title and skills'}), 400
        
    title = data.get('title')
    skills_list = data.get('skills', []) 
    skills_str = ",".join(skills_list) 
    
    details = data.get('details', '') 
    completion_date = datetime.utcnow().strftime('%Y-%m-%dT%H:%M:%SZ') 
    
    if not title or not skills_list:
         return jsonify({'error': 'Title and at least one skill are required'}), 400

    try:
        conn = get_db_connection()
        conn.execute('''
            INSERT INTO projects (title, skills, details, completion_date)
            VALUES (?, ?, ?, ?)
        ''', (title, skills_str, details, completion_date))
        conn.commit()
        conn.close()
         
        return jsonify({'status': 'success', 'message': 'Project added successfully'}), 201
        
    except sqlite3.Error as e:
        print(f"Database error: {e}")
        return jsonify({'error': 'Failed to add project due to database error'}), 500
    except Exception as e:
        print(f"Server error: {e}")
        return jsonify({'error': 'An unexpected error occurred'}), 500

@app.route('/health')
def health_check():
    try:

        conn = get_db_connection()
        conn.execute('SELECT 1').fetchone()
        conn.close()
        return jsonify({
            "status": "healthy",
            "database": "connected"
        }), 200
    except Exception as e:
        return jsonify({
            "status": "unhealthy",
            "database": "disconnected",
            "error": str(e)
        }), 503

if __name__ == '__main__':
    app.run(host='0.0.0.0',debug=True, port=5000) 