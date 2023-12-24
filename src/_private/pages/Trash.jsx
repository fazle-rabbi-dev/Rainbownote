import { useGetAllDeletedNote } from "@/lib/react-query/QueriesAndMutations";
import { useUserContext } from "@/context";
import { NoteCard, Loader } from "@/components";

export const Trash = () => {
  const { user } = useUserContext();
  const { data: notes, isPending: isLoadingPost } = useGetAllDeletedNote(
    user?.id
  );

  return (
    <div className="p-4">
      <h1 className="big_heading-1">Your trash</h1>

      {isLoadingPost ? (
        <div className="flex justify-center items-center mt-20">
          <Loader />
        </div>
      ) : (
        <div className="">
          {notes?.length === 0 && (
            <div className="no_result_found">Your trash is empty.After deleting a note, you will find that note here.</div>
          )}

          <ul className="">
            {notes?.map(note => (
              <NoteCard key={note?.$id} note={note} />
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
