"use client";

import React from "react";
import { useWallet } from "@/components/WalletContext";




// 💰 PRIX DYNAMIQUE
const getPostPrice = (postId: string) => {
    return 1000 + (parseInt(postId.slice(-2), 16) % 5) * 500;
};

const PostCards = ({ post }) => {
    const { buyContent, purchasedPosts } = useWallet();

    const price = getPostPrice(post.$id);
    const isUnlocked = purchasedPosts.includes(post.$id);

    const handleUnlock = () => {
        if (isUnlocked) return;

        buyContent(post.$id, price, "Achat contenu premium");
    };

    return (
        <div className="bg-gray-900 rounded-xl p-4 shadow-sm hover:shadow-md transition">

            {/* 👤 USER */}
            <div className="flex items-center gap-3 mb-3">
                <img
                    src={post.creator.imageUrl}
                    alt=""
                    className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                    <p className="font-bold text-white">
                        @{post.creator.username}
                    </p>
                    <p className="text-xs text-gray-400">
                        {post.creator.fullName}
                    </p>
                </div>
            </div>

            {/* 📝 CAPTION */}
            <p className="mb-3 text-gray-200">
                {post.caption}
            </p>

            {/* 🎬 CONTENT */}
            <div className="relative">

                {/* IMAGE */}
                {post.imageUrl && (
                    <img
                        src={post.imageUrl}
                        alt=""
                        className={`w-full max-h-[500px] object-cover rounded-lg transition duration-500 ${isUnlocked ? "blur-0" : "blur-md scale-105"
                            }`}
                    />
                )}

                {/* VIDEO */}
                {post.videoUrl && (
                    <video
                        controls={isUnlocked}
                        muted={!isUnlocked}
                        className={`w-full max-h-[500px] object-cover rounded-lg transition duration-500 ${isUnlocked ? "blur-0" : "blur-md scale-105"
                            }`}
                    >
                        <source src={post.videoUrl} />
                    </video>
                )}

                {/* 🔒 LOCK OVERLAY */}
                {!isUnlocked && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/70 rounded-lg backdrop-blur-sm">

                        <p className="text-sm text-gray-300 mb-2">
                            🔒 Contenu premium
                        </p>

                        <button
                            onClick={handleUnlock}
                            className="bg-white text-black px-4 py-2 rounded-lg font-semibold hover:bg-gray-200 active:scale-95 transition"
                        >
                            Débloquer pour {price} Pecos
                        </button>

                    </div>
                )}

            </div>

            {/* ❤️ STATS */}
            {isUnlocked && (
                <div className="mt-3 text-sm text-gray-400">
                    ❤️ {post.likes.length} likes
                </div>
            )}

        </div>
    );
};

export default PostCards;