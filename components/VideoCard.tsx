"use client";
import { useEffect, useRef, useState } from "react";

type VideoProps = {
    src: string;
    likeCount?: number;
    caption?: string;
    posty?: string;
};


export default function VideoCard({ src, likeCount, caption, posty }: VideoProps) {
    const videoRef = useRef<HTMLVideoElement | null>(null);

    const [isPlaying, setIsPlaying] = useState(true);
    const [muted, setMuted] = useState(true);
    const [liked, setLiked] = useState(false);
    const [likes, setLikes] = useState(likeCount ?? 0);
    const [views] = useState(5400);
    const [following, setFollowing] = useState(false);

    const togglePlay = () => {
        const vid = videoRef.current;
        if (!vid) return;

        if (vid.paused) {
            vid.play();
            setIsPlaying(true);
        } else {
            vid.pause();
            setIsPlaying(false);
        }
    };

    const toggleMute = (e: React.MouseEvent<HTMLSpanElement>) => {
        e.stopPropagation();
        const vid = videoRef.current;
        if (!vid) return;

        vid.muted = !vid.muted;
        setMuted(vid.muted);
    };

    const toggleFullscreen = (e: React.MouseEvent<HTMLSpanElement>) => {
        e.stopPropagation();
        const vid = videoRef.current;
        if (!vid) return;

        if (vid.requestFullscreen) {
            vid.requestFullscreen();
        }
    };

    // const handleLike = (e: React.MouseEvent<HTMLDivElement>) => {
    //     e.stopPropagation();
    //     setLiked(!liked);
    //     setLikes((prev) => (liked ? prev - 1 : prev + 1));
    // };

    const handleLike = (e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();

        setLiked((prevLiked) => {
            const newLiked = !prevLiked;

            setLikes((prevLikes) =>
                prevLiked ? prevLikes - 1 : prevLikes + 1
            );

            localStorage.setItem(`liked-${src}`, JSON.stringify(newLiked));

            return newLiked;
        });
    };

    useEffect(() => {
        const saved = localStorage.getItem(`liked-${src}`);
        if (saved) {
            setLiked(JSON.parse(saved));
        }
    }, [src]);

    return (
        <div className="relative overflow-hidden bg-black text-sm " onClick={togglePlay}>
            <video
                ref={videoRef}
                src={src}
                className="w-full h-full object-cover"
                loop
                muted={muted}
                autoPlay
                playsInline
            />

            {/* TOP BAR */}
            {/* <div className="absolute top-2.5 left-2.5 right-2.5 flex justify-between items-center">
                <span>👁️ {views.toLocaleString("fr-FR")}</span>

                <div className="flex gap-3.5 text-lg cursor-pointer">
                    <span onClick={toggleFullscreen}>⛶</span>
                </div>
            </div> */}

            {/* RIGHT ACTIONS */}
            <div className="absolute right-2.5 bottom-24 flex flex-col items-center gap-6 text-sm">
                <div>
                    <div className="text-3xl">
                        👁️
                    </div>
                    <span className="text-gray-10"> {views.toLocaleString("fr-FR")}</span>
                </div>

                <div className="flex flex-col items-center">
                    <div onClick={handleLike} className="text-3xl cursor-pointer">{liked ? "❤️" : "🤍"}</div>
                    <span className="text-gray-10 justify-center">{likes}</span>
                </div>

                <div>
                    <span className="text-3xl cursor-pointer" onClick={toggleMute}>
                        {muted ? "🔇" : "🔊"}
                    </span>
                </div>

                <div>
                    <span className="text-3xl text-gray-10 cursor-pointer" onClick={toggleFullscreen}>
                        ⛶
                    </span>
                </div>

                {/* <div>
                    <div className="text-2xl">📤</div>
                    <span>54</span>
                </div> */}
            </div>

            {/* BOTTOM INFO */}
            <div className="absolute bottom-5 left-2.5 text-white">
                <div className="flex items-center gap-3.5 mb-2">
                    <span className="font-bold">@{posty}</span>

                    {/* <button
                        className={`px-3 py-1 rounded-full text-sm ${following ? "bg-gray-300 text-gray-800" : "bg-red-500 text-white"}`}
                        onClick={(e) => {
                            e.stopPropagation();
                            setFollowing(!following);
                        }}
                    >
                        {following ? "Following" : "Follow"}
                    </button> */}
                </div>

                <p>{caption}</p>
            </div>

            {/* PLAY ICON */}
            {!isPlaying && <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-6xl">▶</div>}
        </div>
    );
}
