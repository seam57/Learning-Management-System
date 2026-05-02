Full Stack Learning Management System
is a comprehensive digital learning platform designed to bridge the gap between instructors and students. Built with a robust Django backend and a dynamic React frontend, it provides a seamless educational experience.

✨ Features
Secure Authentication: Custom user roles (Student/Instructor) with JWT-based authentication.

Password Recovery: Integrated "Forgot Password" feature with automated reset links sent via Gmail SMTP service.

Course Management: Instructors can create, update, and manage courses easily.

Student Enrollment: Simple process for students to enroll in and access learning materials.

User Profiles: Personalized profiles for managing data and viewing progress.

Responsive UI: Fully optimized interface built with React and Bootstrap 5.

💻 Tech Stack
Backend
Framework: Django & Django REST Framework (DRF)

Authentication: Simple JWT (JSON Web Token)

Database: SQLite3

Email Service: Gmail SMTP

Frontend
Library: React.js

Styling: Bootstrap 5

API Client: Axios

🚀 Setup & Installation
1. Clone the Repository
Bash
git clone https://github.com/your-username/edunexus-lms.git
cd edunexus-lms
2. Backend Setup
Navigate to the backend folder: cd backend

Create a virtual environment: python -m venv .venv

Activate the environment:

Windows: .venv\Scripts\activate

Mac/Linux: source .venv/bin/activate

Install dependencies: pip install -r requirements.txt

Run migrations: python manage.py migrate

Start server: python manage.py runserver

3. Frontend Setup
Navigate to the frontend folder: cd frontend

Install npm packages: npm install

Start the React app: npm start

🛠 Available Scripts (Frontend)
In the frontend directory, you can run:

npm start
Runs the app in development mode at http://localhost:3000.

npm test
Launches the test runner in interactive watch mode.

npm run build
Builds the app for production to the build folder.