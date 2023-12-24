import {
  useQuery,
  useMutation,
  useQueryClient,
  useInfiniteQuery
} from "@tanstack/react-query";
import QUERY_KEYS from "./queryKeys";
import {
  createUserAccount,
  signInAccount,
  createNote,
  getAllNote,
  getAllDeletedNote,
  getNoteById,
  updateNoteById,
  deleteNoteById,
  restoreNoteById,
  toggleFavourite,
  getFavouriteNotes,
  Logout
} from "../appwrite/api";

// =========================================
// Authentication
// =========================================
export const useCreateUserAccount = () => {
  return useMutation({
    mutationFn: user => createUserAccount(user)
  });
};

export const useSignInAccount = () => {
  return useMutation({
    mutationFn: user => signInAccount(user)
  });
};

export const useSignOut = () => {
  return useMutation({
    mutationFn: Logout
  });
};

// =========================================
// Note CRUD Operation
// =========================================
/* Create Note */
export const useCreateNote = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: note => createNote(note),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.GET_ALL_NOTE] })
    }
  });
};

export const useGetAllNote = userId => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_ALL_NOTE],
    queryFn: () => getAllNote(userId),
    enabled: !!userId
  });
};

export const useGetAllDeletedNote = userId => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_ALL_DELETED_NOTE],
    queryFn: () => getAllDeletedNote(userId),
    enabled: !!userId
  });
};

/* Get Note By Id */
export const useGetNoteById =  (noteId, userId) => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_NOTE_BY_ID, noteId],
    queryFn: () => getNoteById(noteId, userId),
    enabled: !!noteId && !!userId,
    initialData: () => {
      const queryClient = useQueryClient();
      const data = queryClient.getQueryData([QUERY_KEYS.GET_NOTE_BY_ID, noteId])
      const newData = data?.find(note => note.id.toString() === noteId.toString())

      if(newData){
        return newData;
      }else{
        return undefined;
      }
    }
  });
};

/* Update Note By Id */
export const useUpdateNoteById =  (noteId) => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: (note) => updateNoteById(note),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_ALL_NOTE],
      })
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_NOTE_BY_ID, noteId],
      })
    }
  });
};

/* Delete Note By Id */
export const useDeleteNoteById =  (noteId) => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: (noteId) => deleteNoteById(noteId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_ALL_NOTE]
      })
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_NOTE_BY_ID, noteId]
      })
    }
  });
};


/* Restore deleted Note By Id */
export const useRestoreNoteById =  (noteId) => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: (noteId) => restoreNoteById(noteId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_ALL_NOTE]
      })
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_NOTE_BY_ID, noteId]
      })
    }
  });
};


/* Make Favourite Note */
export const useToggleFavourite =  (noteId) => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: (data) => toggleFavourite(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_ALL_NOTE],
      })
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_NOTE_BY_ID, noteId],
      })
    }
  });
};

/* Get Favourite Note*/
export const useGetFavouriteNotes = (userId) => {
  return useQuery({
      queryKey: [QUERY_KEYS.GET_ALL_FAVOURITE_NOTE],
      queryFn: () => getFavouriteNotes(userId),
      enabled: !!userId
    })
}





/* Publish Note */
