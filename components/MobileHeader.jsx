"use client"

import React from 'react'
import Logo from './Logo'
import { Heart, Moon, Send, Sun } from 'lucide-react'

const MobileHeader = ({ isDarkMode, toggleDarkMode }) => {
    return (
        <header className='sticky top-0 z-50 bg-white dark:bg-zinc-950 shadow-sm border-b border-gray-200 dark:border-zinc-800 lg:hidden' >
            <div className="container mx-auto px-4 py-3 flex items-center justify-between">
                <div className="flex items-center space-x-4">
                    {/* <Logo isDarkMode={isDarkMode} /> */}
                    {/* <div></div> */}

                    <a href="#" className='-ml-5 h-10 center-item dark:text-white'>
                        {/* <img src={isDarkMode ? "/onlySex.png" : "/onlySex.png"} alt="logo" width={150} /> */}
                        <img src={isDarkMode ? "/onlySexprime.png" : "/onlySexbeta.png"} alt="logo" width={170} />
                    </a>
                </div>

                <div className="flex items-center space-x-4">
                    <Send size={24} className="cursor-pointer hover:text-pink-500 transition-colors" />
                    <Heart size={24} className="cursor-pointer hover:text-pink-500 transition-colors" />

                    <button onClick={toggleDarkMode} className='p-1 rounded-lg text-gray-600 dark:text-gray-300 hover:text-pink-500 transition-colors'>
                        {
                            isDarkMode ? <Sun size={20} /> : <Moon size={20} />
                        }
                    </button>
                </div>

            </div>
        </header>
    )
}

export default MobileHeader