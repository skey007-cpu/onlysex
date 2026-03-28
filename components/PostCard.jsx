"use client"

import { Bookmark, Heart, MessageCircle, MoreHorizontal, Send, User } from 'lucide-react'
import React, { useState } from 'react'

const PostCard = ({ post, src }) => {

    const [isLiked, setIsLiked] = useState(post.isLiked)
    const [likeCount, setlikeCount] = useState(post.likes)

    // like handler
    const handleLike = () => {
        setIsLiked(!isLiked)
        setlikeCount(isLiked ? likeCount - 1 : likeCount + 1)
    }

    // Caption parser

    const renderCaptionWidthTags = (caption) => {
        const segments = caption.split(/(\s+)/)

        return segments.map((segment, index) => {

            const isTag = segment.startsWith("#") && segment.length > 1
            if (isTag) {
                return <span key={index} className="text-sky-600 font-medium cursor-pointer hover:underline">
                    {segment}
                </span>
            } else {
                return <span key={index}>  {segment} </span>
            }
        })
    }

    return (
        <div className="max-w-[500px] mx-auto mb-6">
            {/* post Header */}
            <div className="p-3 flex items-start justify-between">
                <div className="flex items-center space-x-3">

                    {/* Avatar */}
                    <div className="size-10 rounded-full overflow-hidden bg-gray-300 flex items-center justify-center flex-shrink-0">
                        {
                            src ? (<img src={src} className="size-full object-cover" />) :
                                (<User size={20} className='text-white dark:text-gray-400' />)
                        }
                    </div>

                    {/* Name & Location */}
                    <div className="">
                        <p className="font-semibold flex items-center gap-1 text-sm hover:text-gray-600 cursor-pointer">
                            {post.username}
                            {post.isVerified && <img src="/images/verify_tick.png" className="w-5" />}
                        </p>

                        <p className="text-xs text-gray-500 dark:text-gray-400">
                            {post.location}
                        </p>
                    </div>
                </div>

                <MoreHorizontal size={24} className='cursor-pointer rotate-90 text-gray-500 hover:text-gray-900 dark:hover:text-white' />

            </div>


            {/* post Image */}
            <div className="w-full bg-gray-100 dark:bg-gray-700 aspect-square">
                <img src={post.imageUrl} alt={`Post by ${post.username}`} className="w-full object-cover" />
            </div>
            {/* Post Actions */}
            <div className="p-3 flex items-center justify-between">
                {/* 1 */}
                <div className="flex items-center space-x-4">
                    <Heart onClick={handleLike} size={24} className={`cursor-pointer transition-colors ${isLiked ? "text-pink fill-pink" : "text-gray-800 dark:text-gray-200 hover:text-gray-500"}`} />
                    <MessageCircle size={24} className="cursor-pointer text-gray-800 dark:text-gray-200 hover:text-gray-500" />
                    <Send size={24} className='cursor-pointer text-gray-800 dark:text-gray-200 hover:text-gray-500 ' />
                </div>
                {/* 2 */}
                <Bookmark size={24} className='cursor-pointer text-gray-800 dark:text-gray-200 hover:text-gray-500 ' />
            </div>

            {/* Post Details */}
            <div className="px-3 pb-3 space-y-1 text-sm">
                <p className="font-semibold">
                    {new Intl.NumberFormat("fr-FR").format(likeCount)} likes
                </p>
                <p>
                    <span className="font-semibold mr-1">
                        {post.username}
                    </span>
                    {renderCaptionWidthTags(post.caption)}
                </p>
                <div className="text-gray-500 dark:text-gray-400 cursoir-pointer">
                    View all {post.comments} comments
                </div>


                <p className="text-xs text-gray-400">
                    {post.time}
                </p>


            </div>
        </div>
    )
}

export default PostCard