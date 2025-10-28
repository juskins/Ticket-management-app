import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Ticket,
  LogOut,
  Search,
  Settings,
  LayoutDashboard,
  Menu,
  X,
} from "lucide-react";
import { ModeToggle } from "./mode-toggle";
import Header from "./header";
import { ThemeProvider } from "./theme-provider";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const navigate = useNavigate();
  const [userEmail, setUserEmail] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const pathname = window.location.pathname;

  useEffect(() => {
    // Check authentication
    const token = localStorage.getItem("ticketapp_session");
    const email = localStorage.getItem("userEmail");

    if (!token) {
      navigate("/login");
      return;
    }

    if (email) {
      setUserEmail(email);
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("ticketapp_session");
    localStorage.removeItem("userEmail");
    navigate("/login");
  };

  const handleManageTickets = () => {
    navigate("/tickets");
    setIsSidebarOpen(false); // Close sidebar on mobile after navigation
  };

  const handleDashboardClick = () => {
    navigate("/dashboard");
    setIsSidebarOpen(false); // Close sidebar on mobile after navigation
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <div className="flex min-h-screen bg-gray-50">
          {/* Mobile Menu Button */}
          <button
            onClick={toggleSidebar}
            className="fixed top-4 left-4 z-50 lg:hidden rounded-lg p-2 shadow-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            aria-label="Toggle sidebar"
          >
            {isSidebarOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>

          {/* Overlay for mobile */}
          {isSidebarOpen && (
            <div
              className="fixed inset-0 z-30 lg:hidden"
              onClick={() => setIsSidebarOpen(false)}
              aria-hidden="true"
            />
          )}

          {/* Sidebar */}
          <aside
            className={`fixed lg:static inset-y-0 left-0 z-40 w-64 transform border-r bg-background transition-transform duration-300 ease-in-out lg:translate-x-0 ${
              isSidebarOpen ? "translate-x-0" : "-translate-x-full"
            }`}
          >
            <div className="flex h-full flex-col">
              {/* Logo */}
              <div className="border-b p-6">
                <Link
                  to="/"
                  className="flex items-center gap-2 text-xl font-bold text-gray-900 dark:text-white"
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600">
                    <Ticket className="h-5 w-5 text-white" />
                  </div>
                  TicketFlow
                </Link>
              </div>

              {/* Navigation */}
              <nav className="flex-1 space-y-1 p-4">
                <button
                  className={`flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium dark:text-white text-gray-900 ${
                    pathname === "/dashboard"
                      ? "bg-indigo-50 dark:bg-indigo-900"
                      : "hover:bg-gray-50 hover:text-gray-900 dark:hover:bg-gray-900 dark:hover:text-gray-50"
                  }`}
                  onClick={handleDashboardClick}
                >
                  <LayoutDashboard className="h-5 w-5" />
                  Dashboard
                </button>
                <button
                  className={`flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium dark:text-white text-gray-900 ${
                    pathname === "/tickets"
                      ? "bg-indigo-50 dark:bg-indigo-900"
                      : "hover:bg-gray-50 hover:text-gray-900 dark:hover:bg-gray-900 dark:hover:text-gray-50"
                  }`}
                  onClick={handleManageTickets}
                >
                  <Ticket className="h-5 w-5" />
                  Manage Tickets
                </button>
              </nav>

              {/* Logout Button */}
              <div className="border-t p-4">
                <Button
                  variant="destructive"
                  className="w-full"
                  onClick={handleLogout}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </Button>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1 overflow-y-auto h-screen w-full lg:w-auto">
            {/* Header */}
            <Header />
            <main className="bg-[#FBFCF8] dark:bg-accent pt-16 lg:pt-0">
              {children}
            </main>
          </div>
        </div>
      </ThemeProvider>
    </>
  );
}
