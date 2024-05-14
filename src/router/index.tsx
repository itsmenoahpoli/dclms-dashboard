/* eslint-disable react-refresh/only-export-components */
import React from "react";
import { createBrowserRouter } from "react-router-dom";

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
 * Users Management
 */
const UsersManagementPage = LoadComponent(React.lazy(() => import("@/views/dashboard/users/UsersManagementPage")));


export const appRoutes = createBrowserRouter([
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
        path: "/dashboard/users-management",
        element: UsersManagementPage,
      },
    ],
  },
]);
