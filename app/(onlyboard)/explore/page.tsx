import { getAllPosts } from "@/lib/actions/file.actions";
import Link from "next/link";

const ExplorePage = async () => {
    const posts = await getAllPosts();
    console.log("Posts:", posts);

    return (
        <div className="p-4 lg:px-0">
            {/* 🔒 CONTAINER uniquement en desktop */}
            <div className="lg:max-w-5xl lg:mx-auto">

                {/* 🔍 SEARCH */}
                <input
                    type="text"
                    placeholder="Rechercher..."
                    className="w-full p-2 border rounded mb-4"
                />

                {/* 📸 GRID */}
                <div className="grid grid-cols-3 lg:grid-cols-4 gap-2">
                    {posts.map((post) => (
                        <Link key={post.$id} href={`/posts/${post.$id}`}>
                            <div className="aspect-square bg-gray-200 rounded-lg overflow-hidden">
                                {post.imageUrl ? (
                                    <img
                                        alt="img"
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
                                        <source src={post.videoUrl} />
                                    </video>
                                )}
                            </div>
                        </Link>
                    ))}
                </div>

            </div>
        </div>
    );
};

export default ExplorePage;