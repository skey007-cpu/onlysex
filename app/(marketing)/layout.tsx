import React from "react";
import Link from "next/link";
// import Image from "next/image";

export default function Layout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div>
            <header>
                <nav>
                    <div className="flex space-x-6">
                        <Link href="/sign-in">Sign in</Link>
                        <Link href="/sign-up">Sign up</Link>
                    </div>
                </nav>
            </header>

            <div className="flex min-h-screen">
                {children}
            </div>

            <footer>
                <p>© 2026 Mon SaaS</p>
            </footer>
        </div>
    );
};
