"use client"

import { User } from 'lucide-react'
import React from 'react'
import { suggestions } from "@/constants";

const RightSidebar = () => {
    return (
        <div className='sticky top-0 pt-8 mt-[90px] space-y-5 w-full'>
            {/* Current User Profile Summary */}
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                    <div className="w-14 h-14 rounded-full overflow-hidden bg-pink flex-shrink-0 flex items-center justify-center">
                        <User size={32} className='text-white' />
                    </div>
                    <div className="">
                        <p className="font-semibold text-sm">
                            my_user_handle
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            Jane Doe
                        </p>
                    </div>
                </div>

                <button className="text-pink text-xs font-semibold hover:text-pink-700 dark:hover:text-pink-400">
                    Switch
                </button>


            </div>
            {/* Suggestions */}

            <div className="space-y-3">
                <div className="flex items-center justify-between">
                    <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400">
                        Suggestions for you
                    </h3>
                    <a href="#" className='text-xs font-semibold text-sky-5 dark:text-white hover:text-blue-500 hover:underline'>
                        See All
                    </a>
                </div>


                {/* Suggestions items */}

                {
                    suggestions.map((user, index) => (
                        <div key={index} className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                                <div className="w-9 h-9 rounded-full overflow-hidden bg-gray-300 flex-shrink-0 flex items-center justify-center">
                                    {
                                        user.src !== null ? (<img src={user.src} alt="profile_image" className="size-full " />)
                                            : (<User size={18} className='text-white dark:text-gray-400' />)
                                    }
                                </div>

                                <div className="text-sm">
                                    <p className="font-semibold">
                                        {user.name}
                                    </p>

                                    <p className="text-xs text-gray-500 dark:text-gray-400">
                                        Recommended for you
                                    </p>
                                </div>


                            </div>
                        </div>
                    ))
                }

            </div>
        </div>
    )
}

export default RightSidebar