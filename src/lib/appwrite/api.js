import { ID, Query } from "appwrite";
import { account, databases, storage, avatars, appwriteConfig } from "./config";


// =========================================
// Authentication
// =========================================
/* Save user to db after creating account */
async function saveUserToDB(user) {
  try {
    const newUser = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      ID.unique(),
      user
    );
    return newUser;
  } catch (error) {
    console.log(`Error occured while saving user in db.Error: ${error}`);
  }
}

/* Create Account */
export const createUserAccount = async user => {
  if (!user) throw Error;

  try {
    const newAccount = await account.create(
      ID.unique(),
      user.email,
      user.password,
      user.name
    );

    if (!newAccount) throw Error("Accoun exists with same email");

    const avatarUrl = avatars.getInitials(user.name);

    if (!avatarUrl) throw Error;
    
    const newUser = await saveUserToDB({
      accountId: newAccount.$id,
      name: newAccount.name,
      email: newAccount.email,
      imageUrl: avatarUrl
    });

    if (!newUser) throw Error;

    console.log(newUser);

    return newUser;
  } catch (error) {
    console.error(`Error occured while creating account. Error: ${error}`);
    return error;
  }
};

/* Sign in account */
export const signInAccount = async user => {
  if (!user) throw Error;

  try {
    const session = await account.createEmailSession(user.email, user.password);

    if (!session) throw Error;

    console.log({ session });

    return session;
  } catch (error) {
    console.error(`Error occured while signing in to account.Error: ${error}`);
  }
};

/* Sign in with github */
export const loginWithGithub = async () => {
  try {
    await account.createOAuth2Session('github', import.meta.env.VITE_GITHUB_AUTH_SUCCESS_CALLBACK , import.meta.env.VITE_GITHUB_AUTH_FAILURE_CALLBACK);
  } catch (error) {
    console.log(error)
  }
}

/* Get currently loggedin user account from auth */
export const getAccount = async () => {
  try {
    const currentAccount = await account.get();

    if (!currentAccount) throw Error("User not logged in");

    return currentAccount;
  } catch (error) {
    console.error(
      `Error occured while getting currently loggedin account.Error: ${error}`
    );
  }
};

/* Save user after github auth */
export const saveUserAfterGithubAuth = async () => {
  try {
    const currentAccount = await getAccount();
    if(!currentAccount) throw Error;
    
    // Check user already exists or not in db
    const isUserExists = await databases.listDocuments(
        appwriteConfig.databaseId,
        appwriteConfig.userCollectionId,
        [Query.equal("email", currentAccount.email)]
      )
    
    // return console.log({isUserExists: isUserExists.documents.length})
    if(isUserExists.documents.length > 0){
      return { message: "User already exists" }
    }
    
    const user = {
      accountId: currentAccount.$id,
      name: currentAccount.name,
      email: currentAccount.email
    }
    
    const avatarUrl = await avatars.getInitials(user.name)
    if(!avatarUrl) throw Error;
    user.imageUrl = avatarUrl;
    
    // return console.log({user})
    
    const newUser = await saveUserToDB(user)

    if(!newUser) throw Error;
    
    return newUser;
  } catch (error) {
    console.log(error)
  }
}

/* Get currently logged in user account from db */
export const getCurrentlyLoggedInUser = async () => {
  try {
    const currentAccount = await getAccount();

    if (!currentAccount) throw Error("User not logged in");

    const currentUser = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      [Query.equal("accountId", currentAccount.$id)]
    );

    return currentUser.documents[0];
  } catch (error) {
    console.error(`Error occured while getting current user.Error: ${error}`);
  }
};

/* Logout */
export const Logout = async () => {
  try {
    await account.deleteSession("current")
    
    return { status: "ok" }
  } catch (error) {
    console.log(error)
  }
}


// =========================================
// Note Crud Operation
// =========================================
/* Upload File */
const uploadFile = async file => {
  try {
    const uploadedFile = await storage.createFile(
      appwriteConfig.storageId,
      ID.unique(),
      file
    );

    return uploadedFile;
  } catch (error) {
    console.log(error);
  }
};

/* Get File Preview */
export function getFilePreview(fileId) {
  try {
    const fileUrl = storage.getFilePreview(
      appwriteConfig.storageId,
      fileId,
      /*2000,
      2000,
      "top",
      100*/
    );

    if (!fileUrl) throw Error;

    return fileUrl;
  } catch (error) {
    console.log(error);
  }
}

/* Delete File */
export async function deleteFile(fileId) {
  try {
    await storage.deleteFile(appwriteConfig.storageId, fileId);

    return { status: "ok" };
  } catch (error) {
    console.log(error);
  }
}

/* Create Note */  
export const createNote = async note => {
  try {
    const isLoggedinUser = await getCurrentlyLoggedInUser()
    if(!isLoggedinUser) throw Error;
    
    if (!note) throw Error;
    
    let previewUrl;
    let coverImageId;
    if (note.file) {
      const uploadedFile = await uploadFile(note.file);
      if (!uploadedFile) throw Error;

      previewUrl = await getFilePreview(uploadedFile.$id);
      if (!previewUrl) {
        await deleteFile(uploadedFile.$id);
        throw Error;
      }
      coverImageId = uploadedFile.$id;
    }
    
    delete note.file;
    
    const newNote = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.noteCollectionId,
      ID.unique(),
      {
        ...note,
        coverImage :previewUrl,
        coverImageId
      }
    );

    if (!newNote) throw Error;

    return newNote;
  } catch (error) {
    console.log(`Error occured while creating note.Error: ${error}`);
  }
};

/* Find All Note */
export const getAllNote = async userId => {
  try {
    const notes = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.noteCollectionId,
      [
        Query.equal("author", userId),
        Query.equal("isDeleted", false),
      ]
    );

    if (!notes) throw Error;

    return notes.documents;
  } catch (error) {
    console.log(`Error occured while getting note.Error: ${error}`);
  }
};

/* Get all deleted/trash note */
export const getAllDeletedNote = async userId => {
  try {
    const notes = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.noteCollectionId,
      [
        Query.equal("author", userId),
        Query.equal("isDeleted", true),
      ]
    );

    if (!notes) throw Error;

    return notes.documents;
  } catch (error) {
    console.log(`Error occured while getting deleted notes.Error: ${error}`);
  }
};

/* Find note by id */
export const getNoteById = async (noteId, userId) => {
  try {
    const notes = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.noteCollectionId,
      [Query.equal("$id", noteId), Query.equal("author", userId)]
    );

    if (!notes) throw Error;

    return notes.documents[0];
  } catch (error) {
    console.log(`Error occured while getting note by id.Error: ${error}`);
  }
};

/* Update note by id */
export const updateNoteById = async (note) => {
  try {
    const { noteId } = note;
    if(!noteId || !note) throw Error;
    
    // Upload new file and delete old file

    if(note.file){
      // Upload new file & Delete old file
      const uploadedFile = await uploadFile(note.file)
      if(!uploadedFile) throw Error;
      
      const previewUrl = await getFilePreview(uploadedFile.$id)
      if(!previewUrl){
        await deleteFile(uploadedFile.$id)
        throw Error;
      }
      
      await deleteFile(note.coverImageId);
      
      note.coverImage = previewUrl;
      note.coverImageId = uploadedFile.$id
    }
    
    delete note.noteId;
    delete note.file;
    
    const updatedDoc = await databases.updateDocument(
      appwriteConfig.databaseId, 
      appwriteConfig.noteCollectionId, 
      noteId,
      note
    );
    
    if(!updatedDoc) throw Error;
    
    return updatedDoc;
  } catch (error) {
    console.error(error)
    console.log(`Error occured while updating note by id.Error: ${error}`);
  }
};

/* Delete/Move to trash note by id */
export const deleteNoteById = async ({ noteid, type }) => {
  try {
    if(type && type === "permanent"){
      let note = await databases.listDocuments(
          appwriteConfig.databaseId,
          appwriteConfig.noteCollectionId,
          [
            Query.equal("$id", noteid),
          ]
        )
      
      note = note.documents.length > 0 && note.documents[0]
      
      if(!note) throw Error;
      
      // Delete note image from storage
      if(note.coverImageId){
        await deleteFile(note.coverImageId)
      }
      
      const res = await databases.deleteDocument(
          appwriteConfig.databaseId, 
          appwriteConfig.noteCollectionId, 
          noteid,
      );
      
      console.log("Note permanently deleted")
      console.log(res)
      
      return { status: 'ok', ontrash: false }
    }
    
    console.log("fired")
    await databases.updateDocument(
      appwriteConfig.databaseId, 
      appwriteConfig.noteCollectionId, 
      noteid,
      {
        isDeleted: true
      }
    );
    
    console.log("Note Deleted Success")
    
    return { status: 'ok', ontrash: true }
  } catch (error) {
    console.log(`Error occured while deleting note by id.Error: ${error}`);
  }
};

/* Restote note from trash by id */
export const restoreNoteById = async (noteId) => {
  try {
    let note = await databases.listDocuments(
        appwriteConfig.databaseId,
        appwriteConfig.noteCollectionId,
        [Query.equal("$id", noteId)]
      )
    
    note = note?.documents.length > 0 && note.documents[0]
    if(!note) throw Error;
    
    await databases.updateDocument(
      appwriteConfig.databaseId, 
      appwriteConfig.noteCollectionId, 
      noteId,
      {
        isDeleted: false
      }
    );
    
    console.log("Note Restored Success")
    
    return { status: 'ok' }
  } catch (error) {
    console.log(`Error occured while restoring note by id.Error: ${error}`);
  }
};

/* Mark/Unmark Note as Favourite */ 
export const toggleFavourite = async (data) => {
  try {
    const updatedDoc = await databases.updateDocument(
      appwriteConfig.databaseId, 
      appwriteConfig.noteCollectionId, 
      data.id,
      {
        isFavourite: data?.isFavourite
      }
    );
    
    if(!updatedDoc) throw Error;
    
    return updatedDoc;
  } catch (error) {
    console.log(`Error occured while toggling favorite note .Error: ${error}`);
  }
};

/* Get All Favourite Note */ 
export const getFavouriteNotes = async (userId) => {
  try {
    const notes = await databases.listDocuments(
      appwriteConfig.databaseId, 
      appwriteConfig.noteCollectionId, 
      [
        Query.equal("author", userId),
        Query.equal("isFavourite", true),
        Query.equal("isDeleted", false),
      ]
    );
    
    if(!notes) throw Error;
    
    return notes.documents;
  } catch (error) {
    console.log(`Error occured while getting favourite note .Error: ${error}`);
  }
};

/* Publish Note On Web / Make note publicly accessible */ 
export const publishNote = async ({userId, noteId, isPublished}) => {
  try {
    const notes = await databases.listDocuments(
      appwriteConfig.databaseId, 
      appwriteConfig.noteCollectionId, 
      [
        Query.equal("$id", noteId),
        Query.equal("author", userId),
      ]
    );
    
    if(!notes) throw Error;
    
    const publicUrl = `${import.meta.env.VITE_APP_DOMAIN}/public/notes/${noteId}`
    console.log(publicUrl)
    
    const res = await await databases.updateDocument(
      appwriteConfig.databaseId, 
      appwriteConfig.noteCollectionId, 
      noteId,
      {
        isPublished,
        publicUrl
      }
    );
    
    return res
  } catch (error) {
    console.log(`Error occured while publishing note.Error: ${error}`);
  }
};

/* Get Published/Public Note */
export const getPublicNote = async (noteId) => {
  try {
    const notes = await databases.listDocuments(
      appwriteConfig.databaseId, 
      appwriteConfig.noteCollectionId, 
      [
        Query.equal("$id", noteId),
        Query.equal("isPublished", true),
      ]
    );
    
    if(!notes) throw Error;
    
    return notes.documents[0]
  } catch (error) {
    console.log(`Error occured while getting public note.Error: ${error}`);
  }
};

