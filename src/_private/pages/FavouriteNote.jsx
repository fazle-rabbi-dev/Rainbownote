import { useGetFavouriteNotes } from "@/lib/react-query/QueriesAndMutations";
import { Loader, NoteCard } from "@/components";
import { useUserContext } from "@/context";

export const FavouriteNote = () => {
  const { user } = useUserContext();
  const { data: notes, isPending: isLoadingNotes } = useGetFavouriteNotes(
    user?.id
  );

  return (
    <div className="p-4">
      <h1 className="big_heading-1">Favourite notes</h1>
      {isLoadingNotes ? (
        <div className="w-full flex justify-center items-center mt-20">
          <Loader />
        </div>
      ) : (
        <ul className="">
          <li className="no_result_found">
            {notes?.length === 0 &&
              "Oops! Looks like you haven't added any notes to your favorites yet."}
          </li>
          {notes?.map(note => (
            <NoteCard key={note.$id} note={note} />
          ))}
        </ul>
      )}
    </div>
  );
};
