# 📆 Meetup Organizer (MeetHub)

This application is a basic full-stack web application designed for organizing local meetups in Brisie. This project was developed to practice fundamental full-stack concepts, focusing on RESTful API design, core CRUD operations, secure authentication, and cloud deployment.

🛜 **Live Demo:** [http://54.79.180.150](http://54.79.180.150) *(Note: Please access via HTTP IPv4)

---

##🔭 Project Scope & Current Features

This project focuses on the essential workflows of the event management system:

* **Authentication System:** * Implemented secure user registration and login using **JSON Web Tokens (JWT)** and **bcrypt** for password hashing.
* **Events Management (CRUD):**
* **Read:** Display all events in a responsive grid.* **Create/Update:** Form for create new events or edit existing ones.
* **Attendance Logic:**
* Users can dynamically **Join** or **Leave** any upcoming events.
* **Past Event join prevention:** Logic to check event date. If an event is outdated, the system automatically disables "Join Event" button and renders "Event Expired" for the button.
* **Admin Dashboard:** A basic centralized view for admin review.

---

## 🏗️ Architecture & Folder Structure
*For my future me: How this project is organized!!*

```text

Ⓜ️ Meetup-Organizer
| 📁 .github/workflows  # ci.yml for GitHub Actions (CD)
 – 📁 backend       # Node.js
  — 📁 config      # Database(db.js)
  — 📁 controllers    # Control logic (Auth, Event, Group, User)
  — 📁 middleware    # Not authorized, no token'
  — 📁 models      # Mongoose Schemas (Database structures)
  — 📁 routes      # API endpoints
  — 🔗 server.js     # Entry point (0.0.0.0 for AWS external access)
 –📁 frontend      # Use React UI
  — 📁 public      # Static assets
  — 📁 src
   — 📁 components   # Reusable UI parts (e.g., EventCard)
   — 📁 context     # Global state management (AuthContext)
   — 📁 pages      # Web Pages (Home, EventDetails, Admin, Group, MyEvents...)
   — 🔗 App.js     # Router setup
   — 🔗 axiosConfig.jsx # Dynamic Base URL and token injection for Axios instance 

---

👜 Tech Stack & Deployment Notes
Frontend: React.js, Tailwind CSS, Axios
Backend: Node.js, Express.js
Database: MongoDB Atlas (Cloud Database)

💨 AWS Deployment Configuration:
Server: Hosted on an AWS EC2 instance (Ubuntu).Process Manager: PM2 is used to keep the Node.js backend (port 5001) running in the background.
Static Hosting: Nginx is configured to serve the compiled React build (frontend/build) on port 80, routing API requests appropriately.
CI/CD Pipeline: GitHub Actions automatically pulls the latest code from the main branch, installs dependencies, builds the React app, and restarts PM2 for every push.

⚙️ How to Run Locally

1️⃣Clone the repository:
Bash
git clone [https://github.com/AlexChen531922/Meetup-Organizer.git](https://github.com/AlexChen531922/Meetup-Organizer.git)

2️⃣Setup Backend:
Navigate to /backend, run npm install.
Create a .env file with MONGO_URI, and JWT_SECRET, PORT=5001.Run npm run dev.

3️⃣Setup Frontend:
Navigate to /frontend, run npm install.
Run npm start.

㊙️ Test Credentials
For features testing purpose:
🕶️ Admin
ID: admin@test.com | PW: admin123
👤User
ID: alexc@test.com | PW: test123

<img width="940" height="536" alt="image" src="https://github.com/user-attachments/assets/ed227c0e-7ea8-4f3a-a9d8-7555d5f25623" />
