import { useEffect, useState } from "react";
import {Link, useNavigate} from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Ticket,
  LogOut,
  Search,
  Settings,
  LayoutDashboard,
} from "lucide-react";

interface TicketType {
  id: string;
  title: string;
  description: string;
  status: "Open" | "In Progress" | "Closed";
  createdAt: string;
}

export default function DashboardPage() {
   const navigate = useNavigate();
  const [userEmail, setUserEmail] = useState("");
  const [activities, setActivities] = useState<
    Array<{ id: string; action: string; user: string; timestamp: string }>
    >([]);
  
  const [ticketStats, setTicketStats] = useState({
    total: 0,
    open: 0,
    inProgress: 0,
    closed: 0,
  });

  useEffect(() => {
   

    const storedActivities = localStorage.getItem("activities");
    if (storedActivities) {
      setActivities(JSON.parse(storedActivities));
    }

    const storedTickets = localStorage.getItem("tickets");
    if (storedTickets) {
      const tickets: TicketType[] = JSON.parse(storedTickets);
      const stats = {
        total: tickets.length,
        open: tickets.filter((t) => t.status === "Open").length,
        inProgress: tickets.filter((t) => t.status === "In Progress").length,
        closed: tickets.filter((t) => t.status === "Closed").length,
      };
      setTicketStats(stats);
    }
  }, [navigate]);


const getRelativeTime = (timestamp: string) => {
  const now = new Date();
  const activityTime = new Date(timestamp);
  const diffInSeconds = Math.floor(
    (now.getTime() - activityTime.getTime()) / 1000
  );

  if (diffInSeconds < 60) return "Just now";
  if (diffInSeconds < 3600)
    return `${Math.floor(diffInSeconds / 60)} minutes ago`;
  if (diffInSeconds < 86400)
    return `${Math.floor(diffInSeconds / 3600)} hours ago`;
  return `${Math.floor(diffInSeconds / 86400)} days ago`;
  };
  

  return (
    <div>
      {/* Dashboard Content */}
      <main className="p-8">
        <h1 className="mb-8 text-3xl font-bold text-foreground">
          Dashboard Overview
        </h1>

        {/* Stats Cards */}
        <div className="mb-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {/* Total Tickets */}
          <Card className="bg-blue-100">
            <CardContent className="p-6 py-2">
              <div className="mb-2 flex items-center gap-2 text-sm font-bold text-gray-600">
                <Ticket className="h-4 w-4" />
                Total Tickets
              </div>
              <div className="mb-2 text-4xl font-bold text-blue-600">
                {ticketStats.total}
              </div>
              <p className="text-sm text-gray-600">
                Overall count of all tickets.
              </p>
            </CardContent>
          </Card>

          {/* Open Tickets */}
          <Card className="bg-green-100">
            <CardContent className="p-6 py-2">
              <div className="mb-2 flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm font-bold text-gray-600">
                  <Ticket className="h-4 w-4" />
                  Open Tickets
                </div>
                {/* <Badge className="bg-green-600 hover:bg-green-700">
                  Active
                </Badge> */}
              </div>
              <div className="mb-2 text-4xl font-bold text-green-600">
                {ticketStats.open}
              </div>
              <p className="text-sm text-gray-600">
                Tickets awaiting resolution.
              </p>
            </CardContent>
          </Card>

          {/* In Progress Tickets */}
          <Card className="bg-[#FFBF00]/20 dark:bg-yellow-100">
            <CardContent className="p-6 py-2">
              <div className="mb-2 flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm font-bold text-gray-600">
                  <Ticket className="h-4 w-4" />
                  In Progress Tickets
                </div>
                {/* <Badge className="bg-yellow-600 hover:bg-yellow-700">
                    Ongoing
                  </Badge> */}
              </div>
              <div className="mb-2 text-4xl font-bold text-[#FFBF00] dark:text-black">
                {ticketStats.inProgress}
              </div>
              <p className="text-sm text-gray-600">
                Tickets currently being handled.
              </p>
            </CardContent>
          </Card>

          {/* Closed Tickets */}
          <Card className="bg-gray-100">
            <CardContent className="p-6 py-2">
              <div className="mb-2 flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm font-bold text-gray-600">
                  <Ticket className="h-4 w-4" />
                  Closed Tickets
                </div>
                {/* <Badge variant="secondary">Archived</Badge> */}
              </div>
              <div className="mb-2 text-4xl font-bold text-gray-600">
                {ticketStats.closed}
              </div>
              <p className="text-sm text-gray-600">
                Tickets successfully resolved.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <div>
          <h2 className="mb-2 text-2xl font-bold text-foreground">
            Recent Activity
          </h2>
          <p className="mb-6 text-gray-600 dark:text-gray-400">
            Monitor the latest updates and interactions across your support
            tickets.
          </p>

          <div className="space-y-2">
            {/* Activity Items */}
            {activities.length > 0 ? (
              activities.slice(0, 5).map((activity) => (
                <div
                  key={activity.id}
                  className="flex items-center justify-between rounded-lg bg-white p-4 shadow-sm"
                >
                  <p className="text-gray-900 text-sm">{activity.action}</p>
                  <span className="text-sm text-gray-500">
                    {getRelativeTime(activity.timestamp)}
                  </span>
                </div>
              ))
            ) : (
              <div className="rounded-lg bg-white p-8 text-center shadow-sm">
                <p className="text-gray-500">
                  No recent activity. Create, edit, or delete tickets to see
                  activity here.
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
