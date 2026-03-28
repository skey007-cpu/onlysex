"use client";

import { ChevronLeft, Home, Search, Compass, Film, Send, PlusSquare, User, Bell, Settings, Sun, Moon, Power } from 'lucide-react';
import React from 'react';
import Logo from './Logo';
import LeftNavButton from './LeftNavButton';
// import { signOutUser } from '@/lib/actions/user.actions';
import { useUI } from "@/hooks/useUI";

const LeftSidebar = () => {
    const { isSidebarOpen, toggleSidebar, isDarkMode, toggleDarkMode } = useUI();


    const sidebarWidth = isSidebarOpen ? "w-[240px]" : "w-[75px]";

    return (
        <div
            className={`hidden lg:block sticky top-0 h-screen ${sidebarWidth} flex-shrink-0 border-r border-gray-200 dark:border-gray-700/60 p-2 pt-6 bg-white dark:bg-zinc-900 transition-all duration-300 ease-in-out z-40`}
            style={{
                paddingLeft: isSidebarOpen ? "1rem" : "0.5rem",
                paddingRight: isSidebarOpen ? "1rem" : "0.5rem",
            }}
        >
            <div className="mb-8 relative">
                {isSidebarOpen ? (
                    <a href="#" onClick={toggleSidebar}>
                        <img src={isDarkMode ? "/onlySex.png" : "/onlySex.png"} alt="logo" width={170} />
                    </a>
                ) : (
                    <Logo toggleSidebar={toggleSidebar} isDarkMode={isDarkMode} />
                )}

                <button
                    onClick={toggleSidebar}
                    className="cursor-pointer p-1 absolute right-0 top-1 rounded-full z-[99] text-gray-600 dark:text-gray-100/80 hover:backdrop-blur-sm dark:hover:bg-gray-700 hidden xl:block"
                    title={isSidebarOpen ? "Collapse Sidebar" : "Expand Sidebar"}
                >
                    <ChevronLeft size={24} className={isSidebarOpen ? "" : "rotate-180"} />
                </button>
            </div>

            <nav className="space-y-1">
                <LeftNavButton icon={Home} label="Home" active isSidebarOpen={isSidebarOpen} />
                <LeftNavButton icon={Search} label="Search" isSidebarOpen={isSidebarOpen} />
                <LeftNavButton icon={Compass} label="Explore" isSidebarOpen={isSidebarOpen} />
                <LeftNavButton icon={Film} label="Reels" isSidebarOpen={isSidebarOpen} />
                <LeftNavButton icon={Send} label="Messages" isSidebarOpen={isSidebarOpen} />
                <LeftNavButton icon={Bell} label="Notifications" isSidebarOpen={isSidebarOpen} />
                <LeftNavButton icon={PlusSquare} label="Create" isSidebarOpen={isSidebarOpen} />
                <LeftNavButton icon={User} label="Profile" isSidebarOpen={isSidebarOpen} />
            </nav>

            <div className="absolute bottom-4 left-0 right-0 px-2 xl:px-4 space-y-1">
                <LeftNavButton icon={Settings} label="Settings" active isSidebarOpen={isSidebarOpen} />
                <LeftNavButton logout icon={Power} label="Logout" isSidebarOpen={isSidebarOpen} />

                {/* <button
                    onClick={toggleDarkMode}
                    className={`flex items-center p-3 rounded-lg transition-colors duration-200 w-full ${isSidebarOpen ? "space-x-4 justify-start" : "justify-center"
                        } text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700`}
                    title="Toggle Dark Mode"
                >
                    {isDarkMode ? <Sun size={24} /> : <Moon size={24} />}
                    {isSidebarOpen && <span className="truncate">Theme</span>}
                </button> */}
            </div>
        </div>
    );
};

export default LeftSidebar;