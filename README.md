# ORU Phones Backend

This repository contains the backend server for the ORU Phones e-commerce project.

## What I implemented

I developed a Node.js and TypeScript backend that tracks user behavior on the website. The system records key user interactions such as page visits, time spent on pages, scroll depth, button clicks, as well as device and browser information. Session-based authentication is used to distinguish logged-in users.

The backend provides APIs to:

- Receive and store user interaction data (`POST /api/track`)  
- Serve aggregated analytics data for the admin dashboard (`GET /admin/analytics`)

## How it works

User interaction data is sent from the frontend and stored in MongoDB Atlas. The admin dashboard then uses this data to generate reports including total sessions, top visited pages, average time spent per page, and most clicked actions.

## Deployment & Repo

- GitHub repo: https://github.com/Pradeepthi291/e-backend  
- Deployed backend URL: https://e-backend-2-hrwb.onrender.com/

## Running locally

1. Clone the repo  
2. Run `npm install`  
3. Add `.env` with MongoDB URI and session secret  
4. Run `npm run dev`

Server runs at `http://localhost:5000`.

## Future improvements

- Enhance device detection  
- Add stronger admin security  
- More detailed analytics

---

For questions, contact anurag@oruphones.com
