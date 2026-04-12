"use client";

import {
    Bookmark,
    Heart,
    MoreHorizontal,
    Send,
    User,
} from "lucide-react";
import React, { useMemo, useState } from "react";

const PostCard = ({ post }) => {
    // 🔹 STATE
    const [isLiked, setIsLiked] = useState(false);
    const [likeCount, setLikeCount] = useState(post.likes?.length || 0);
    const [isSaved, setIsSaved] = useState(false);

    // 🔹 DERIVED DATA (optimisé)
    const isVideo = !!post.videoUrl;
    const mediaUrl = post.imageUrl || post.videoUrl;

    // ❤️ Like (corrigé pour éviter bug async)
    const handleLike = () => {
        setIsLiked((prev) => {
            setLikeCount((count) => (prev ? count - 1 : count + 1));
            return !prev;
        });
    };

    // 🔖 Save
    const handleSave = () => {
        setIsSaved((prev) => !prev);
    };

    // 🏷️ Caption optimisé (useMemo = perf)
    const parsedCaption = useMemo(() => {
        if (!post.caption) return null;

        return post.caption.split(/(\s+)/).map((segment, index) => {
            const isTag = segment.startsWith("#") && segment.length > 1;

            return isTag ? (
                <span
                    key={index}
                    className="text-sky-600 font-medium cursor-pointer hover:underline"
                >
                    {segment}
                </span>
            ) : (
                <span key={index}>{segment}</span>
            );
        });
    }, [post.caption]);

    return (
        <div className="max-w-[500px] mx-auto mb-6">

            {/* HEADER */}
            <div className="p-3 flex items-start justify-between">
                <div className="flex items-center space-x-3">

                    {/* Avatar */}
                    <div className="size-10 rounded-full overflow-hidden bg-gray-300 flex items-center justify-center">
                        {post.creator?.imageUrl ? (
                            <img
                                src={post.creator.imageUrl}
                                alt="avatar"
                                className="size-full object-cover"
                            />
                        ) : (
                            <User size={20} />
                        )}
                    </div>

                    {/* Infos */}
                    <div>
                        <p className="font-semibold text-sm">
                            {post.creator?.username}
                        </p>

                        <p className="text-xs text-gray-500">
                            {post.location}
                        </p>
                    </div>
                </div>

                <MoreHorizontal className="cursor-pointer rotate-90 text-gray-500" />
            </div>

            {/* MEDIA (image ou vidéo clean) */}
            <div className="w-full aspect-square bg-gray-100">
                {mediaUrl && !isVideo && (
                    <img
                        src={mediaUrl}
                        alt="post"
                        className="w-full h-full object-cover"
                    />
                )}

                {mediaUrl && isVideo && (
                    <video
                        controls
                        className="w-full h-full object-cover"
                    >
                        <source src={mediaUrl} type="video/mp4" />
                    </video>
                )}
            </div>

            {/* ACTIONS */}
            <div className="p-3 flex items-center justify-between">
                <div className="flex items-center space-x-4">

                    {/* Like */}
                    <Heart
                        onClick={handleLike}
                        className={`cursor-pointer transition ${isLiked
                                ? "text-pink-500 fill-pink-500"
                                : "text-gray-800 hover:text-gray-500"
                            }`}
                    />

                    {/* Send */}
                    <Send className="cursor-pointer text-gray-800 hover:text-gray-500" />
                </div>

                {/* Save */}
                <Bookmark
                    onClick={handleSave}
                    className={`cursor-pointer transition ${isSaved
                            ? "text-pink-500 fill-pink-500"
                            : "text-gray-800 hover:text-gray-500"
                        }`}
                />
            </div>

            {/* DETAILS */}
            <div className="px-3 pb-3 space-y-1 text-sm">
                <p className="font-semibold">
                    {new Intl.NumberFormat("fr-FR").format(likeCount)} likes
                </p>

                <p>
                    <span className="font-semibold mr-1">
                        {post.creator?.username}
                    </span>
                    {parsedCaption}
                </p>

                <p className="text-xs text-gray-400">
                    {new Date(post.$createdAt).toLocaleDateString("fr-FR")}
                </p>
            </div>
        </div>
    );
};

export default PostCard;