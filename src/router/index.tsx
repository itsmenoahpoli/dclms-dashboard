/* eslint-disable react-refresh/only-export-components */
import React from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";

const LoadComponent = (Component: React.ComponentType) => {
  return (
    <React.Suspense fallback={"Loading ..."}>
      <Component />
    </React.Suspense>
  );
};

/**
 * Layouts
 */
import { DashboardLayout, AuthLayout } from "@/layouts";

/**
 * System Pages
 */
const Error404Page = LoadComponent(React.lazy(() => import("@/views/system/Error404Page")));

/**
 * Auth Pages
 */
const LoginPage = LoadComponent(React.lazy(() => import("@/views/auth/LoginPage")));
const RequestOtpPage = LoadComponent(React.lazy(() => import("@/views/auth/RequestOtpPage")));

/**
 * Dashboard Pages
 */
const DashboardHomePage = LoadComponent(React.lazy(() => import("@/views/dashboard/DashboardHomePage")));

/**
 * Documents Pages
 */
const DocumentsManagementPage = LoadComponent(React.lazy(() => import("@/views/dashboard/documents/DocumentsManagementPage")));

/**
 * Document Archives Pages
 */
const DocumentArchivesManagementPage = LoadComponent(React.lazy(() => import("@/views/dashboard/document-archives/DocumentArchivesManagementPage")));

/**
 * Users Management
 */
const UsersManagementPage = LoadComponent(React.lazy(() => import("@/views/dashboard/users/UsersManagementPage")));

/**
 * My Profile
 */
const MyProfilePage = LoadComponent(React.lazy(() => import("@/views/dashboard/MyAccountPage")));

export const appRoutes = createBrowserRouter([
  {
    path: "*",
    element: Error404Page,
  },
  {
    path: "/",
    element: <Navigate to="/dashboard" />,
  },
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      {
        path: "/auth/login",
        element: LoginPage,
      },
      {
        path: "/auth/request-otp",
        element: RequestOtpPage,
      },
    ],
  },
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    children: [
      {
        path: "/dashboard/",
        element: DashboardHomePage,
      },
      {
        path: "/dashboard/documents",
        element: DocumentsManagementPage,
      },
      {
        path: "/dashboard/document-archives",
        element: DocumentArchivesManagementPage,
      },
      {
        path: "/dashboard/document-archives",
        element: DocumentArchivesManagementPage,
      },
      {
        path: "/dashboard/users-management",
        element: UsersManagementPage,
      },
      {
        path: "/dashboard/my-account",
        element: MyProfilePage,
      },
    ],
  },
]);
