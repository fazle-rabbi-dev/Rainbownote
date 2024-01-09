import React, { useState, useEffect, useContext, createContext } from "react";

// Create a context for theme
export const ThemeContext = createContext();

// ThemeProvider component
export const ThemeProvider = ({ children }) => {
  const [isDarkModeEnabled, setIsDarkModeEnabled] = useState(false);

  // Toggle dark mode
  const toggleDarkMode = () => {
    const newMode = !isDarkModeEnabled;
    document.documentElement.classList.toggle("dark", newMode);
    localStorage.setItem("theme", newMode ? "dark" : "light");
    setIsDarkModeEnabled(newMode);
    console.log("Clicked");
  };

  // Set initial theme based on localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setIsDarkModeEnabled(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  const value = {
    toggleDarkMode,
    isDarkModeEnabled
  };

  // Provide the context value
  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook to use the theme context
export const useThemeContext = () => useContext(ThemeContext);