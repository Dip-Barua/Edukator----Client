# Edukator

## Overview
Edukator is a MERN-stack-based platform designed to revolutionize the way educational institutions, tutors, and students interact. By providing a user-friendly interface and robust functionalities, Edukator aims to make skill learning and class management more efficient and accessible.


<img width="1906" height="955" alt="image" src="https://github.com/user-attachments/assets/6ad189fc-bac4-4dd2-9a6c-7a16ef596708" />


---

## Technologies Used
- **Frontend**: React.js, Tailwind CSS, React Router, TanStack Query, Framer Motion.
- **Backend**: Node.js, Express.js, MongoDB.
- **Authentication**: Firebase, JWT.
- **State Management**: Context API.

---

## Live Site URL
[Visit Edukator](https://edukator-9da86.web.app/)

---

## GitHub Repositories
- **Client Side**: [Edukator Client]()
- **Server Side**: [Edukator Server]()

---

## Key Highlights
1. Built using the latest MERN stack technologies.
2. Responsive and mobile-friendly design.
3. Efficient CRUD operations with smooth user feedback.
4. Comprehensive dashboards for admins, teachers, and students.
5. Secure data handling with environment variables.

---

## Features
1. **Responsive Design**:
   - Fully responsive across mobile, tablet, and desktop devices, including a responsive dashboard.

2. **Authentication**:
   - User authentication with Email/Password and Google Sign-In.
   - Role-based access control for Admin, Teacher, and Student.
   - JWT-based session management.

3. **Homepage Highlights**:
   - Banner section with carousel.
   - Partner/collaborator showcase.
   - Popular classes section with sliders.
   - Feedback carousel from teachers.
   - Stats overview: Total users, classes, and enrollments.
   - Teacher sign-up call-to-action.

4. **Role-Specific Dashboards**:
   - **Admin**:
     - Manage teacher requests, users, and classes.
     - Approve/reject classes and teacher requests.
     - Promote users to admin.
   - **Teacher**:
     - Add, update, and delete classes.
     - Monitor class progress (enrollments, assignments).
     - Add assignments for enrolled students.
   - **Student**:
     - Enroll in classes.
     - View enrolled classes and their assignments.
     - Submit assignments and provide teaching evaluations.

5. **Interactive Elements**:
   - SweetAlert and Toast notifications for CRUD operations and authentication.
   - Pagination on tables and card views.
   - Search functionality for users and classes.
   - Infinite scroll for classes.

6. **Data Management**:
   - TanStack Query for GET requests.
   - TanStack Mutation for POST requests.
   - React Hook Form for all forms.

7. **Security**:
   - Environment variables for Firebase and MongoDB credentials.

8. **Optional Features**:
   - Order history with downloadable invoices in PDF format.
   - Animations using Framer Motion and AOS.

---

## Admin Credentials
- **Email**: `admin@example.com`
- **Password**: `admin123`


---

## Installation and Setup
1. Clone the repositories:
   ```bash
   git clone https://github.com/your-username/edukator-client.git
   git clone https://github.com/your-username/edukator-server.git
   ```
2. Install dependencies:
   - Client:
     ```bash
     cd edukator-client
     npm install
     ```
   - Server:
     ```bash
     cd edukator-server
     npm install
     ```
3. Set up environment variables:
   - **Client**:
     - Create a `.env` file in the root directory.
     - Add your Firebase configuration.
   - **Server**:
     - Create a `.env` file in the root directory.
     - Add your MongoDB credentials and JWT secret.
4. Start the applications:
   - Client:
     ```bash
     npm run start
     ```
   - Server:
     ```bash
     npm run dev
     ```

---

## Future Improvements
- Implement email verification for new user registrations.
- Enhance payment gateway integration.
- Add AI-based recommendations for students.

---
