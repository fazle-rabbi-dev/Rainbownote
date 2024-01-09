import { useEffect } from "react";
import {
  Home,
  Trash,
  PenSquare,
  Heart,
  LogOut,
  Moon,
  SunMedium,
  Settings,
  HelpCircle,
  Code2,
  Bug
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { deskTopSidebarLinks } from "../../constants/DesktopSidebarData";
import { useUserContext } from "@/context";
import { useSignOut } from "@/lib/react-query/QueriesAndMutations";
import { useThemeContext } from "@/context";

export const DesktopSideBar = () => {
  const navigate = useNavigate();
  const { toggleDarkMode, isDarkModeEnabled } = useThemeContext();

  const { user, setIsLoggedIn, checkAuthUser } = useUserContext();
  const { mutateAsync: Logout } = useSignOut();

  const handleLogout = async () => {
    const res = await Logout();
    if (res?.status === "ok") {
      setIsLoggedIn(false);
      navigate("/sign-in");
    }
  };

  return (
    <nav className="hidden md:block bg-light-2 w-[30%] fixed top-0 bottom-0 dark:bg-dark-3">
      <div className="h-full overflow-auto p-4 flex gap-10 flex-col justify-between">
        <div>
          <div className="flex gap-2 items-center">
            <img className="w-7 h-7" src="/rainbow-note-logo.png" alt="Logo" />
            <span>RainbowNote</span>
          </div>

          {/* Display User Info */}
          <div className="my-4">
            <h2 className="h2-bold">{user?.name}</h2>
            <p className="info text-tiny">{user?.email}</p>
          </div>

          {/* Display Links */}
          <ul className="left_sidebar_menu">
            {deskTopSidebarLinks?.map(item => (
              <li key={item.id} className="">
                <Link
                  target={
                    (item.name === "Source code" ||
                      item.name === "Report issue") &&
                    "__blank"
                  }
                  to={item.link}
                  className="flex gap-2 py-2 rounded hover:bg-light-2 dark:hover:bg-dark-3"
                >
                  <span>
                    {item.name === "Home" ? (
                      <Home />
                    ) : item.name === "Trash" ? (
                      <Trash />
                    ) : item.name === "Create" ? (
                      <PenSquare />
                    ) : item.name === "Favourite" ? (
                      <Heart />
                    ) : item.name === "Source code" ? (
                      <Settings />
                    ) : item.name === "Report issue" ? (
                      <HelpCircle />
                    ) : item.name === "About" ? (
                      <Code2 />
                    ) : (
                      <Bug />
                    )}
                  </span>
                  <span>{item?.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <button
              onClick={handleLogout}
              className="bg-primary-500 text-white py-2 px-4 rounded flex gap-2 items-center dark:bg-dark-3"
              type="button"
            >
              <span>
                <LogOut />
              </span>
              <span>Logout</span>
            </button>
            <button onClick={toggleDarkMode} type="button">
              {isDarkModeEnabled ? <SunMedium /> : <Moon />}
            </button>
          </div>
          <p className="text-sm text-gray-500">
            Made with &hearts; By Fazle Rabbi
          </p>
        </div>
      </div>
    </nav>
  );
};
