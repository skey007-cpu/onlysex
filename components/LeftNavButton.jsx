/* eslint-disable no-unused-vars */
import { signOutUser } from "@/lib/actions/user.actions";
import { useRouter } from "next/navigation";
import React from "react";
import { usePathname } from "next/navigation";


const LeftNavButton = ({
    icon: Icon,
    label,
    path,
    active = false,
    isSidebarOpen,
    logout = false, // indique si c'est le bouton logout
}) => {
    const router = useRouter();
    const pathname = usePathname();
    const isActive = pathname === path;

    const handleClick = async () => {
        if (logout) {
            try {
                await signOutUser();
                console.log("Utilisateur déconnecté !");
                // ici tu peux rediriger vers la page login si nécessaire
                // ex: router.push("/auth/login")
            } catch (err) {
                console.error("Erreur logout :", err);
            }
        }

        if (path) {
            router.push(path); // 👈 navigation ici
        }
    };

    return (
        <button
            type="button"
            onClick={handleClick}
            className={`mt-[10rem] w-full flex items-center p-3 rounded-lg transition-colors duration-200 ease-in
        ${isSidebarOpen ? "space-x-4 justify-start" : "justify-center"}
        ${isActive
                    ? "font-bold text-greens-95 dark:text-greens-95"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                }`}
        >
            <Icon size={24} className={active ? "text-pink" : ""} />
            {isSidebarOpen && <span className="truncate">{label}</span>}
        </button>
    );
};

export default LeftNavButton;