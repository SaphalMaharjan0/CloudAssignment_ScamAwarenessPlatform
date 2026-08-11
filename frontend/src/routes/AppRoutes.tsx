import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LandingPage from '../features/landing/pages/LandingPage';
import ScamDatabasePage from '../features/scamDatabase/pages/ScamDatabasePage';
import ScamDetailsPage from '../features/scamDatabase/pages/ScamDetailsPage';
import ArticlesPage from '../features/articles/pages/ArticlesPage';
import LoginPage from '../features/auth/pages/LoginPage';
import RegisterPage from '../features/auth/pages/RegisterPage';
import ReportScamPage from '../features/scamReport/pages/ReportScamPage';
import DashboardLayout from '../layouts/DashboardLayout';
import UserDashboardPage from '../features/dashboard/pages/UserDashboardPage';
import MyReportsPage from '../features/dashboard/pages/MyReportsPage';
import NotificationsPage from '../features/dashboard/pages/NotificationsPage';
import ProfilePage from '../features/dashboard/pages/ProfilePage';

import AdminLayout from '../layouts/AdminLayout';
import AdminOverviewPage from '../features/admin/pages/AdminOverviewPage';
import AdminReportsPage from '../features/admin/pages/AdminReportsPage';
import AdminUsersPage from '../features/admin/pages/AdminUsersPage';
import AdminArticlesPage from '../features/admin/pages/AdminArticlesPage';
import ReportVerificationPage from '../features/admin/pages/ReportVerificationPage';
import AdminSettingsPage from '../features/admin/pages/AdminSettingsPage';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/database" element={<ScamDatabasePage />} />
      <Route path="/database/:id" element={<ScamDetailsPage />} />
      <Route path="/articles" element={<ArticlesPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<RegisterPage />} />
      
      <Route path="/app" element={<DashboardLayout />}>
        <Route path="dashboard" element={<UserDashboardPage />} />
        <Route path="report" element={<ReportScamPage />} />
        <Route path="my-reports" element={<MyReportsPage />} />
        <Route path="database" element={<ScamDatabasePage />} />
        <Route path="database/:id" element={<ScamDetailsPage />} />
        <Route path="articles" element={<ArticlesPage />} />
        <Route path="notifications" element={<NotificationsPage />} />
        <Route path="profile" element={<ProfilePage />} />
      </Route>

      <Route path="/admin" element={<AdminLayout />}>
        <Route path="overview" element={<AdminOverviewPage />} />
        <Route path="reports" element={<AdminReportsPage />} />
        <Route path="users" element={<AdminUsersPage />} />
        <Route path="articles" element={<AdminArticlesPage />} />
        <Route path="verify/:id" element={<ReportVerificationPage />} />
        {/* Reuse the existing database/articles list pages for the admin panel for now */}
        <Route path="database" element={<ScamDatabasePage />} />
        <Route path="database/:id" element={<ScamDetailsPage />} />
        <Route path="notifications" element={<NotificationsPage />} />
        <Route path="profile" element={<ProfilePage />} />
        {/* Fallbacks */}
        <Route path="verify" element={<AdminReportsPage />} />
        <Route path="settings" element={<AdminSettingsPage />} />
      </Route>
    </Routes>
  );
}
