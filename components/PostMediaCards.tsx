"use client";

import React from "react";
import { useWallet } from "@/components/WalletContext";




// 💰 PRIX DYNAMIQUE
const getPostPrice = (postId: string) => {
    return 1000 + (parseInt(postId.slice(-2), 16) % 5) * 500;
};



const PostMediaCards = ({ post }) => {

    console.log("POSTeS", post);
    const { buyContent, purchasedPosts } = useWallet();

    const price = getPostPrice(post.$id);

    const isUnlocked = purchasedPosts.includes(post.$id);

    const handleUnlock = () => {
        if (isUnlocked) return;

        buyContent(post.$id, price, "Achat contenu premium");
    };

    return (
        <div className="rounded-xl p-2 shadow-sm hover:shadow-md transition">

            {/* 🎬 CONTENT */}
            <div className="relative">

                {/* IMAGE */}
                {post.imageUrl && (
                    <img
                        src={post.imageUrl}
                        alt=""
                        className={`w-full object-cover rounded-lg transition duration-500 ${isUnlocked ? "blur-0" : "blur-md scale-105"
                            }`}
                    />
                )}

                {/* VIDEO */}
                {post.videoUrl && (
                    <video
                        controls={isUnlocked}
                        muted={!isUnlocked}
                        className={`w-full object-cover rounded-lg transition duration-500 ${isUnlocked ? "blur-0" : "blur-md scale-105"
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
                            className="bg-white text-black px-2 py-2 rounded-lg font-semibold hover:bg-gray-200 active:scale-95 transition"
                        >
                            Débloque pour {price} pecos
                        </button>

                    </div>
                )}

            </div>

            {/* ❤️ STATS */}
            {/* {isUnlocked && (
                <div className="mt-3 text-sm text-gray-400">
                    ❤️ {post.likes.length} likes
                </div>
            )} */}

        </div>
    );
};

export default PostMediaCards;