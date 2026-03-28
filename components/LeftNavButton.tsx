/* eslint-disable no-unused-vars */
import { signOutUser } from "@/lib/actions/user.actions";
import React from "react";

const LeftNavButton = ({
    icon: Icon,
    label,
    active = false,
    isSidebarOpen,
    logout = false, // indique si c'est le bouton logout
}) => {
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
    };

    return (
        <button
            type="button"
            onClick={handleClick}
            className={`w-full flex items-center p-3 rounded-lg transition-colors duration-200 ease-in
        ${isSidebarOpen ? "space-x-4 justify-start" : "justify-center"}
        ${active
                    ? "font-bold text-gray-900 dark:text-white"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                }`}
        >
            <Icon size={24} className={active ? "text-pink-500" : ""} />
            {isSidebarOpen && <span className="truncate">{label}</span>}
        </button>
    );
};

export default LeftNavButton;