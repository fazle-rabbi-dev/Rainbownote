import { useRef, useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, Trash, PenSquare, AlignJustify, Heart } from "lucide-react";
import { bottomLinks } from "@/constants/BottomTabBarData";
import { SideBar } from "../ui/SideBar";

export const BottomTabBar = () => {
  const { pathname } = useLocation();

  const [isOpenSidebar, setIsOpenSidebar] = useState(false);
  const sidebarRef = useRef();
  const menuBtnRef = useRef();

  const toggleSideBar = () => {
    setIsOpenSidebar(curr => !curr);
  };

  useEffect(() => {
    const handleClickOutside = event => {
      if (
        isOpenSidebar &&
        !sidebarRef.current.contains(event.target) &&
        !menuBtnRef.current.contains(event.target)
      ) {
        setIsOpenSidebar(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isOpenSidebar]);

  return (
    <section className="bottom_tab_bar md:hidden">
      <SideBar
        isOpenSidebar={isOpenSidebar}
        sidebarRef={sidebarRef}
        toggleSideBar={toggleSideBar}
      />

      {/* Bottom Tabbar */}
      <ul className="flex justify-between items-center gap-2 h-full w-full px-4">
        <li className="">
          <button
            ref={menuBtnRef}
            onClick={toggleSideBar}
            className="flex flex-col justify-center items-center w-14 h-14"
            type="button"
          >
            <AlignJustify />
            <span className="text-tiny">Menu</span>
          </button>
        </li>
        {bottomLinks?.map(item => (
          <li key={item.name} className="">
            <Link
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
    </section>
  );
};
