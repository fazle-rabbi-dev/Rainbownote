import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="px-8 py-2 font-patrik_hand md:text-center md:py-4">
      <p>
        Made with &hearts; by{" "}
        <a
          className="text-purple-600 active:text-purple-600 dark:text-purple-500"
          href="https://bio.link/fazle_rabbi_dev"
          target="_blank"
        >
          Fazle Rabbi
        </a>
      </p>

      <span className="text-gray-500 dark:text-gray-100">&copy; 2023-{new Date().getFullYear()}</span>
    </footer>
  );
};
