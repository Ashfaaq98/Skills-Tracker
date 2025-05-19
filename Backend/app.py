# app.py
from flask import Flask, request, jsonify
from flask_cors import CORS
import sqlite3
from datetime import datetime

app = Flask(__name__)
CORS(app)  # Enable CORS

DATABASE = 'skill_tracker.db'

# Define your core skills here (MUST MATCH init_db.py and Frontend)
CORE_SKILLS = [
    "LLM Evaluation", 
    "LLM Fine Tuning", 
    "LLM Agents", 
    "RAG", 
    "LLM Deployment", 
    "POC Development", 
    "Offensive LLM Agents", 
    "LLM Red teaming"
]

def get_db_connection():
    conn = sqlite3.connect(DATABASE)
    conn.row_factory = sqlite3.Row # Return rows as dictionary-like objects
    return conn

# Helper: Calculate updated skill scores from projects
def calculate_skill_scores():
    conn = get_db_connection()
    # Fetch projects ordered by date to potentially apply decay or recency boost later
    projects = conn.execute('SELECT skills FROM projects ORDER BY completion_date ASC').fetchall()
    conn.close()
    
    # Initialize scores for all defined core skills to 0
    scores = {skill: 0 for skill in CORE_SKILLS}
    
    # Simple scoring: +1 point for each skill mentioned in a project
    for project in projects:
        # Skills are stored as comma-separated string, e.g., "RAG,LLM Agents"
        project_skills = project['skills'].split(',')
        for skill in project_skills:
            trimmed_skill = skill.strip() # Remove leading/trailing whitespace
            if trimmed_skill in scores:
                scores[trimmed_skill] += 1 # Increment score
            # else: # Optional: Handle if a skill from DB isn't in CORE_SKILLS
            #    print(f"Warning: Skill '{trimmed_skill}' found in project but not in CORE_SKILLS list.")

    # Basic ceiling - you might want a more sophisticated scaling later
    # for skill in scores:
    #     scores[skill] = min(scores[skill], 10) # Cap score at 10 for radar chart

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
    # Convert Row objects to dictionaries for JSON serialization
    projects_list = [dict(p) for p in projects]
    return jsonify(projects_list)

@app.route('/projects', methods=['POST'])
def add_project():
    """Adds a new project to the database."""
    data = request.get_json()
    
    # Validate required fields
    if not data or 'title' not in data or 'skills' not in data:
        return jsonify({'error': 'Missing required fields: title and skills'}), 400
        
    title = data.get('title')
    # Skills should be sent as a list from frontend, join them into a string for DB
    skills_list = data.get('skills', []) 
    skills_str = ",".join(skills_list) 
    
    details = data.get('details', '') # Optional field
    # Use current date, ensure consistent format (ISO 8601)
    completion_date = datetime.utcnow().strftime('%Y-%m-%dT%H:%M:%SZ') 
    
    if not title or not skills_list: # Check if title or skills list is empty
         return jsonify({'error': 'Title and at least one skill are required'}), 400

    try:
        conn = get_db_connection()
        conn.execute('''
            INSERT INTO projects (title, skills, details, completion_date)
            VALUES (?, ?, ?, ?)
        ''', (title, skills_str, details, completion_date))
        conn.commit()
        conn.close()
        
        # No need to return updated scores here, frontend can refetch /skills
        return jsonify({'status': 'success', 'message': 'Project added successfully'}), 201
        
    except sqlite3.Error as e:
        print(f"Database error: {e}")
        return jsonify({'error': 'Failed to add project due to database error'}), 500
    except Exception as e:
        print(f"Server error: {e}")
        return jsonify({'error': 'An unexpected error occurred'}), 500

if __name__ == '__main__':
    # Ensure the database is initialized before running the app
    # init_db() # You can run this manually or uncomment here if preferred
    app.run(debug=True, port=5000) # Use port 5000 explicitly