import { Search, Settings } from "lucide-react";
import { ModeToggle } from "./mode-toggle";
import { useEffect, useState } from "react";

const Header = () => {
  const [userEmail, setUserEmail] = useState("");
  const pathname = window.location.pathname;
  useEffect(() => {
    const email = localStorage.getItem("userEmail");
    if (email) {
      setUserEmail(email);
    }
  });
  return (
    <div>
      <header className="border-b bg-background">
        <div className="flex h-16 items-center justify-end gap-4 px-8">
          <button className="rounded-lg p-2 hover:bg-gray-100 dark:hover:bg-gray-800">
            <Search className="h-5 w-5 text-gray-600" />
          </button>
          <button className="rounded-lg p-2 hover:bg-gray-100 dark:hover:bg-gray-800">
            <Settings className="h-5 w-5 text-gray-600" />
          </button>
          <ModeToggle />
          {pathname !== "/login" && (
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-600 text-sm font-medium text-white">
              {userEmail.charAt(0).toUpperCase()}
            </div>
          )}
        </div>
      </header>
    </div>
  );
};

export default Header;
