
import { Loader2 } from 'lucide-react'
import React from 'react'
import StoryBubble from '@/components/StoryBubble';
import PostCard from '@/components/PostCard';
import RightSidebar from '@/components/RightSidebar';
import { stories, posts } from "@/constants";
import { getRecentPost } from '@/lib/actions/user.actions';

const page = async () => {
    const posted = await getRecentPost();

    console.log('{posted} : ', posted)

    return (
        <div className="lg:grid lg:grid-cols-[1fr_320px] lg:gap-16 lg:max-w-7xl mx-auto p-4 lg:p-10 ">

            {/* Center Col */}
            <div className="lg:col-span-1 min-w-0">

                {/* Stories */}
                <div className="p-4 mb-6 overflow-x-scroll whitespace-nowrap scrollbar-hide lg:mt-0 mt-4">
                    <div className="flex space-x-4">
                        {stories.map((story) => (
                            <StoryBubble key={story.id} src={story.avatar} {...story} />
                        ))}
                    </div>
                </div>
                {/* Post Feed */}
                <div className="space-y-6">
                    {/* posts */}
                    {posted && posted.map((post) => (
                        <PostCard key={post.$id} src={post.creator.avatar} post={post} />
                    ))}

                </div>
                {/* End of Feed */}

                <div className="text-center pt-8 pb-15 text-gray-500 dark:text-gray-400 centered-row justify-center gap-2">
                    <Loader2 className="animate-spin" />
                    <p>Loading More Feed</p>
                </div>

            </div>


            {/* Right Sidebar */}
            <div className="hidden lg:block lg:col-span-1">
                < RightSidebar posted={posted} />
            </div>
        </div>
    )
}

export default page