import { getMyPosts } from "@/lib/actions/file.actions";
import { getCurrentUser } from "@/lib/actions/user.actions";
import Link from "next/link";


interface StabBlockProps {
    value: string | number;
    label: string;
}

const StatBlock = ({ value, label }: StabBlockProps) => (
    <div className="flex-center gap-2">
        <p className="small-semibold lg:body-bold">{value}</p>
        <p className="small-medium lg:base-medium">{label}</p>
    </div>
);

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
                                {user.fullName}
                            </h2>
                            <p className="small-regular md:body-medium text-light-3 text-center xl:text-left">
                                @{user.username}
                            </p>

                            <div className="flex space-x-4 mt-2 text-sm">
                                <div className="flex gap-8 items-center justify-center xl:justify-start flex-wrap z-20">
                                    <StatBlock value={user.posts.length} label="Posts" />
                                    <StatBlock value={20} label="Followers" />
                                    <StatBlock value={20} label="Following" />
                                </div>
                            </div>

                            <p className="text-gray-500 text-sm mt-3">
                                {user.bio || "Aucune bio"}
                            </p>

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