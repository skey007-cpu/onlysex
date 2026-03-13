"use client";

import { useState } from "react";
import { NAV_LINKS } from "@/constants"
import Image from "next/image"
import Link from "next/link"
import Button from "./Button"
import { useRouter } from "next/navigation";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const router = useRouter();


  return (
    <nav className="flexBetween max-container padding-container relative z-30 py-5">
      <Link href="/">
        <Image src="/onlySex.png" alt="logo" width={150} height={30} />
        {/* <Image src="/onlySex.png" alt="logo" width={80} height={30} /> */}
      </Link>

      <ul className="hidden h-full gap-12 lg:flex">
        {NAV_LINKS.map((link) => (
          <Link href={link.href} key={link.key} className="regular-16 text-gray-50 flexCenter cursor-pointer pb-1.5 transition-all hover:font-bold">
            {link.label}
          </Link>
        ))}
      </ul>

      <div className="lg:flexCenter hidden">
        {/* <Link href="/sign-in"> */}
        <Button
          type="button"
          title="Let's Go !!"
          // icon="/user.svg"
          variant="btn_dark_greens"
          onClick={() => router.push("/sign-in")}
        />
        {/* </Link> */}
      </div>


      <Image
        src={open ? "/list.png" : "menu.svg"}
        // src="menu.svg"
        alt="menu"
        width={32}
        height={32}
        className="inline-block cursor-pointer lg:hidden"
        onClick={() => setOpen(!open)}
      />

      {open && (


        <ul className="absolute top-16 left-0 w-full bg-white flex flex-col items-center gap-6 p-6 shadow-lg lg:hidden">
          {NAV_LINKS.map((link) => (
            <Link href={link.href} key={link.key} className="regular-16 text-gray-50 flexCenter cursor-pointer pb-1.5 transition-all hover:font-bold">
              {link.label}
            </Link>
          ))}
        </ul>
      )}
    </nav>
  )
}

export default Navbar