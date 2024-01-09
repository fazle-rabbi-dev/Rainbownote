import { Menu, ScrollText } from "lucide-react";
import { Link } from "react-router-dom";

export const DesktopNav = ({ padding }) => {
  return (
    <header className={`hidden md:block py-5 ${padding ? padding : "px-8"}`}>
      <div className="flex justify-between items-center">
        <Link to="/" className="font-bold flex items-center gap-2">
          <img className="w-7 h-7" src="/apple-touch-icon.png" alt="" />
          <p>RainbowNote</p>
        </Link>
        <nav className="">
          <ul className="flex items-center gap-6 text-dark-5 dark:text-white">
            <li className="">
              <Link to="/">Home</Link>
            </li>
            <li className="">
              <Link to="/about">About</Link>
            </li>
            <li className="">
              <Link
                target="_blank"
                to="https://fazle-rabbi-dev.vercel.app/contact?clicked_from=rainbownote"
              >
                Contact
              </Link>
            </li>
            <li target="_blank" className="">
              <Link to="https://fazle-rabbi-dev.vercel.app/blogs?clicked_from=rainbownote">
                Blogs
              </Link>
            </li>

            <li className="">
              <Link
                to="/sign-up"
                className="py-2 px-4 border-2 rounded"
                type="button"
              >
                Sign up
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};
