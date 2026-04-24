import Link from "next/link";
import { getUserWithPosts } from "@/lib/actions/file.actions";

type Props = {
    params: Promise<{ userId: string }>;
    searchParams: Promise<{ tab?: string }>;
};

const ProfilePage = async ({ params, searchParams }: Props) => {
    const { userId } = await params;
    const { tab = "posts" } = await searchParams;

    const { user, posts } = await getUserWithPosts(userId);

    if (!user) {
        return <p className="text-center mt-10">Utilisateur introuvable</p>;
    }

    const mediaPosts = posts.filter(
        (post) => post.imageUrl || post.videoUrl
    );

    return (
        <div className="max-w-7xl mx-auto px-4 lg:px-6 lg:grid lg:grid-cols-[1fr_320px] lg:gap-12">

            {/* 🔴 MAIN CONTENT */}
            <div className="w-full max-w-3xl mx-auto">

                {/* 🔝 COVER + AVATAR */}
                <div className="relative">
                    <img
                        src={user.coverUrl || "/default-cover.jpg"}
                        alt="cover"
                        className="w-full h-48 lg:h-60 object-cover rounded-xl"
                    />

                    <div className="absolute -bottom-10 left-6">
                        <div className="w-20 h-20 lg:w-28 lg:h-28 rounded-full border-4 border-black overflow-hidden">
                            <img
                                src={user.imageUrl}
                                alt="avatar"
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>
                </div>

                {/* USER INFO */}
                <div className="mt-10 ml-4 px-2 lg:px-0">
                    <h2 className="text-lg lg:text-xl font-bold">@{user.username}</h2>
                    <p className="text-gray-400 text-sm max-w-xl">
                        {user.bio || "Aucune bio"}
                    </p>
                </div>

                {/* 💰 SUBSCRIPTION */}
                <div className="mt-4 p-3 rounded-xl bg-gradient-to-r from-gray-900 to-gray-800 flex justify-between items-center">
                    <div>
                        <p className="text-sm text-gray-400">Subscription</p>
                        <p className="text-lg font-bold">$10 / month</p>
                    </div>

                    <button className="bg-greens-95 text-white px-3 py-1 rounded-lg">
                        Subscribe
                    </button>
                </div>

                {/* 🧭 TABS */}
                <div className="flex justify-around lg:justify-start lg:gap-10 mt-6 border-b border-gray-800">
                    <Link
                        href="?tab=posts"
                        className={`py-3 ${tab === "posts"
                            ? "border-b-2 border-white"
                            : "text-gray-500"
                            }`}
                    >
                        Posts
                    </Link>

                    <Link
                        href="?tab=media"
                        className={`py-3 ${tab === "media"
                            ? "border-b-2 border-white"
                            : "text-gray-500"
                            }`}
                    >
                        Media
                    </Link>

                </div>

                {/* 🔥 CONTENT */}
                <div className="mt-4">

                    {/* 🟥 POSTS */}
                    {tab === "posts" && (
                        <div className="space-y-6">
                            {posts.map((post) => {
                                const isLocked = true; // You can implement your logic to determine if the post is locked or not

                                return (
                                    <div key={post.$id} className="bg-gray-900 rounded-xl p-4">

                                        {/* USER */}
                                        <div className="flex items-center gap-3 mb-3">
                                            <img
                                                alt=""
                                                src={post.creator.imageUrl}
                                                className="w-10 h-10 rounded-full object-cover"
                                            />
                                            <div>
                                                <p className="font-bold">@{post.creator.username}</p>
                                                <p className="text-xs text-gray-400">
                                                    {post.creator.fullName}
                                                </p>
                                            </div>
                                        </div>

                                        {/* CAPTION */}
                                        <p className="mb-3">{post.caption}</p>

                                        {/* MEDIA */}
                                        {!isLocked && post.imageUrl && (
                                            <img
                                                alt=""
                                                src={post.imageUrl}
                                                className="w-full max-h-[500px] object-cover rounded-lg"
                                            />
                                        )}

                                        {!isLocked && post.videoUrl && (
                                            <video
                                                controls
                                                className="w-full max-h-[500px] lg:max-h-[400px] object-cover rounded-lg"
                                            >
                                                <source src={post.videoUrl} />
                                            </video>
                                        )}

                                        {/* LOCK */}
                                        {isLocked && (
                                            <div className="mt-3 text-center">
                                                <button className="bg-white text-black px-3 py-1 rounded-lg text-sm">
                                                    Unlock 🔒
                                                </button>
                                            </div>
                                        )}

                                        {/* STATS */}
                                        {!isLocked && (
                                            <div className="mt-3 text-sm text-gray-400">
                                                ❤️ {post.likes.length} likes
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    )}

                    {/* 🟦 MEDIA */}
                    {tab === "media" && (
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2">
                            {mediaPosts.map((post) => {
                                const isLocked = true;

                                return (
                                    <div
                                        key={post.$id}
                                        className="relative aspect-square rounded-xl overflow-hidden"
                                    >
                                        {post.imageUrl ? (
                                            <img
                                                alt=""
                                                src={post.imageUrl}
                                                className={`w-full h-full object-cover ${isLocked ? "blur-md" : ""
                                                    }`}
                                            />
                                        ) : (
                                            <video
                                                muted
                                                className={`w-full h-full object-cover ${isLocked ? "blur-md" : ""
                                                    }`}
                                            >
                                                <source src={post.videoUrl} />
                                            </video>
                                        )}

                                        {isLocked && (
                                            <div className="absolute inset-0 flex items-center justify-center bg-black/70">
                                                <button className="bg-white text-black px-3 py-1 rounded-lg text-sm">
                                                    Unlock 🔒
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    )}

                </div>
            </div>

            {/* 🟡 SIDEBAR DESKTOP */}
            <div className="hidden lg:block">
                <div className="sticky top-20 space-y-4">

                    <div className="bg-gray-900 p-4 rounded-xl">
                        <p className="font-bold">About</p>
                        <p className="text-sm text-gray-400">
                            {user.bio || "Aucune bio"}
                        </p>
                    </div>

                    <div className="bg-gray-900 p-4 rounded-xl">
                        <p className="font-bold">Stats</p>
                        <p className="text-sm text-gray-400">
                            {posts.length} posts
                        </p>
                    </div>

                </div>
            </div>

        </div>
    );
};

export default ProfilePage;