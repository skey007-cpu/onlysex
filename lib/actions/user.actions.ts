"use server";

import { createAdminClient, createSessionClient } from "@/lib/appwrite";
import { appwriteConfig } from "@/lib/appwrite/config";
import { Query, ID, Storage, ImageGravity, Account, Client } from "node-appwrite";
import { parseStringify } from "@/lib/utils";
import { cookies } from "next/headers";
import { avatarPlaceholderUrl } from "@/constants";
import { redirect } from "next/navigation";
import { uploadFile } from "./file.actions";


const getUserByEmail = async (email: string) => {
  const { databases } = await createAdminClient();

  //  console.log('db est de  : ', databases)

  const result = await databases.listDocuments(
    appwriteConfig.databaseId,
    appwriteConfig.usersCollectionId,
    [Query.equal("email", [email])],
  );

  return result.total > 0 ? result.documents[0] : null;
};

const handleError = (error: unknown, message: string) => {
  console.log(error, message);
  throw error;
};

export const sendEmailOTP = async ({ email }: { email: string }) => {
  const { account } = await createAdminClient();

  try {
    const session = await account.createEmailToken(ID.unique(), email);

    return session.userId;
  } catch (error) {
    handleError(error, "Failed to send email OTP");
  }
};



// export const createAccount = async ({
//   fullName,
//   email,
//   username,
// }: {
//   fullName: string;
//   email: string;
//   username: string;
// }) => {
//   try {
//     console.log("STEP 1: start");

//     const existingUser = await getUserByEmail(email);
//     console.log("STEP 2: existingUser", existingUser);

//     const accountId = await sendEmailOTP({ email });
//     console.log("STEP 3: accountId", accountId);

//     if (!accountId) throw new Error("Failed to send an OTP");

//     if (!existingUser) {
//       console.log("STEP 4: creating user");

//       const { databases } = await createAdminClient();

//       await databases.createDocument(
//         appwriteConfig.databaseId,
//         appwriteConfig.usersCollectionId,
//         ID.unique(),
//         {
//           fullName,
//           email,
//           imageUrl: avatarPlaceholderUrl,
//           username,
//           accountId,
//         }
//       );
//     }

//     console.log("STEP 5: success");

//     return { accountId };
//   } catch (error) {
//     console.error("CREATE ACCOUNT ERROR:", error);
//     throw error;
//   }
// };

export const createAccount = async ({
  fullName,
  email,
  username,
}: {
  fullName: string;
  username: string;
  email: string;
}) => {
  const existingUser = await getUserByEmail(email);

  const accountId = await sendEmailOTP({ email });
  if (!accountId) throw new Error("Failed to send an OTP");

  if (!existingUser) {
    const { databases, avatars } = await createAdminClient();

    const avatarUrl =  `https://ui-avatars.com/api/?name=${fullName}`;

    await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.usersCollectionId,
      ID.unique(),
      {
        fullName,
        email,
        imageUrl: avatarUrl,
        username,
        accountId,
      },
    );
  }

  return parseStringify({ accountId });
};

export const verifySecret = async ({
  accountId,
  password,
}: {
  accountId: string;
  password: string;
}) => {
  try {
    const { account } = await createAdminClient();

    const session = await account.createSession(accountId, password);

    (await cookies()).set("appwrite-session", session.secret, {
      path: "/",
      httpOnly: true,
      sameSite: "strict",
      secure: true,
    });

    return parseStringify({ sessionId: session.$id });
  } catch (error) {
    handleError(error, "Failed to verify OTP");
  }
};




export const getCurrentUser = async () => {
  try {
    const { databases, account } = await createSessionClient();

    const result = await account.get();

    // console.log('resssss: ', result)

    const user = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.usersCollectionId,
      [Query.equal("accountId", result.$id)],
    );

    if (user.total <= 0) return null;

    return parseStringify(user.documents[0]);
  } catch (error) {
    console.log(error);
  }
};

export const getCurrentUsers = async () => {

  try {
     const { account } = await createSessionClient();
    const user = await account.get();
    console.log("USER 👉", user);
    return user;
  } catch (error) {
    console.log("Pas connecté", error);
    return null;
  }
};

export const signOutUser = async () => {
  const { account } = await createSessionClient();

  try {
    await account.deleteSession("current");
    (await cookies()).delete("appwrite-session");
  } catch (error) {
    handleError(error, "Failed to sign out user");
  } finally {
    redirect("/");
  }
};

export const signInUser = async ({ email }: { email: string }) => {
  try {
    const existingUser = await getUserByEmail(email);

    // User exists, send OTP
    if (existingUser) {
      await sendEmailOTP({ email });
      return parseStringify({ accountId: existingUser.accountId });
    }

    return parseStringify({ accountId: null, error: "User not found" });
  } catch (error) {
    handleError(error, "Failed to sign in user");
  }
};


export type NewUser = {
 fullName: string;
  username: string;
  email: string;
};


export type INewPostT = {
  userId: string;
  caption: string;
  location?: string;
  tags?: string;
};


// ============================== CREATE POST
export async function createPost(post: INewPostT) {
  try {
    // Upload file to appwrite storage
    // const uploadedFile = await uploadFile(post.file[0]);

    // if (!uploadedFile) throw Error;

    // Get file url
    // const fileUrl = getFilePreview(uploadedFile.$id);

    // if (!fileUrl) {
    //   await deleteFile(uploadedFile.$id);
    //   throw Error;
    // }

    // Convert tags into array
    const tags = post.tags?.replace(/ /g, "").split(",") || [];

    // Create post
    const { databases } = await createAdminClient();

    const newPost = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.postsCollectionId,
      ID.unique(),
      {
        creator: post.userId,
        caption: post.caption,
        location: post.location,
        tags: tags,
      }
    );

    // if (!newPost) {
    //   await deleteFile(uploadedFile.$id);
    //   throw Error;
    // }

    return newPost;
  } catch (error) {
    console.log(error);
  }
}


// ============================== UPLOAD FILE
// export async function uploadFile(file: File) {
//   try {
//     const { storage } = await createAdminClient();

//     const uploadedFile = await storage.createFile(
//       appwriteConfig.bucketId,
//       ID.unique(),
//       file
//     );

//     return uploadedFile;
//   } catch (error) {
//     console.log(error);
//   }
// }

// export async function uploadFile(file: File) {
//   try {
//     const uploadedFile = await storage.createFile(
//       appwriteConfig.storageId,
//       ID.unique(),
//       file
//     );

//     return uploadedFile;
//   } catch (error) {
//     console.log(error);
//   }
// }


// ============================== GET FILE URL
export async function getFilePreview(fileId: string) {
  try {
    const { storage } = await createAdminClient();
    
    const fileUrl = storage.getFilePreview(
      appwriteConfig.bucketId,
      fileId,
      2000,
      2000,
      ImageGravity.Top,
      100
    );

    if (!fileUrl) throw Error;

    return fileUrl;
  } catch (error) {
    console.log(error);
  }
}

// ============================== DELETE FILE
export async function deleteFile(fileId: string) {
  try {
     const { storage } = await createAdminClient();
     
    await storage.deleteFile(appwriteConfig.bucketId, fileId);

    return { status: "ok" };
  } catch (error) {
    console.log(error);
  }
}



export async function getRecentPost() {
  try {
    const { databases } = await createAdminClient();

    const posts = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.postsCollectionId,
      [Query.orderDesc("$createdAt"), Query.limit(20) ]
    );

 if (!posts) throw Error;

    return posts.documents;
  } catch (error) {
    console.log(error);
  }
  
}