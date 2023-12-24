import { useRef, useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Home,
  Trash,
  Package,
  PenSquare,
  AlignJustify,
  X,
  Heart,
  LogOut
} from "lucide-react";
import { bottomLinks, sidebarLinks } from "@/constants/BottomTabBarData";
import { useUserContext } from "@/context"
import { useSignOut } from "@/lib/react-query/QueriesAndMutations"

export const BottomTabBar = () => {
  const { pathname } = useLocation();
  const [openSidebar, setOpenSidebar] = useState(false);
  const sidebarRef = useRef();
  const menuBtnRef = useRef();
  const { user, setIsLoggedIn, checkAuthUser } = useUserContext()
  const { mutateAsync: Logout } = useSignOut()
  const navigate = useNavigate()

  const openMenu = () => {
    setOpenSidebar(true);
  };

  const handleLogout = async () => {
    const res = await Logout();
    if(res?.status === "ok"){
      setIsLoggedIn(false)
      navigate("/sign-in")
    }
  }

  useEffect(() => {
    const handleClickOutside = event => {
      console.log(menuBtnRef.current);

      if (
        openSidebar &&
        !sidebarRef.current.contains(event.target) &&
        !menuBtnRef.current.contains(event.target)
      ) {
        // setOpenSidebar((prev) => setOpenSidebar(!prev))
      }
    };

    // Attach the event listener when the component mounts
    // document.addEventListener('click', handleClickOutside);

    // Clean up the event listener when the component unmounts
    return () => {
      // document.removeEventListener('click', handleClickOutside);
    };
  }, [openSidebar]);

  return (
    <div className="bottom_tab_bar">
      <nav
        className={`left_sidebar_container ${
          openSidebar ? "left-0" : "left-[-100%]"
        }`}
      >
        <div ref={sidebarRef} className="left_sidebar">
          <span
            onClick={() => setOpenSidebar(false)}
            className="absolute right-4 bg-light-2 p-1 rounded dark:bg-dark-3"
          >
            <X />
          </span>
          
          {/* Display User Info */}
          <div>
          <div className="mb-4">
            <img className="w-14 h-14 rounded-full" src={user?.imageUrl} alt={user?.name} />
            <h2 className="h2-bold">
              {user?.name}
            </h2>
          </div>
          
          <ul className="left_sidebar_menu">
            {sidebarLinks?.map(item => (
              <li key={item.id} className="">
                <Link
                  to=""
                  className="block p-2 rounded hover:bg-light-2 dark:hover:bg-dark-3"
                >
                  {item?.name}
                </Link>
              </li>
            ))}
          </ul>
          </div>
          
          <div className="space-y-2">
            <button
              onClick={handleLogout}
              className="bg-primary-500 py-2 px-4 rounded flex gap-2 items-center dark:bg-dark-3"
              type="button"
            >
              <span>
                <LogOut />
              </span>
              <span>Logout</span>
            </button>
            <p className="text-sm text-gray-500">
              Made with &hearts; By Fazle Rabbi
            </p>
          </div>
        </div>
      </nav>
      
      {/* Bottom Tabbar */}
      <ul className="flex justify-between items-center gap-2 h-full w-full px-4">
        {bottomLinks?.map(item => (
          <li key={item.name} className="">
            <Link
              ref={menuBtnRef}
              onClick={item.name === "Menu" && openMenu}
              className={`flex flex-col justify-center items-center gap-1 w-14 h-14 rounded   ${
                pathname === item.link && "text-primary-600 font-extra-bold"
              }`}
              to={item.link}
            >
              <span>
                {item.icon === "AlignJustify" ? (
                  <AlignJustify />
                ) : item.icon === "Home" ? (
                  <Home />
                ) : item.icon === "Trash" ? (
                  <Trash />
                ) : item.icon === "Heart" ? (
                  <Heart />
                ) : (
                  <PenSquare />
                )}
              </span>
              <span className="text-tiny">{item.name}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
