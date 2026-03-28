"use client"; // car on utilise useState

import { useState } from "react";

export function useUI() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return {
    isDarkMode,
    toggleDarkMode,
    isSidebarOpen,
    toggleSidebar,
  };
}