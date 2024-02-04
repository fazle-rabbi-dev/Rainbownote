import { useState, useEffect } from "react";
import { NoteCard, Loader, PageLoader } from "@/components";
import { useGetAllNote } from "@/lib/react-query/QueriesAndMutations";
import { useUserContext } from "@/context";
import { Search, ListFilter } from "lucide-react";
import { twMerge } from "tailwind-merge";

export const Dashboard = () => {
  const { user } = useUserContext();
  const { data: notes, isPending: isLodingPost } = useGetAllNote(user?.id);
  const [allNote, setAllNote] = useState(notes || []);
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    setAllNote(notes);
  }, [notes]);

  if (isLodingPost) {
    return <PageLoader />;
  }

  const handleSearch = e => {
    const value = e.target.value;
    setSearchValue(value);

    if (!value) {
      return setAllNote(notes);
    }

    const filteredNotes = notes.filter(note =>
      note.title.toLowerCase().startsWith(value.toLowerCase())
    );
    if (filteredNotes?.length > 0) {
      setAllNote(filteredNotes);
    } else {
      setAllNote([]);
    }
  };

  return (
    <div className="px-4 py-2">
      <div className="relative flex gap-1">
        <input
          onChange={handleSearch}
          placeholder="Search notes"
          className="dashboard_search"
          type="text"
          name=""
          id=""
          value={searchValue}
        />
        <span className="absolute top-2 left-2 text-gray-400">
          <Search />
        </span>
      </div>

      <div className="mt-2 flex justify-between items-center gap-4">
        <h4 className="font-bold">All notes</h4>
        <span>
          <ListFilter />
        </span>
      </div>

      {notes?.length > 0 && allNote?.length === 0 && (
        <div className="">
          <span className="no_result_found">No result found</span>
        </div>
      )}

      {notes?.length === 0 && (
        <div className="">
          <span className="no_result_found">
            You haven't created any note yet.
          </span>
        </div>
      )}

      <ul className="mt-4">
        {allNote?.map(note => (
          <NoteCard key={note?.$id} note={note} />
        ))}
      </ul>
    </div>
  );
};
