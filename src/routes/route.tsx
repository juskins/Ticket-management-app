import App from "@/App";
import DashboardLayout from "@/components/dashboardLayout";
import DashboardPage from "@/pages/dashboard";
import LandingPage from "@/pages/landingpage";
import LoginPage from "@/pages/loginpage";
import TicketsPage from "@/pages/tickets";
import { createBrowserRouter } from "react-router";

export const Routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <LandingPage />, // This will handle the redirection
      },
      {
        path: "/dashboard",
        element: (
          <DashboardLayout>
            <DashboardPage />
          </DashboardLayout>
        ),
      },
      {
        path: "/tickets",
        element: (
          <DashboardLayout>
            <TicketsPage />
          </DashboardLayout>
        ),
      },
      {
        path: "/login",
        element: <LoginPage />, // This will handle the redirection
      },
    ],
  },
]);