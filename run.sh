#!/bin/bash

# Function to kill background processes on exit
cleanup() {
    echo "Stopping services..."
    kill $(jobs -p)
    exit
}

trap cleanup SIGINT

echo "Starting Skills Tracker..."

# Store base directory
BASE_DIR=$(pwd)

# Start backend
source env/bin/activate
cd Backend
python app.py &

# Start frontend
cd "$BASE_DIR/frontend"
npm start &

# Wait for all background processes
wait
