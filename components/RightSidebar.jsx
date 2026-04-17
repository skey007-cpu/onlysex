'use client'

import { User } from 'lucide-react'
import React from 'react'
// import { suggestions } from "@/constants";


/**
 * @typedef {Object} RightSidebarProps
 * @property {any[]} posted
 */

const RightSidebar = ({ posted, user }) => {


    const sugestions = { posted }
    const currentUser = { user }

    console.log({ sugestions })

    return (
        <div className='sticky top-0 mt-[25px] space-y-5 w-full'>
            {/* Current User Profile Summary */}
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                    <div className="w-14 h-14 rounded-full bg-greens-95 overflow-hidden flex-shrink-0 flex items-center justify-center">

                        <img
                            src={
                                currentUser.user?.imageUrl ||
                                "<User size={32} className='text-white' />"
                            }
                            alt="creator"
                            className="w-12 lg:h-12 rounded-full"
                        />
                    </div>
                    <div className="">
                        <p className="font-semibold text-sm">
                            {currentUser.user?.fullName}
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            @{currentUser.user.username}
                        </p>
                    </div>
                </div>

                <button className="text-greens-95 text-xs font-semibold hover:text-pink-700 dark:hover:text-pink-400">
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
                    sugestions.posted.map((user, index) => (
                        <div key={index} className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                                <div className="w-9 h-9 rounded-full overflow-hidden bg-gray-300 flex-shrink-0 flex items-center justify-center">
                                    {
                                        user.creator.imageUrl !== null ? (<img src={user.creator.imageUrl} alt="profile_image" className="size-full " />)
                                            : (<User size={18} className='text-white dark:text-gray-400' />)
                                    }
                                </div>

                                <div className="text-sm">
                                    <p className="font-semibold">
                                        {user.creator.username}
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