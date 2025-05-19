# Skills Tracker

A full-stack web application to record, visualize, and monitor skill progress over time. Designed as a simple, extendable project built with Python (Flask), SQLite, Docker, and a React front end using Chart.js.

## Table of Contents

* [Features](#features)
* [Tech Stack](#tech-stack)
* [Prerequisites](#prerequisites)
* [Getting Started](#getting-started)

  * [Backend Setup](#backend-setup)
  * [Frontend Setup](#frontend-setup)
  * [Docker Setup (Optional)](#docker-setup-optional)
* [Usage](#usage)
* [Database Initialization](#database-initialization)
* [API Endpoints](#api-endpoints)
* [Project Structure](#project-structure)
* [Contributing](#contributing)
* [License](#license)
* [Contact](#contact)

## Features

* Create and track custom skills with timestamped entries
* Interactive charts to visualize progress (line/bar charts)
* CORS-enabled Flask REST API
* Easy local setup with SQLite or Docker Compose
* Modular codebase for quick extensions

## Tech Stack

* **Backend:** Python, Flask, Flask-CORS
* **Database:** SQLite
* **Frontend:** React, Chart.js, react-chartjs-2, Axios
* **Containerization (optional):** Docker, Docker Compose

## Prerequisites

* Python 3.7+ and pip
* Node.js 12+ and npm
* (Optional) Docker & Docker Compose

## Getting Started

### Backend Setup

1. Clone the repo:

   ```bash
   git clone https://github.com/Ashfaaq98/Skills-Tracker.git
   cd Skills-Tracker
   ```
2. Create and activate a virtual environment:

   ```bash
   python3 -m venv env
   source env/bin/activate
   ```
3. Install Python dependencies:

   ```bash
   pip install Flask flask-cors
   ```
4. Initialize the database:

   ```bash
   python init_db.py
   ```
5. Start the Flask app:

   ```bash
   python app.py
   ```

### Frontend Setup

1. Change into the frontend directory:

   ```bash
   cd frontend
   ```
2. Install Node dependencies:

   ```bash
   npm install chart.js react-chartjs-2 axios
   ```
3. Start the development server:

   ```bash
   npm start
   ```
4. Frontend will run on `http://localhost:3000`, connecting to the backend at `http://localhost:5000`.

### Docker Setup (Optional)

1. Build and run containers:

   ```bash
   docker-compose up --build
   ```
2. Services:

   * **api:** Flask backend on port 5000
   * **frontend:** React app on port 3000

## Usage

* Access the React UI at `http://localhost:3000`.
* Use the form to add new skill entries with date, name, and level.
* View your skill progression in dynamic charts.

## Database Initialization

The `init_db.py` script creates a SQLite database (`skills.db`) with a table `entries`:

```sql
CREATE TABLE entries (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  skill_name TEXT NOT NULL,
  skill_level INTEGER NOT NULL,
  timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

Run `python init_db.py` before starting the API.

## API Endpoints

* `GET /entries` — List all entries
* `POST /entries` — Add a new entry
* `DELETE /entries/:id` — Remove an entry by ID

Example POST payload:

```json
{
  "skill_name": "Python",
  "skill_level": 5
}
```

## Project Structure

```
Skills-Tracker/
├── Backend/
│   ├── app.py        # Flask app and routes
│   ├── init_db.py    # DB schema creation
│   └── requirements.txt
├── frontend/
│   ├── public/
│   └── src/          # React components, chart logic
├── docker-compose.yml
└── README.md         # <- you are here
```

## Contributing

Contributions are welcome! Please fork the repository and open a pull request with descriptive commits.

## License

This project is licensed under the MIT License. See [LICENSE](LICENSE) for details.

## Contact

Created by Ashfaaq98. For questions or feedback, reach out at [ashfaaqf@proton.me](mailto:ashfaaqf@proton.me).
