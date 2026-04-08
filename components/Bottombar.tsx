'use client';

import { navLeftItemsTwo } from '@/constants';
import { usePathname, useRouter } from 'next/navigation';
import React from 'react';

const Bottombar = () => {
    const router = useRouter();
    const pathname = usePathname();

    return (
        <footer className="fixed bottom-0 left-0 right-0 z-50 flex justify-around items-center px-4 py-3 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md shadow-[0_-5px_20px_rgba(0,0,0,0.08)] border-t border-gray-200/60 dark:border-zinc-800/60 lg:hidden">
            {navLeftItemsTwo.map((item, index) => {
                const isActive = pathname === item.path;

                return (

                    <button
                        key={index}
                        onClick={() => router.push(item.path)}
                        className="flex flex-col items-center justify-center gap-1 relative"
                    >
                        {/* 🔥 Icône */}
                        <item.icon
                            size={30}
                            className={`transition-all duration-200 ${isActive
                                ? "text-black dark:text-white scale-100"
                                : "text-gray-400 scale-90"
                                }`}
                        />
                    </button>
                );
            })}
        </footer>
    );
};

export default Bottombar;