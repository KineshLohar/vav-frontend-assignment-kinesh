const README = `
# 📌 Job Portal Frontend Demo

This project is a frontend-only **Job Portal** application built using React. It demonstrates modern React development patterns, state management with Zustand, routing, Tailwind styling, validations, and UI components.

---

## 🚀 Features

- 🔐 **User Registration & Login** (simulated using Zustand & localStorage)
- 📦 **State Management** with Zustand
- 🧭 **Client-side Routing** with React Router
- 🎨 **UI built with Tailwind CSS** & **shadcn components**
- 🧪 **Form Validation** with Zod
- 🔄 **CRUD Operations** for Jobs (Create, Read, Update, Delete)
- 💾 **Persistent Data** using localStorage
- 🖥 Fully responsive UI

---

## 🛠️ Tech Stack

- React
- React Router
- Zustand (state management & persistence)
- Tailwind CSS
- shadcn/ui components
- Zod (form validation)
- react-hot-toast (notifications)

---

## 📂 Project Setup

### 1️⃣ Clone the repository
\`\`\`bash
git clone <your-repo-url>
\`\`\`

### 2️⃣ Navigate to the project directory
\`\`\`bash
cd <your-project-folder>
\`\`\`

### 3️⃣ Install dependencies
\`\`\`bash
npm install
\`\`\`

### 4️⃣ Start the development server
\`\`\`bash
npm run dev
\`\`\`

### 5️⃣ Open in browser
\`\`\`
http://localhost:5173
\`\`\`

---

## 🧠 How It Works

### 🔐 Authentication
- User registration and login are handled entirely in the frontend using **Zustand**.
- Credentials are stored in **localStorage**.
- **Form validation** is enforced using **Zod**.
- **shadcn UI components** are used for forms, buttons, and layouts.

**Test Credentials** (for quick access):
- Username: kinesh  
- Email: kinesh@yopmail.com  
- Password: 12345678  

You can also create a new account.

---

### 📦 State Management
- **Zustand** manages global state for:
  - Users
  - Jobs
- State is persisted across page reloads using Zustand’s **persist middleware**.

---

### 🔄 CRUD Operations
- Users can **Create**, **Read**, **Update**, and **Delete** jobs.
- All job data is stored in **localStorage**.
- Each job has:
  - Title, description, salary, experience, location, job type, tags
  - createdAt timestamp
  - fullyRemote flag

---

### 🧭 Routing
- **React Router** handles navigation:
  - Home
  - Login
  - Register
  - Job Listings
  - Create / Edit Job

---

### 🎨 Styling & UI
- **Tailwind CSS** for responsive and modern UI
- **shadcn components** for consistent design
- Notifications with **react-hot-toast**
- Form validation with **Zod**

---

## ⚠️ Disclaimer
- This is a **frontend demo only**
- ❌ No backend or database
- ❌ All data is stored in the browser (localStorage)

