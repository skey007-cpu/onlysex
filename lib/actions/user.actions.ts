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




// export const toggleSave = async ({
//     post,
//     userId,
// }: {
//     post: any;
//     userId: string;
// }) => {
//     const { databases } = await createAdminClient();

//     const postId = post.creator?.$id;

//     // 🔍 check si déjà saved
//     const isSaved = post.save?.includes(userId);

//     try {
//         if (isSaved) {
//             // ❌ remove userId from array
//             const updatedSave = post.save.filter((id: string) => id !== userId);

//             await databases.updateDocument(
//                 appwriteConfig.databaseId,
//                 appwriteConfig.postsCollectionId,
//                 postId,
//                 {
//                     save: updatedSave,
//                 }
//             );

//             return { status: "removed" };
//         }

//         // ✅ add userId
//         const updatedSave = [...(post.save || []), userId];

//         await databases.updateDocument(
//             appwriteConfig.databaseId,
//             appwriteConfig.postsCollectionId,
//             postId,
//             {
//                 save: updatedSave,
//             }
//         );

//         return { status: "added" };
//     } catch (error) {
//         console.log("toggleSave error:", error);
//         throw new Error("Save toggle failed");
//     }
// };



// export const checkIfSaved = async (postId: string, userId: string) => {
   

//     try {
//        const { databases } = await createAdminClient();
//         const result = await databases.listDocuments(
//             appwriteConfig.databaseId,
//             appwriteConfig.savesCollectionId,
//             [
//                 Query.equal("postId", postId),
//                 Query.equal("userId", userId),
//             ]
//         );

//         if (result.documents.length > 0) {
//             return {
//                 isSaved: true,
//                 savedDocId: result.documents[0].$id,
//             };
//         }

//         return {
//             isSaved: false,
//             savedDocId: null,
//         };
//     } catch (error) {
//         console.log("checkIfSaved error:", error);

//         return {
//             isSaved: false,
//             savedDocId: null,
//         };
//     }
// };


export const toggleLike = async ({
    post,
    userId,
}: {
    post: any;
    userId: string;
}) => {
    const { databases } = await createAdminClient();

    const postId = post.$id;
    const likes = post.likes || [];

    const alreadyLiked = likes.includes(userId);

    try {
        let updatedLikes;

        if (alreadyLiked) {
            // ❌ enlever le like
            updatedLikes = likes.filter((id: string) => id !== userId);
        } else {
            // ❤️ ajouter le like
            updatedLikes = [...likes, userId];
        }

        await databases.updateDocument(
            appwriteConfig.databaseId,
            appwriteConfig.postsCollectionId,
            postId,
            {
                likes: updatedLikes,
            }
        );

        return {
            status: alreadyLiked ? "unliked" : "liked",
            likes: updatedLikes,
        };
    } catch (error) {
        console.log("toggleLike error:", error);
        throw new Error("Like failed");
    }
};


export const toggleSave = async ({
    userId,
    postId,
}: {
    userId: string;
    postId: string;
}) => {
    const { databases } = await createAdminClient();

    try {
        // 🔍 Vérifier si déjà sauvegardé
        // const existing = await databases.listDocuments(
        //     appwriteConfig.databaseId,
        //     appwriteConfig.savesCollectionId,
        //     [
        //         Query.equal("userId", userId),
        //         Query.equal("postId", postId),
        //     ]
        // );

        // ❌ Déjà sauvegardé → supprimer
        // if (existing.documents.length > 0) {
        //     await databases.deleteDocument(
        //         appwriteConfig.databaseId,
        //         appwriteConfig.savesCollectionId,
        //         existing.documents[0].$id
        //     );

        //     return { status: "unsaved" };
        // }

        // ✅ Sinon → créer
        const newSave = await databases.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.savesCollectionId,
            ID.unique(),
            {
                userId,
                postId,
            }
        );

        return { status: "saved", data: newSave };
    } catch (error) {
        console.log("toggleSave error:", error);
        throw new Error("Save failed");
    }
};


export const checkIfSaved = async (postId: string, userId: string) => {
    const { databases } = await createAdminClient();

    try {
        const result = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.savesCollectionId,
            [
                Query.equal("postId", postId),
                Query.equal("userId", userId),
            ]
        );

        const isSaved = result.documents.length > 0;

        return {
            isSaved,
            savedDocId: isSaved ? result.documents[0].$id : null,
        };
    } catch (error) {
        console.log("checkIfSaved error:", error);

        return {
            isSaved: false,
            savedDocId: null,
        };
    }
};



export const updateUserBio = async ({
    userId,
    bio,
}: {
    userId: string;
    bio: string;
}) => {
    const { databases } = await createAdminClient();

    try {
        const updatedUser = await databases.updateDocument(
            appwriteConfig.databaseId,
            appwriteConfig.usersCollectionId,
            userId,
            {
                bio,
            }
        );

        return updatedUser;
    } catch (error) {
        console.log("updateUserBio error:", error);
        throw error;
    }
};