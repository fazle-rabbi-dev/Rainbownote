import { useParams } from "react-router-dom";

import { useGetNoteById } from "@/lib/react-query/QueriesAndMutations";
import { PageLoader, NoteHeader, NoteBody } from "@/components";
import { useUserContext } from "@/context";

export const ViewNote = () => {
  const { noteid } = useParams();
  const { user } = useUserContext();

  // Mutations
  const { data: note, isPending: isLoadingNote } = useGetNoteById(
    noteid,
    user?.id
  );

  if (isLoadingNote) {
    return <PageLoader />;
  }

  return (
    <div>
      <NoteHeader user={user} note={note} />
      <NoteBody note={note} />
    </div>
  );
};
