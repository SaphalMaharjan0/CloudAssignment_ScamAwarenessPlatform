# ScamShield Philippines 🛡️

A comprehensive **Scam Awareness and Reporting Platform** built to combat cybercrime, educate the public, and provide a streamlined channel for users to report fraudulent activities.

This project was built with a modern tech stack, providing a fully featured frontend, a robust backend foundation, and a comprehensive SQL database schema.

---

## 🌟 Key Features

The platform is designed with three primary experiences:

### 1. Public Portal
- **Landing Page**: Modern, glassmorphism-inspired design highlighting platform statistics, key features, and recent scam alerts.
- **Scam Database**: A searchable directory of known scams, categorized by type (Phishing, Banking, Investment, etc.).
- **Articles & Knowledge Base**: Educational content to help users spot red flags and protect themselves online.
- **Authentication**: Secure login and registration flows.

### 2. User Dashboard (`/app`)
A secure space for registered users to manage their interactions with the platform.
- **Overview Dashboard**: Track personal report statistics and recent activities.
- **Report a Scam**: A streamlined form to submit new scam reports, including evidence uploads.
- **My Reports**: Track the status (Pending, Verified, Rejected) of submitted reports.
- **Notifications**: Stay updated on report status changes and platform alerts.
- **Profile Settings**: Manage personal information and notification preferences.

### 3. Admin Dashboard (`/admin`)
A powerful command center for platform administrators and moderators.
- **Admin Overview**: High-level metrics, interactive growth charts, and a quick-action verification queue.
- **Report Verification Panel**: A detailed interface to review submitted evidence, check reporter accuracy, and approve/reject reports.
- **All Reports**: A comprehensive data table of all system reports with advanced filtering and CSV export capabilities.
- **User Management**: Monitor the user base, manage roles (Admin, Moderator, Reporter), and handle account suspensions.
- **Content Management**: Create, edit, and publish awareness articles.
- **Platform Settings**: Configure global settings like maintenance mode, auto-assignment rules, notification triggers, and security policies.

---

## 🛠️ Technology Stack

### Frontend
- **React 18** (Vite)
- **TypeScript**
- **Tailwind CSS** (for styling and responsive design)
- **Lucide React** (Icons)
- **Recharts** (Data visualization in Admin Dashboard)
- **React Router v6** (Navigation and protected routes)

### Backend & Database
- **Spring Boot** (RESTful API architecture)
- **SQL** (Full relational database schema provided in `database.sql`)

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- Java 17+ (for Backend)

### Running the Frontend locally
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. Open your browser and navigate to `http://localhost:5173`.

### Accessing the Dashboards
*Note: Since the frontend is currently running with mocked data for demonstration purposes, you can navigate directly to the specific dashboard routes without needing a backend server:*
- **User Dashboard**: Navigate to `/app/dashboard`
- **Admin Dashboard**: Navigate to `/admin/overview`

---

## 🗄️ Database Schema
A complete PostgreSQL/MySQL compatible schema is provided in the root directory (`database.sql`). This includes tables for Users, Categories, Scam Reports, Report Evidence, Articles, Notifications, and Platform Settings.
