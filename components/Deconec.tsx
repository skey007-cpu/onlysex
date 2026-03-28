import React from 'react'
import { Button } from './ui/button';
import Image from 'next/image';
import { signOutUser } from "@/lib/actions/user.actions";

const Deconec = () => {
    return (
        <div>
            <form
                action={async () => {
                    "use server";

                    await signOutUser();
                }}
            >
                <Button type="submit" className="sign-out-button">
                    <Image
                        src="/assets/icons/logout-3-svgrepo-com.svg"
                        alt="logo"
                        width={80}
                        height={80}
                        className="w-6"
                    />
                </Button>
            </form>
        </div>
    )
}

export default Deconec