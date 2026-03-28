import { User } from "lucide-react";

const StoryBubble = ({ isNew, src, user }) => {
    return (
        <div className="flex flex-col items-center flex-shrink-0 w-[80px] cursor-pointer">

            <div className={`p-0.5 rounded-full ${isNew ? "bg-gradient-to-r from-pink via-red-500 to-yellow-500" : "bg-gray-300 dark:bg-gray-600"}`}>

                <div className="bg-white dark:bg-gray-900 rounded-full p-0.5">

                    <div className="w-18 h-18 rounded-full overflow-hidden bg-gray-300 dark:bg-gray-700 flex items-center justify-center">

                        {src ? (
                            <img src={src} className="size-full object-cover" />
                        ) : (
                            <User size={30} className="text-white dark:text-gray-400" />
                        )}

                    </div>

                </div>

            </div>

            <p className="text-xs mt-1 text-center truncate w-full text-gray-700 dark:text-gray-300">
                {user}
            </p>

        </div>
    );
};

export default StoryBubble;