# OruPhones FSD Internship - E-Commerce User Tracking Backend

This is the backend for an e-commerce project focused on tracking user behavior such as session details, page visits, time spent, and interactions (like button clicks). It provides APIs to log these events and an admin dashboard API to analyze the collected data.

---

## Features

- Session-based user tracking  
- Records user device and interaction data  
- Tracks page visits and time spent  
- API to send and retrieve interaction data  
- Admin analytics API to view summarized insights  
- MongoDB integration for persistent storage  
- Deployed on Render for public access

---

## Live API Endpoints

- Backend API: https://e-backend-2-hrwb.onrender.com/  
- Admin Analytics API: https://e-backend-2-hrwb.onrender.com/admin/analytics  


---

## Running Locally

Clone the repo  
Run `npm install`  
Add `.env` file with:  
```
MONGODB_URI=your_mongodb_connection_string  
SESSION_SECRET=your_session_secret  
```
Run `npm run dev`  
Server runs at: http://localhost:5000  

---

## API Overview

Use the tracking API with a JSON body containing sessionId, page, timeSpent, device, and action fields.  
The same format is used to test both GET and POST requests as needed.

---

## Future Improvements

- Add secure login for admin panel  
- Improve device and browser detection  
- Enhance tracking details (scroll, mouse movement, etc.)  
- Build visual admin dashboard frontend  
- Refactor API response structure for better frontend integration  

---

## Repository

GitHub: https://github.com/Pradeepthi291/e-backend

---

## Deployment

- Live Backend: https://e-backend-2-hrwb.onrender.com/  
- Local Dev: http://localhost:5000
