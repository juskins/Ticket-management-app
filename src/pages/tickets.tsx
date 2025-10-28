import { useEffect, useState } from "react";
import {Link, useNavigate} from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Ticket, LogOut, LayoutDashboard, Search } from "lucide-react";
import { toast } from "sonner";

type TicketStatus = "Open" | "In Progress" | "Closed";

interface TicketType {
  id: string;
  title: string;
  description: string;
  status: TicketStatus;
  createdAt: string;
}

interface ActivityType {
  id: string;
  action: string;
  user: string;
  timestamp: string;
}

export default function TicketsPage() {
   const navigate = useNavigate();
  const [tickets, setTickets] = useState<TicketType[]>([]);
  const [newTicketTitle, setNewTicketTitle] = useState("");
  const [newTicketDescription, setNewTicketDescription] = useState("");
  const [newTicketStatus, setNewTicketStatus] = useState<TicketStatus>("Open");
  const [titleError, setTitleError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");

  // Edit dialog state
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editingTicket, setEditingTicket] = useState<TicketType | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editStatus, setEditStatus] = useState<TicketStatus>("Open");
  const [editTitleError, setEditTitleError] = useState("");
  const [editDescriptionError, setEditDescriptionError] = useState("");

  // Delete confirmation state
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deletingTicketId, setDeletingTicketId] = useState<string | null>(null);

  useEffect(() => {
    // Load tickets from localStorage
    const storedTickets = localStorage.getItem("tickets");
    if (storedTickets) {
      setTickets(JSON.parse(storedTickets));
    } else {
      // Initialize with sample tickets
      const sampleTickets: TicketType[] = [
        {
          id: "1",
          title: "Email server outage affecting all users",
          description:
            "Users are reporting inability to send or receive emails since 09:00 AM UTC. Investigation is ongoing. High priority",
          status: "In Progress",
          createdAt: new Date().toISOString(),
        },
        {
          id: "2",
          title: "Request for new user onboarding flow documentation",
          description:
            "The current onboarding process lacks clear documentation for new hires. Need a comprehensive guide.",
          status: "Open",
          createdAt: new Date().toISOString(),
        },
        {
          id: "3",
          title: "Database connection intermittent on production",
          description:
            "Intermittent connection drops observed on the main production database. Performance degradation reported.",
          status: "Open",
          createdAt: new Date().toISOString(),
        },
        {
          id: "4",
          title: "Feature request: Dark mode for web application",
          description:
            "Users have requested a dark mode option for improved accessibility and user preference, especially during night usage.",
          status: "Closed",
          createdAt: new Date().toISOString(),
        },
        {
          id: "5",
          title: "Bug: Password reset link not delivered",
          description:
            "Multiple users unable to receive password reset emails. Check SMTP server logs and mail delivery service.",
          status: "In Progress",
          createdAt: new Date().toISOString(),
        },
        {
          id: "6",
          title: "Update security protocols for API endpoints",
          description:
            "Review and update all API endpoint security protocols to comply with the latest industry standards.",
          status: "Open",
          createdAt: new Date().toISOString(),
        },
      ];
      setTickets(sampleTickets);
      localStorage.setItem("tickets", JSON.stringify(sampleTickets));
    }
  }, [navigate]);


  const validateCreateForm = () => {
    let isValid = true;

    if (!newTicketTitle.trim()) {
      setTitleError("Ticket title is required");
      isValid = false;
    } else {
      setTitleError("");
    }

    if (!newTicketDescription.trim()) {
      setDescriptionError("Description is required");
      isValid = false;
    } else {
      setDescriptionError("");
    }

    return isValid;
  };

  const handleCreateTicket = () => {
    if (!validateCreateForm()) {
      return;
    }

    const newTicket: TicketType = {
      id: Date.now().toString(),
      title: newTicketTitle,
      description: newTicketDescription,
      status: newTicketStatus,
      createdAt: new Date().toISOString(),
    };

    const updatedTickets = [...tickets, newTicket];
    setTickets(updatedTickets);
    localStorage.setItem("tickets", JSON.stringify(updatedTickets));
    logActivity(`Created ticket "${newTicketTitle}"`);

    // Reset form
    setNewTicketTitle("");
    setNewTicketDescription("");
    setNewTicketStatus("Open");
    setTitleError("");
    setDescriptionError("");

    toast.success("Ticket created",{
      description: "Your support ticket has been created successfully.",
    });
  };

  const handleEditClick = (ticket: TicketType) => {
    setEditingTicket(ticket);
    setEditTitle(ticket.title);
    setEditDescription(ticket.description);
    setEditStatus(ticket.status);
    setEditTitleError("");
    setEditDescriptionError("");
    setEditDialogOpen(true);
  };

  const validateEditForm = () => {
    let isValid = true;

    if (!editTitle.trim()) {
      setEditTitleError("Ticket title is required");
      isValid = false;
    } else {
      setEditTitleError("");
    }

    if (!editDescription.trim()) {
      setEditDescriptionError("Description is required");
      isValid = false;
    } else {
      setEditDescriptionError("");
    }

    return isValid;
  };

  const handleSaveEdit = () => {
    if (!validateEditForm() || !editingTicket) {
      return;
    }

    const updatedTickets = tickets.map((ticket) =>
      ticket.id === editingTicket.id
        ? {
            ...ticket,
            title: editTitle,
            description: editDescription,
            status: editStatus,
          }
        : ticket
    );

    setTickets(updatedTickets);
    localStorage.setItem("tickets", JSON.stringify(updatedTickets));
    setEditDialogOpen(false);

    logActivity(`Updated ticket "${editTitle}"`);
    setEditingTicket(null);

    toast.success("Ticket updated", {
      description: "The ticket has been updated successfully.",
    });
  };

  const handleDeleteClick = (ticketId: string) => {
    setDeletingTicketId(ticketId);
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    if (!deletingTicketId) return;

     const ticketToDelete = tickets.find(
       (ticket) => ticket.id === deletingTicketId
     );
     const ticketTitle = ticketToDelete?.title || "Unknown ticket";

    const updatedTickets = tickets.filter(
      (ticket) => ticket.id !== deletingTicketId
    );
    setTickets(updatedTickets);
    localStorage.setItem("tickets", JSON.stringify(updatedTickets));
    setDeleteDialogOpen(false);
    setDeletingTicketId(null);

    logActivity(`Deleted ticket "${ticketTitle}"`);

    toast.error("Ticket deleted",{
      description: "The ticket has been removed successfully.",
    });
  };

  const getStatusBadgeVariant = (status: TicketStatus) => {
    switch (status) {
      case "Open":
        return "bg-green-600 hover:bg-green-700 text-white";
      case "In Progress":
        return "bg-yellow-600 hover:bg-yellow-700 text-white";
      case "Closed":
        return "bg-gray-600 hover:bg-gray-700 text-white";
      default:
        return "bg-gray-600 hover:bg-gray-700 text-white";
    }
  };

  const userEmail =
    typeof window !== "undefined" ? localStorage.getItem("userEmail") : null;
  const userInitial = userEmail ? userEmail.charAt(0).toUpperCase() : "U";


  const logActivity = (action: string) => {
    const userEmail = localStorage.getItem("userEmail") || "User";
    const activity = {
      id: Date.now().toString(),
      action,
      user: userEmail,
      timestamp: new Date().toISOString(),
    };

    const existingActivities = localStorage.getItem("activities");
    const activities = existingActivities ? JSON.parse(existingActivities) : [];
    const updatedActivities = [activity, ...activities].slice(0, 20); // Keep only last 20 activities

    localStorage.setItem("activities", JSON.stringify(updatedActivities));
  };

  return (
    <div className="flex min-h-screen">
      {/* Main Content */}
      <div className="p-8">
        {/* Create New Ticket Section */}
        <div className="mb-12">
          <h1 className="text-3xl font-bold text-foreground">
            Create New Ticket
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Submit a new support request for your team.
          </p>

          <div className="mt-6 space-y-6">
            <div>
              <Label htmlFor="title">Ticket Title</Label>
              <Input
                id="title"
                placeholder="e.g., VPN connection issue"
                value={newTicketTitle}
                onChange={(e) => {
                  setNewTicketTitle(e.target.value);
                  if (titleError) setTitleError("");
                }}
                className="mt-2"
              />
              {titleError && (
                <p className="mt-1 text-sm text-red-600">{titleError}</p>
              )}
            </div>

            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Provide details about the issue..."
                value={newTicketDescription}
                onChange={(e) => {
                  setNewTicketDescription(e.target.value);
                  if (descriptionError) setDescriptionError("");
                }}
                className="mt-2 min-h-[100px]"
              />
              {descriptionError && (
                <p className="mt-1 text-sm text-red-600">{descriptionError}</p>
              )}
            </div>

            <div>
              <Label htmlFor="status">Status</Label>
              <Select
                value={newTicketStatus}
                onValueChange={(value) =>
                  setNewTicketStatus(value as TicketStatus)
                }
              >
                <SelectTrigger className="mt-2">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Open">Open</SelectItem>
                  <SelectItem value="In Progress">In Progress</SelectItem>
                  <SelectItem value="Closed">Closed</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button
              onClick={handleCreateTicket}
              className="w-full bg-indigo-600 dark:text-white hover:bg-indigo-700"
            >
              Create Ticket
            </Button>
          </div>
        </div>

        {/* All Tickets Section */}
        <div>
          <h2 className="text-2xl font-bold text-foreground">All Tickets</h2>

          <div className="mt-6 grid gap-6 md:grid-cols-2">
            {tickets.map((ticket) => (
              <div
                key={ticket.id}
                className="rounded-lg border bg-background p-6 shadow-sm"
              >
                <div className="mb-4">
                  <h3 className="text-lg font-semibold text-foreground">
                    {ticket.title}
                  </h3>
                  <Badge
                    className={`mt-2 ${getStatusBadgeVariant(ticket.status)}`}
                  >
                    {ticket.status}
                  </Badge>
                </div>
                <p className="mb-6 text-sm text-gray-600 dark:text-gray-400">
                  {ticket.description}
                </p>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    onClick={() => handleEditClick(ticket)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={() => handleDeleteClick(ticket.id)}
                  >
                    Delete
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Edit Dialog */}
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Ticket</DialogTitle>
            <DialogDescription>
              Make changes to the ticket details below.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div>
              <Label htmlFor="edit-title">Ticket Title</Label>
              <Input
                id="edit-title"
                value={editTitle}
                onChange={(e) => {
                  setEditTitle(e.target.value);
                  if (editTitleError) setEditTitleError("");
                }}
                className="mt-2"
              />
              {editTitleError && (
                <p className="mt-1 text-sm text-red-600">{editTitleError}</p>
              )}
            </div>
            <div>
              <Label htmlFor="edit-description">Description</Label>
              <Textarea
                id="edit-description"
                value={editDescription}
                onChange={(e) => {
                  setEditDescription(e.target.value);
                  if (editDescriptionError) setEditDescriptionError("");
                }}
                className="mt-2 min-h-[100px]"
              />
              {editDescriptionError && (
                <p className="mt-1 text-sm text-red-600">
                  {editDescriptionError}
                </p>
              )}
            </div>
            <div>
              <Label htmlFor="edit-status">Status</Label>
              <Select
                value={editStatus}
                onValueChange={(value) => setEditStatus(value as TicketStatus)}
              >
                <SelectTrigger className="mt-2">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Open">Open</SelectItem>
                  <SelectItem value="In Progress">In Progress</SelectItem>
                  <SelectItem value="Closed">Closed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveEdit}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              ticket from the system.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirmDelete}
              className="bg-red-600 hover:bg-red-700"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
