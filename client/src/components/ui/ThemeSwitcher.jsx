import React, { useState, useEffect } from "react";

const ThemeSwitcher = () => {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <button
      onClick={toggleTheme}
      className="
        flex items-center gap-2
        px-4 py-1.5
        rounded-full
        bg-gradient-to-r from-blue-500 to-indigo-600
        dark:from-gray-700 dark:to-gray-900
        text-white text-sm font-medium
        shadow-md hover:shadow-lg
        hover:scale-105
        transition-all duration-300
      "
    >
      {theme === "light" ? "🌙 Dark Mode" : "☀️ Light Mode"}
    </button>
  );
};

export default ThemeSwitcher;
