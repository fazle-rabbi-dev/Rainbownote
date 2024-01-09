import { Link, useParams, Navigate } from "react-router-dom";
import { useGetPublicNote } from "@/lib/react-query/QueriesAndMutations";
import { NoteHeader, NoteBody, PageLoader } from "@/components";
import { Github, ChevronLeft } from "lucide-react";

export const PublicNote = () => {
  const { noteid } = useParams();

  const { data: note, isPending: isLoadingNote } = useGetPublicNote(noteid);

  console.log({ note });

  if (isLoadingNote) {
    return <PageLoader />;
  }

  return (
    <div className="md:mx-32">
      {!note ? (
        <div className="">
          <div className="text-center my-4">
            <h2 className="text-4xl font-extrabold">Oops!</h2>
            <span>Nothing found</span>
          </div>
          <button className="mt-4 w-full text-center" type="button">
            <Link className="bg-gray-200 rounded p-2" to="/">
              Go home
            </Link>
          </button>
        </div>
      ) : (
        <>
          <nav className="border-b-[1px] border-gray-300/30 px-2 py-2 flex justify-between items-center">
            <div className="flex text-gray-600">
              <Link to="/" className="text-xl flex items-center gap-2">
                <ChevronLeft />
              </Link>
              <p className="space-x-1">
                <span>{note?.icon}</span>
                <span>{note?.title.slice(0, 15)}...</span>
              </p>
            </div>

            <Link
              target="_blank"
              to="/"
            >
              <img className="w-6 h-6" src="/apple-touch-icon.png" alt="Logo" />
            </Link>
          </nav>
          <NoteHeader note={note} />
          <NoteBody note={note} />
        </>
      )}
    </div>
  );
};
