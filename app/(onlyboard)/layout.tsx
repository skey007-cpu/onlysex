import { getCurrentUser } from "@/lib/actions/user.actions";
import { redirect } from "next/navigation";
import ClientLayout from "@/components/ClientLayout";
import { WalletProvider } from "@/components/WalletContext";


export default async function Layout({ children }: { children: React.ReactNode }) {
    const currentUser = await getCurrentUser();

    if (!currentUser) redirect("/sign-in");

    return (
        <WalletProvider>
            <ClientLayout>{children}</ClientLayout>
        </WalletProvider>
    );
}