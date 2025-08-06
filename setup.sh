#!/bin/bash

echo "Setting up Skills Tracker..."

# Check Python installation
if ! command -v python3 &> /dev/null; then
    echo "Python 3 is required but not installed."
    exit 1
fi

# Check Node.js installation
if ! command -v node &> /dev/null; then
    echo "Node.js is required but not installed."
    exit 1
fi

# Setup backend
echo "Setting up backend..."
python3 -m venv env
source env/bin/activate
pip install -r requirements.txt
python init_db.py

# Setup frontend
echo "Setting up frontend..."
cd frontend
npm install

echo "Setup complete!"
