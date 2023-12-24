import {
  useState, useEffect
} from 'react';

export const Footer = () => {
  return (
    <footer className="custom_container shadow">
      <ul className="flex gap-3 justify-center items-center text-dark-5 md:text-sm dark:text-light-4">
        <li className="">Contact ・</li>
        <li className="">Blog ・</li>
        <li className="">About ・</li>
        <li className="">Github</li>
      </ul>
    </footer>
  )
}
