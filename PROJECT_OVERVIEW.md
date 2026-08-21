# FraudGuard (Scam Awareness Platform) - Project Overview

This document serves as a comprehensive guide to the architecture, tech stack, and current state of the FraudGuard platform. It is designed to provide immediate context for any AI assistant (like Gemini) taking over development for the next phase of the assignment.

## Tech Stack

### Frontend (`/frontend`)
*   **Framework**: React 18
*   **Build Tool**: Vite
*   **Language**: TypeScript
*   **Styling**: Tailwind CSS, Vanilla CSS (`index.css`)
*   **Routing**: React Router DOM (`/src/routes/AppRoutes.tsx`)
*   **State Management**: Context API (e.g., `AuthContext.tsx`)
*   **Icons**: Lucide React
*   **HTTP Client**: Axios (configured in `axiosClient.ts` with interceptors for JWT)

### Backend (`/CloudBackend`)
*   **Framework**: Spring Boot 3 (Java)
*   **Security**: Spring Security with JWT (JSON Web Tokens)
*   **Database**: PostgreSQL
*   **ORM**: Spring Data JPA / Hibernate
*   **Utilities**: Lombok (for boilerplate getters/setters/constructors)
*   **Build Tool**: Maven (`mvnw`)

---

## Architecture & File Structure

### Frontend Structure
*   **`/src/api`**: Axios API services matching backend controllers (e.g., `authApi.ts`, `scamReportApi.ts`, `adminApi.ts`).
*   **`/src/context`**: React contexts, primarily `AuthContext.tsx` which manages the logged-in user state and token.
*   **`/src/layouts`**: Contains `DashboardLayout.tsx` (for users) and `AdminLayout.tsx` (for admins).
*   **`/src/features`**: Grouped by domain (Auth, Admin, Dashboard, Landing, ScamDatabase, ScamReport).
*   **`/src/types`**: TypeScript interfaces. **Crucial:** Ensure these match the Backend Entities (e.g., `User` uses `name`, not `firstName`/`lastName`).

### Backend Structure
*   **`controller`**: REST API endpoints (e.g., `AuthController.java`, `ScamReportController.java`, `AdminController.java`).
*   **`service`**: Business logic (e.g., `AuthService.java`, `ScamReportService.java`).
*   **`repository`**: Spring Data JPA interfaces (e.g., `UserRepository.java`, `ScamReportRepository.java`).
*   **`entity`**: JPA Data models mapped to PostgreSQL tables (e.g., `User.java`, `ScamReport.java`).
*   **`dto`**: Data Transfer Objects for API requests/responses (e.g., `AuthResponse.java`).
*   **`security`**: JWT generation and validation logic, along with Spring Security configuration.

---

## Core Entities & Data Models

1.  **User**
    *   Fields: `id`, `name`, `email`, `passwordHash`, `role` (`USER` or `ADMIN`), `active`.
    *   *Note*: The system previously used `firstName` and `lastName`, but was recently refactored to use a single `name` field to align frontend and backend.
2.  **ScamReport**
    *   Fields: `id` (String UUID format), `title`, `description`, `category`, `platformUsed`, `scammerDetails`, `financialLoss`, `documentUrls`, `status` (`Pending`, `Verified`, `Rejected`), `reporter` (ManyToOne mapping to User).
3.  **Article** (For awareness resources)
4.  **Category**
5.  **Notification**

---

## Key User Flows

*   **Authentication**: Users register/login via `/api/auth/register` and `/api/auth/login`. JWTs are stored in `localStorage` on the frontend.
*   **Role-Based Routing**: 
    *   Regular users are routed to `/app/dashboard`.
    *   Admins (Users with `ROLE_ADMIN` or `ADMIN` role) are routed to `/admin/overview`.
*   **Scam Reporting**: Users can submit, edit, and delete their own scam reports (if status is `Pending`). Admins can verify or reject these reports from the Verification Queue.

---

## Recent Updates & Current State

*   **TypeScript/Data Alignment**: All frontend interfaces have been updated to strictly expect `user.name`. Typescript errors regarding `firstName` and `lastName` have been resolved across the admin panel.
*   **Admin Login Fix**: Modified `LoginPage.tsx` to properly inspect both `user.role` and `user.authorities` to ensure Admins are correctly routed to the Admin Dashboard instead of the User Dashboard.
*   **My Reports CRUD**: Validated that `ScamReportController.java` supports `PUT` and `DELETE` endpoints. The `MyReportsPage.tsx` successfully consumes these to allow users to manage their unverified reports.
*   **Lombok Quirks**: Added explicit `getActive()` and `setActive()` to `User.java` to prevent IDE/compilation confusion with Lombok's boolean wrapper generation.

## Starting Points for Next AI
1.  **To run frontend**: `cd frontend` -> `npm install` -> `npm run dev` (Runs on `localhost:5173`)
2.  **To run backend**: `cd CloudBackend` -> `.\mvnw clean spring-boot:run` (Runs on `localhost:8080`)
3.  **Database**: Ensure PostgreSQL is running locally on port `5432` with a database named `fraudguard`.

*When prompting the next AI, provide this file and specify exactly which feature or bug you want them to tackle next!*
