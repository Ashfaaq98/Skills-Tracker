# backend/Dockerfile

# Use an official Python runtime as a parent image
FROM python:3.9-slim

# Set the working directory in the container
WORKDIR /app

# Copy the requirements file into the container at /app
COPY requirements.txt .

# Install any needed packages specified in requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the backend application files into the container at /app
COPY . .

# Ensure the database is initialized when the image is built or container starts.
# Running init_db.py here will initialize it in the image.
# If you want it to initialize only if db doesn't exist in a volume,
# you'd typically use an entrypoint script.
# For simplicity, we ensure it's initialized in app.py before app.run()
# RUN python init_db.py

# Make port 5000 available to the world outside this container
EXPOSE 5000

# Define environment variables (if any, not strictly needed for this simple setup yet)
# ENV NAME World

# Run app.py when the container launches
# Use gunicorn for a more production-ready setup if desired, e.g.:
# CMD ["gunicorn", "--bind", "0.0.0.0:5000", "app:app"]
CMD ["python", "app.py"]
