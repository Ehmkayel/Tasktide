import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Dashboard from "./pages/Dashboard/Dashboard";
import Tasks from "./pages/Tasks/Tasks";
import Settings from "./pages/Settings/Settings";
import Calender from "./pages/Calender/Calender";
import Logout from "./components/Logout/Logout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: "tasks",
        element: <Tasks/>
      },
      {
        path: "settings",
        element: <Settings/>
      },
      {
        path: "calender",
        element: <Calender/>
      },
      {
        path: "Logout",
        element: <Logout/>
      },
    ],
  },
]);

export default function App() {
  return (
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  );
}
