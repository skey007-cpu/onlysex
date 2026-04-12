import PostForm from '@/components/PostForm'
import { getCurrentUser } from '@/lib/actions/user.actions';
import React from 'react'

const CreatePost = async () => {
    const currentUser = await getCurrentUser();

    return (
        <div className="flex flex-1 mb-20">
            <div className="common-container">
                <div className="max-w-5xl flex-start gap-3 justify-start w-full">
                    {/* <img
                        src="/assets/icons/add-post.svg"
                        width={36}
                        height={36}
                        alt="add"
                    /> */}
                    <h2 className="h3-bold md:h2-bold text-left w-full">Create Post</h2>
                </div>

                <PostForm userId={currentUser.$id} accountId={currentUser.accountId} action={'Create'} />
            </div>
        </div>
    )
}

export default CreatePost