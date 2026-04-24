"use client";

import React, { use } from "react";
import { Moon, Sun } from "lucide-react";
import { useRouter } from "next/navigation";
import { useWallet } from "./WalletContext";

const MobileHeader = ({ isDarkMode, toggleDarkMode, }) => {
    const router = useRouter();
    const { balance } = useWallet();

    return (
        <header className="sticky top-0 z-50 bg-white dark:bg-zinc-950 shadow-sm border-b border-gray-200 dark:border-zinc-800 lg:hidden">
            <div className="container mx-auto px-4 py-3 flex items-center justify-between">

                {/* LOGO */}
                <div className="flex items-center space-x-6">
                    <a href="#" className="-ml-5 h-10 p-3 center-item dark:text-white">
                        <img
                            src={isDarkMode ? "/onlySexprime.png" : "/onlySexbeta.png"}
                            alt="logo"
                            width={170}
                        />
                    </a>
                </div>

                {/* RIGHT ACTIONS */}
                <div className="flex items-center space-x-3">

                    {/* 💰 WALLET */}
                    <button
                        onClick={() => router.push("/wallet")}
                        className="flex items-center bg-gray-100 dark:bg-zinc-800 px-3 py-1 rounded-full active:scale-95 transition"
                    >
                        <span className="text-xs font-semibold text-gray-700 dark:text-gray-200">
                            💰 {balance.toLocaleString()} pecs
                        </span>
                    </button>

                    {/* DARK MODE */}
                    <button
                        onClick={toggleDarkMode}
                        className="p-1 rounded-lg text-gray-600 dark:text-gray-300 hover:text-pink-500 transition-colors"
                    >
                        {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
                    </button>

                </div>

            </div>
        </header>
    );
};

export default MobileHeader;