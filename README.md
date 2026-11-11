# ResumeAI

ResumeAI is a full-stack AI-powered interview preparation and resume optimization app. It helps job seekers upload a resume or describe themselves, paste a target job description, and generate a personalized interview strategy powered by Google Gemini AI.

The app analyzes the candidate profile against the target role and provides:
- a match score
- technical interview questions
- behavioral interview questions
- skill gap analysis
- a day-by-day preparation roadmap
- a tailored resume PDF for the role

## Features

- User registration and login
- JWT-based authentication with secure cookies
- Protected routes for authenticated users only
- Resume upload support
- Job description analysis
- AI-generated interview reports
- Skill gap detection
- Personalized preparation plan
- Downloadable resume PDF
- Recent reports history for each logged-in user

## Tech Stack

Frontend:
- React
- Vite
- React Router
- SCSS
- Axios

Backend:
- Node.js
- Express
- MongoDB + Mongoose
- JWT
- bcryptjs
- Multer
- dotenv

AI / Content Generation:
- Google Gemini via @google/genai
- Puppeteer for PDF generation

## Project Structure

```text
ai-resume/
├── client/
│   ├── public/
│   ├── src/
│   ├── .env
│   ├── eslint.config.js
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
├── server/
│   ├── src/
│   ├── .env
│   ├── package.json
│   └── server.js
├── README.md
└── .gitignore
```

## Prerequisites

Before running the app, make sure you have:
- Node.js 18+ installed
- npm installed
- MongoDB instance or MongoDB Atlas connection URL
- Google Gemini API key

## Environment Setup

### Server environment
Create a `.env` file inside the `server` directory:

```env
PORT=5000
MONGO_URL=""mongodb+srv://<username>:<password>@<cluster_name>.mongodb.net/<db_name>""
JWT_SECRET="your_jwt_secret"
GOOGLE_GEMINI_API_KEY="your_google_gemini_api_key"
```


## Installation

From the repo root:

```bash
cd client
npm install

cd ../server
npm install
```

## Running the App

Start the backend:

```bash
cd server
npm run dev
```

Start the frontend:

```bash
cd client
npm run dev
```

## API Overview

### Auth
- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/auth/logout`
- `GET /api/auth/myProfile`

### Interview
- `POST /api/interview/`
- `GET /api/interview/`
- `GET /api/interview/report/:interviewId`
- `POST /api/interview/resume/pdf/:interviewReportId`

## Example Flow

1. Go to the frontend app at http://localhost:5173
2. Create an account or sign in
3. Enter a job description
4. Upload a resume or provide a self-description
5. Click “Generate My Interview Strategy”
6. Review generated technical questions, behavioral questions, and the roadmap
7. Download the customized resume PDF

## Notes

- The app expects a valid Google Gemini API key to generate interview content.
- The backend uses MongoDB for storing user and interview report data.
