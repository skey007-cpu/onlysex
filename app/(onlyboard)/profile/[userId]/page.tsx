import React from 'react'

// interface Props {
//     params: {
//         userId: string;
//     };
// }

// const profile = ({ params }: Props) => {
//     return (
//         <div>
//             <p>User ID: {params.userId}</p>
//         </div>
//     )
// }

// export default profile



import { getUserWithPosts } from "@/lib/actions/file.actions";
import Link from "next/link";

type Props = {
    params: { userId: string; };
};

const ProfilePage = async ({ params }: Props) => {
    const { userId } = await params;

    const { user, posts } = await getUserWithPosts(userId);

    if (!user) {
        return <p className="text-center mt-10">Utilisateur introuvable</p>;
    }

    return (
        <div className="p-4 lg:px-0 mt-6">
            <div className="lg:max-w-5xl lg:mx-auto">

                {/* 👤 HEADER */}
                <div className="flex items-center space-x-6 mb-6">
                    <div className="w-20 h-20 rounded-full overflow-hidden bg-gray-300">
                        <img
                            src={user.imageUrl}
                            alt="avatar"
                            className="w-full h-full object-cover"
                        />
                    </div>

                    <div>
                        <h2 className="text-xl font-bold">
                            {user.username}
                        </h2>

                        <p className="text-gray-500 text-sm">
                            {user.bio || "Aucune bio"}
                        </p>

                        <div className="flex space-x-4 mt-2 text-sm">
                            <span>
                                <strong>{posts.length}</strong> posts
                            </span>
                            {/* <span>
                                <strong>0</strong> followers
                            </span>
                            <span>
                                <strong>0</strong> following
                            </span> */}
                        </div>
                    </div>
                </div>

                {/* 📸 GRID POSTS */}
                <div className="grid grid-cols-3 lg:grid-cols-4 gap-2">
                    {posts.map((post) => (
                        // <Link  href={`/posts/${post.$id}`}>
                        <div key={post.$id} className="aspect-square bg-gray-200 overflow-hidden rounded-xl">
                            {post.imageUrl ? (
                                <img
                                    alt="Post image"
                                    src={post.imageUrl}
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <video
                                    controls={true}
                                    controlsList="nodownload nofullscreen noremoteplayback noremoteplaybackspeed"
                                    disablePictureInPicture
                                    autoPlay
                                    muted
                                    playsInline
                                    loop
                                    className="w-full h-full object-cover"
                                >
                                    <source src={post.videoUrl} type="video/mp4" />
                                </video>
                            )}
                        </div>
                        // </Link>
                    ))}
                </div>

            </div>
        </div>
    );
};

export default ProfilePage;