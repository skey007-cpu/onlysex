import { styles } from "@/constants";
import MobileHeader from '@/components/MobileHeader';
import LeftSidebar from '@/components/LeftSidebar';
import { getCurrentUser } from "@/lib/actions/user.actions";
import { redirect } from "next/navigation";


export default async function Layout({
    children,
}: {
    children: React.ReactNode;
}) {

    const currentUser = await getCurrentUser();

    if (!currentUser) return redirect("/sign-in");

    return (
        <div className={`${"bg-white"} min-h-screen antialiased text-zinc-800 dark:text-gray-10 `}>
            <style>{styles}</style>

            <MobileHeader />
            <div className="flex">
                <LeftSidebar />
                <main className="flex-1 w-full lg:max-w-none">
                    {children}
                </main>
            </div>

        </div>
    );
};
