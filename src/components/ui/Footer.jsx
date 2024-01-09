import {
  useState, useEffect
} from 'react';
import { Link } from "react-router-dom"

export const Footer = () => {
  return (
    <footer className="custom_container shadow">
      <ul className="flex gap-3 justify-center items-center text-dark-5 md:text-sm dark:text-light-4">
        <li className="">
          <Link target="_blank" to="https://fazle-rabbi-dev.vercel.app/contact?source=rainbownote">
            Contact ・
          </Link>
        </li>
        <li className="">
          <Link target="_blank" to="https://fazle-rabbi-dev.vercel.app/blogs?source=rainbownote">
            Blogs ・
          </Link>
        </li>
        <li className="">
          <Link target="_blank" to="https://fazle-rabbi-dev.vercel.app/about?source=rainbownote">
            About ・
          </Link>
        </li>
        <li className="">
          <Link target="_blank" to="https://github.com/fazle-rabbi-dev/rainbownote">
            Github
          </Link>
        </li>
      </ul>
    </footer>
  )
}
