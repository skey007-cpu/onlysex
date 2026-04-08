'use client'

import { styles } from "@/constants";
import MobileHeader from '@/components/MobileHeader';
import LeftSidebar from '@/components/LeftSidebar';
import { useState } from "react";
import Bottombar from "./Bottombar";


export default function Layout({
    children,
}: {
    children: React.ReactNode;
}) {
    const [isDarkMode, setIsDarkMode] = useState(false)
    const [isSidebarOpen, setIsSidebarOpen] = useState(true)

    const toggleDarkMode = () => (
        setIsDarkMode(!isDarkMode)
    )

    const toggleSidebar = () => (
        setIsSidebarOpen(!isSidebarOpen)
    )

    return (
        <div className={`${isDarkMode ? "dark bg-zinc-950" : "bg-white"} min-h-screen antialiased text-zinc-400 dark:text-gray-200 `}>
            <style>{styles}</style>

            <MobileHeader isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />

            <div className="flex">
                <LeftSidebar
                    isSidebarOpen={isSidebarOpen}
                    toggleSidebar={toggleSidebar}
                    toggleDarkMode={toggleDarkMode}
                    isDarkMode={isDarkMode}
                />

                <main className="flex-1 w-full lg:max-w-none">
                    {children}
                </main>
            </div>


            <Bottombar />
        </div>
    );
};
