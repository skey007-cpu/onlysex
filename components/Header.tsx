import React from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Search from "@/components/Search";
import FileUploader from "@/components/FileUploader";
import { signOutUser } from "@/lib/actions/user.actions";
import Sidebar from "./Sidebar";
import { getCurrentUser } from "@/lib/actions/user.actions";
import { redirect } from "next/navigation";

const Header = async ({
  userId,
  accountId,
}: {
  userId: string;
  accountId: string;
}) => {
  const currentUser = await getCurrentUser();
  if (!currentUser) return redirect("/sign-in");
  return (
    <header className="header">
      <Image
        src="/onlysexx.png"
        alt="logo"
        width={160}
        height={50}
        className="hidden h-auto lg:block"
      />
      <Search />
      <div className="header-wrapper">
        <Sidebar {...currentUser} />
        {/* <FileUploader ownerId={userId} accountId={accountId} /> */}
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
    </header>
  );
};
export default Header;
