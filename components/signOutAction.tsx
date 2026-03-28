"use server";

import { signOutUser } from "@/lib/actions/user.actions";

export async function signOutAction() {
    await signOutUser();
}