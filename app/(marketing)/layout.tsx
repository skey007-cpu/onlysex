import React from "react";
// import Link from "next/link";
// import Image from "next/image";
import '../globals.css'
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function Layout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div>
            <Navbar />
            <main className="relative overflow-hidden">
                {children}
            </main>
            <Footer />
        </div>
    );
};
