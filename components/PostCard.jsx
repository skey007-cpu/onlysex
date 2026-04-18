"use client";

import { checkIfSaved, toggleLike, toggleSave } from "@/lib/actions/user.actions";
import { multiFormatDateString } from "@/lib/utils";
import {
    Bookmark,
    Heart,
    MoreHorizontal,
    Send,
    User,
} from "lucide-react";
import Link from "next/link";
import React, { useEffect, useMemo, useRef, useState } from "react";

const PostCard = ({ post, userId }) => {
    const [isSaved, setIsSaved] = useState(false);
    const [savedDocId, setSavedDocId] = useState(null);

    useEffect(() => {
        // const fetchSave = async () => {
        //     const res = await checkIfSaved(post.$id, userId);

        //     setIsSaved(res.isSaved);
        //     setSavedDocId(res.savedDocId);
        // };

        // fetchSave();

        const liked = post.likes?.includes(userId) || false;

        setIsLiked(liked);
        setLikeCount(post.likes?.length || 0);
    }, [post.likes, userId, post.$id,]);

    const videoRef = useRef(null);

    useEffect(() => {
        const video = videoRef.current;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    video?.play();
                } else {
                    video?.pause();
                }
            });
        });

        if (video) observer.observe(video);

        return () => observer.disconnect();
    }, []);

    // 🔹 STATE
    const [isLiked, setIsLiked] = useState(
        post.likes?.includes(userId) || false
    );

    const [likeCount, setLikeCount] = useState(
        post.likes?.length || 0
    );

    const [loading, setLoading] = useState(false);

    // const [isSaved, setIsSaved] = useState(false);

    // 🔹 DERIVED DATA
    const isVideo = !!post.videoUrl;
    const mediaUrl = post.imageUrl || post.videoUrl;



    // ❤️ LIKE (optimistic UI propre)
    const handleLike = async () => {
        if (loading) return;

        setLoading(true);

        const alreadyLiked = isLiked;

        setIsLiked(!alreadyLiked);
        setLikeCount((count) => count + (alreadyLiked ? -1 : 1));

        try {
            await toggleLike({ post, userId });
        } catch {
            setIsLiked(alreadyLiked);
            setLikeCount((count) => count + (alreadyLiked ? 1 : -1));
        }

        setLoading(false);
    };

    // 🔖 SAVE (temporaire UI only)
    // const handleSave = async () => {
    //     const prevSaved = isSaved;

    //     // ⚡ UI instant
    //     setIsSaved(!prevSaved);

    //     try {
    //         const res = await toggleSave({
    //             isSaved: prevSaved,
    //             savedDocId,
    //             userId,
    //             postId: post.$id,

    //         });

    //         if (res.status === "deleted") {
    //             setSavedDocId(null);
    //         } else {
    //             setSavedDocId(res.data.$id);
    //         }
    //     } catch (err) {
    //         // 🔁 rollback si erreur
    //         setIsSaved(prevSaved);
    //     }
    // };

    // 🏷️ Caption optimisé
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
        <div className="py-3 max-w-[500px] mx-auto mb-6 rounded-xl border-b border-l border-r z-2">

            {/* HEADER */}
            <div className="p-3 flex items-start justify-between">
                <div className="flex items-center space-x-3">

                    {/* Avatar */}
                    <div className="size-10 rounded-full overflow-hidden bg-gray-300 flex items-center justify-center">
                        <Link href={`/profile/${post.creator?.$id}`}>
                            {post.creator?.imageUrl ? (
                                <img
                                    src={post.creator.imageUrl}
                                    alt="avatar"
                                    className="size-full object-cover"
                                />
                            ) : (
                                <User size={20} />
                            )}
                        </Link>
                    </div>

                    {/* Infos */}
                    <div>
                        <p className="font-semibold text-sm">
                            {post.creator?.username}
                        </p>
                        <p className="text-xs text-gray-500">
                            #{post.location}
                        </p>
                    </div>
                </div>

                {/* <Send className="cursor-pointer text-gray-800 hover:text-gray-500" /> */}
                <button className="border p-1 rounded-lg font-semibold text-sm">Imbox Moi</button>
                {/* <MoreHorizontal className="cursor-pointer rotate-90 text-gray-500" /> */}
            </div>
            {/* DETAILS */}
            <div className="px-3 pb-2 space-y-1 text-sm">


                <p>
                    {/* <span className="font-semibold mr-1">
                        {post.creator?.username}
                    </span> */}
                    {parsedCaption}
                </p>

                <p className="text-xs text-gray-400">
                    {multiFormatDateString(post.$createdAt)}
                </p>
            </div>

            {/* MEDIA */}
            <div className="w-full aspect-square bg-gray-100">
                {mediaUrl && !isVideo && (
                    <img
                        src={mediaUrl}
                        alt="post"
                        className="w-full object-cover"
                    />
                )}

                {mediaUrl && isVideo && (
                    <video
                        controls={true}
                        controlsList="nodownload nofullscreen noremoteplayback noremoteplaybackspeed"
                        disablePictureInPicture
                        ref={videoRef}
                        autoPlay
                        muted
                        playsInline
                        loop
                        className="w-full object-cover no-progress bg-black"
                        onClick={(e) => {
                            const video = e.currentTarget;
                            video.paused ? video.play() : video.pause();
                        }}
                    // className="w-full h-full object-cover"
                    >
                        <source src={mediaUrl} type="video/mp4" />
                    </video>
                )}
            </div>

            {/* ACTIONS */}
            <div className="p-3 flex items-center justify-between">
                <div className="flex items-center space-x-1">

                    {/* ❤️ LIKE */}
                    <Heart
                        onClick={handleLike}
                        fill={isLiked ? "currentColor" : "none"}
                        className={`cursor-pointer transition ${isLiked
                            ? "text-greens-95"
                            : "text-gray-800 hover:text-gray-500"
                            }`}
                    />
                    <p className="font-semibold">
                        {new Intl.NumberFormat("fr-FR").format(likeCount)} likes
                    </p>

                    {/* 📤 SEND */}

                </div>

                {/* 🔖 SAVE */}
                {/* <Bookmark
                    onClick={handleSave}
                    fill={isSaved ? "currentColor" : "none"}
                    className={`cursor-pointer transition ${isSaved
                        ? "text-greens-95"
                        : "text-gray-800 hover:text-gray-500"
                        }`}
                /> */}
            </div>

        </div>
    );
};

export default PostCard;