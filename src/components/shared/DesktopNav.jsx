import { Menu, ScrollText } from "lucide-react"

export const DesktopNav = () => {
  return (
    <header className="hidden md:block py-5 px-8">
      <div className="flex justify-between items-center">
        <p className="font-bold flex items-center gap-2">
          <span className="text-primary-600"><ScrollText /></span>
          <p>
            RainbowNote
          </p>
        </p>
        <nav className="">
          <ul className="flex items-center gap-6 text-dark-5 dark:text-white">
            <li className="">Home</li>
            <li className="">About</li>
            <li className="">Contact</li>
            <li className="">Blog</li>
            <li className="">
              <button className="py-2 px-4 border-2 rounded" type="button">
                Sign up
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}

