# Datathon Website

This repository contains the source code for a datathon website built with React, Tailwind CSS, Flask, and Postgres. The site provides a platform for participants to register, log in, explore different datathon tracks with associated datasets, and submit their models along with supporting documentation.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Installation](#installation)
  - [Local Development Setup](#local-development-setup)
  - [Running with Docker](#running-with-docker)
- [Usage](#usage)
- [Testing](#testing)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## Features

- **User Authentication:** Secure registration and login (with optional email verification and OAuth support).
- **Dashboard:** Personalized user dashboard with submission history.
- **Tracks & Datasets:** Three distinct datathon tracks, each with a dedicated page displaying relevant datasets and guidelines.
- **Submission Functionality:** Model submission form with file uploads for models and supporting documents.
- **Admin Panel (Optional):** Interface for organizers to review and manage submissions.
- **Responsive Design:** Built using Tailwind CSS for a modern and responsive UI.

## Tech Stack

- **Frontend:** 
  - React
  - Tailwind CSS
  - React Router
- **Backend:** 
  - Flask (RESTful API)
  - Flask-JWT-Extended for authentication
- **Database:** 
  - Postgres (with SQLAlchemy for ORM)
- **File Storage:** 
  - Local storage (development), with options for scalable storage like AWS S3 in production.
- **DevOps:** 
  - Docker and Docker Compose for containerization
  - CI/CD integration (e.g., GitHub Actions, Travis CI)

## Project Structure

Updated the backend section to include the seed script and .env example:

├── backend/           
│   ├── app.py                 # Application entry point
│   ├── models.py              # Database models
│   ├── routes/                # API route definitions
│   │   ├── auth.py
│   │   ├── tracks.py
│   │   └── submissions.py
│   ├── config.py              # Configuration and environment variables
│   ├── requirements.txt
│   ├── seed.py                # Script for seeding the database
│   ├── .env.example           # Environment variable template
│   └── uploads/               # Folder for uploaded files (not tracked by git)

## Environment Configuration

- **.env File:**  
  The repository includes a `.env.example` file as a template. Copy it to create a local `.env` file in the `backend` directory:

  ```bash
  cp backend/.env.example backend/.env


## Installation

### Local Development Setup

#### Prerequisites
- Node.js (>=14)
- Python (>=3.8)
- Postgres (or Docker for the database)
- Docker & Docker Compose (optional, for containerized setup)

#### 1. Clone the Repository

```bash
git clone https://github.com/your-username/datathon-website.git
cd datathon-website
```
2. Setup Backend
```bash
Copy
cd backend
python3 -m venv venv
source venv/bin/activate  # On Windows use `venv\Scripts\activate`
pip install -r requirements.txt
```
Create a .env file in the backend directory with necessary environment variables (e.g., database URL, secret key).

Start the backend server:

bash
Copy
python app.py
3. Setup Frontend
```bash
Copy
cd ../frontend
npm install
npm start
```
The frontend will run on http://localhost:3000.

Running with Docker
If you prefer to use Docker, ensure Docker and Docker Compose are installed on your machine. Then run:

```bash
Copy
docker-compose up --build
```

This will start the backend, frontend, and Postgres services as defined in the docker-compose.yml.

Usage
Frontend:
Access the application at http://localhost:3000.

Backend API:
The Flask API runs on http://localhost:5000.

Database:
The Postgres database is configured as specified in your environment variables or Docker setup (default port is 5432).

Testing
Backend Tests
To run backend tests (using pytest), execute:

```bash
Copy
pytest
Frontend Tests
To run frontend tests, use:
```

```bash
Copy
npm test
```

Contributing
Contributions are welcome! If you have suggestions or improvements, please open an issue or submit a pull request. For major changes, please discuss them via an issue first.

License
This project is licensed under the MIT License.

Contact
For questions or further information, please open an issue or contact mstemchenko@yandex.ru.
