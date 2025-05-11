# Use a Python version that matches your development environment (3.12)
FROM python:3.12-slim 

# Install PostgreSQL client development libraries and build tools
# This section is ADDED to fix the psycopg2 build issue
RUN apt-get update && apt-get install -y \
    libpq-dev \
    build-essential \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY . .
# Ensure your Flask app instance in app.py is named 'app'
# e.g., in app.py: app = Flask(__name__)
EXPOSE 5001 
# CMD for Gunicorn, binding to port 5001
CMD ["gunicorn", "--bind", "0.0.0.0:5001", "app:app"]