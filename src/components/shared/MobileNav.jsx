import { useState } from "react";
import { Menu, ScrollText, X } from "lucide-react";
import { Link } from "react-router-dom";
import NavLinkData from "@/constants/NavLinkData"

export const MobileNav = ({ padding }) => {
  const [openMenu, setOpenMenu] = useState(false);

  return (
    <header className={`md:hidden py-5 ${padding ? padding : "px-8"}`}>
      <div className="flex justify-between items-center">
        <p className="text-xl flex items-center gap-2">
          <span className="text-primary-600">
            <ScrollText />
          </span>
          <p>Rainbownote</p>
        </p>
        <nav className="">
          <button
            onClick={() => setOpenMenu(true)}
            className="text-primary-600"
            type="button"
          >
            <Menu />
          </button>

          <div
            className={`fixed py-4 px-8 top-0 right-0 h-screen w-7/12 bg-light-1 shadow transition dark:bg-dark-3 ${
              openMenu ? "translate-x-0" : "translate-x-full"
            }`}
          >
            <div className="text-end">
              <button onClick={() => setOpenMenu(false)} className="p-2 rounded text-primary-600" type="button">
                <X />
              </button>
            </div>
            <ul className="py-2 space-y-4">
              {
                NavLinkData?.map(navLink => (
                  <li key={navLink.id} className="">
                    <Link to={navLink.link}>{navLink.name}</Link>
                  </li>
                    
                  ))
              }

            </ul>
          </div>
        </nav>
      </div>
    </header>
  );
};