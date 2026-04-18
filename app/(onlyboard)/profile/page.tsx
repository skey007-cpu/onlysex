import { getMyPosts } from "@/lib/actions/file.actions";
import { getCurrentUser } from "@/lib/actions/user.actions";
import Link from "next/link";

const MyProfilePage = async () => {
    const user = await getCurrentUser();

    console.log("Current user:", user);

    if (!user) {
        return <p className="text-center mt-10">Non connecté</p>;
    }

    const posts = await getMyPosts(user.$id);

    return (
        <div className="p-4 mt-6 lg:px-0">
            <div className="lg:max-w-5xl lg:mx-auto">

                {/* 👤 HEADER */}
                <div className="flex justify-between lg:max-w-5xl lg:mx-auto">
                    <div className="flex space-x-6 mb-6">
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

                            {/* ✏️ EDIT */}

                        </div>

                    </div>
                    <div>
                        <button className="mt-3 px-4 py-1 border-2 rounded text-sm">
                            Edit profile
                        </button>
                    </div>
                </div>
                {/* 📸 GRID */}
                <div className="grid grid-cols-3 lg:grid-cols-4 gap-2 lg:max-w-5xl lg:mx-auto">
                    {posts.map((post) => (
                        // <Link key={post.$id} href={`/posts/${post.$id}`}>
                        <div key={post.$id} className="aspect-square bg-gray-200 overflow-hidden rounded-xl">
                            {post.imageUrl ? (
                                <img
                                    alt=""
                                    src={post.imageUrl}
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <video
                                    controls={true}
                                    controlsList="nodownload nofullscreen noremoteplayback"
                                    disablePictureInPicture
                                    autoPlay
                                    muted
                                    playsInline
                                    loop
                                    className="w-full h-full object-cover">
                                    <source src={post.videoUrl} type="video/mp4" />
                                </video>
                            )}
                        </div>
                        // </Link>
                    ))}
                </div>

            </div>
        </div >
    );
};

export default MyProfilePage;