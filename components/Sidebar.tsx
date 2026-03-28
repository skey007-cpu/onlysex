"use client";

import Link from "next/link";
import Image from "next/image";
import { navItems } from "@/constants";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface Props {
  fullName: string;
  avatar: string;
  email: string;
  username: string
}

const Sidebar = ({ fullName, avatar, email, username }: Props) => {
  const pathname = usePathname();

  return (
    <aside className="sidebar">
      <Image src="/onlySex.png" alt="logo" width={150} height={30} />
      <nav className="sidebar-nav">
        <ul className="flex flex-1 flex-col gap-6">
          {navItems.map(({ url, name, icon }) => (
            <li key={name}>
              <Link
                href={url}
                className={cn(
                  "sidebar-nav-item transition-all hover:scale-105 lg:w-full",
                  pathname === url && "shad-active"
                )}
              >
                <Image
                  src={icon}
                  alt={name}
                  width={24}
                  height={24}
                  className={cn(
                    "nav-icon",
                    pathname === url && "nav-icon-active"
                  )}
                />
                <p className="hidden lg:block">{name}</p>
              </Link>
            </li>
          ))}
        </ul>

      </nav>

      {/* <Image
        src="/assets/images/files-2.png"
        alt="logo"
        width={506}
        height={418}
        className="w-full transition-all hover:rotate-1 hover:scale-105"
      /> */}

      <div className="sidebar-user-info">
        <Image
          src={avatar}
          alt="Avatar"
          width={44}
          height={44}
          className="sidebar-user-avatar"
        />
        <div className="hidden lg:block">
          <p className="subtitle-2 capitalize">{username}</p>
          <p className="caption">{email}</p>
        </div>
      </div>
    </aside>
  );
};
export default Sidebar;
