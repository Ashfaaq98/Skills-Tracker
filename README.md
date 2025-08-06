# Skills Tracker

A full-stack application for tracking and visualizing skill progression, built with Flask, SQLite, and React.

## Features

- Create and manage timestamped skill entries with customizable proficiency levels
- Visualize skill progression through interactive charts
- Access data through RESTful API with CORS support
- Store records persistently using SQLite database
- Deploy seamlessly with Docker containerization
- Scale horizontally with modular architecture
- Monitor multiple skills simultaneously

## Tech Stack

- Backend: Flask (Python 3.7+), SQLite, REST API with CORS
- Frontend: React, Chart.js, Axios
- Deployment: Docker support

## Prerequisites

- Python 3.7+
- Node.js 12+
- Docker & Docker Compose (optional)

## Quick Start

### Option 1: Script Installation (Recommended)

```bash
git clone https://github.com/Ashfaaq98/Skills-Tracker.git
cd Skills-Tracker
chmod +x setup.sh run.sh
./setup.sh
./run.sh
```

### Option 2: Docker

```bash
docker-compose up --build
```

The application will be available at:

- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

## API Reference

| Endpoint | Method | Description | Payload |
|----------|--------|-------------|---------|
| `/skills` | GET | Get all skill scores | - |
| `/projects` | GET | List all projects | - |
| `/projects` | POST | Create project | `{"title": "string", "skills": ["string"], "details": "string"}` |
| `/health` | GET | Check API health | - |

## Development

### Testing

```bash
# Backend
python -m pytest

# Frontend
cd frontend && npm test
```

### Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

## Contact

- Contact: [ashfaaqf@proton.me](mailto:ashfaaqf@proton.me)

## License

This project is licensed under the MIT License. See [LICENSE](LICENSE) for details.