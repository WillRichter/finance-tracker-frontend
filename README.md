# Finance Tracker UI

A React frontend for the Finance Tracker API.

## Tech Stack
- React 19
- TypeScript
- Vite
- TanStack Query
- React Router
- React Hook Form + Zod
- Tailwind CSS

## Features
- Register and login
- View monthly income, expenses and balance
- Add and delete transactions
- Search and filter transactions by description and date range
- Responsive design for mobile and desktop

## Running locally

### Prerequisites
- Node.js 20+
- Finance Tracker API running on port 8080

### Steps
1. Clone the repository
2. Install dependencies:
```bash
npm install
```
3. Create a `.env` file in the root with the following:
- VITE_API_BASE_URL=http://localhost:8080/api/v1

4. Start the development server:
```bash
npm run dev
```

The app will be available at `http://localhost:5173`

## Live Demo
- Frontend: https://your-frontend.railway.app
- Backend: https://your-backend.railway.app