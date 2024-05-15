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
import { DashboardLayout } from "@/layouts";

/**
 * System Pages
 */
const Error404Page = LoadComponent(React.lazy(() => import("@/views/system/Error404Page")));

/**
 * Auth Pages
 */
const LoginPage = LoadComponent(React.lazy(() => import("@/views/auth/LoginPage")));

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
    path: "/auth/login",
    element: LoginPage,
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
        path: "/dashboard/users-management",
        element: UsersManagementPage,
      },
    ],
  },
]);
