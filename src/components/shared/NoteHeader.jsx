import React from "react";
import { Link, useParams } from "react-router-dom";
import { PencilLine, Trash2, UndoDot, Heart, Star, Globe } from "lucide-react";
import toast from "react-hot-toast";

import { formatDate } from "@/lib";
import { useToggleFavourite, useRestoreNoteById } from "@/lib/react-query/QueriesAndMutations";

export const NoteHeader = ({ user, note }) => {
  const { mutateAsync: toggleFavourite, isPending: isTogglingFavourite } =
    useToggleFavourite(note?.$id);
  const { mutateAsync: restoreNote, isPending: isRestoringNote } =
    useRestoreNoteById(note?.$id);
  

  const markAsFavourite = async () => {
    let updatedDoc;
    if (note?.isFavourite) {
      updatedDoc = await toggleFavourite({ id: note?.$id, isFavourite: false });
    } else {
      updatedDoc = await toggleFavourite({ id: note?.$id, isFavourite: true });
    }

    if (updatedDoc) {
      return toast.success(
        `${
          updatedDoc?.isFavourite
            ? "Note marked as favourite"
            : "Note removed from favourite"
        }`
      );
    }

    toast.error("Oops! something went wrong");
  };
  
  const handleRestoreNote = async () => {
    const res = await restoreNote(note?.$id)
    if(res?.status === 'ok'){
      toast.success("Note successfully restored.")
    }else{
      toast.error("Note restore failed")
    }
  }
  
  return (
    <>
      {/* Display icon with cover image when both exists */}
      {note?.coverImage && (
        <div className="h-44 relative">
          <img
            className="w-full h-full object-cover"
            src={note?.coverImage}
            alt={note?.title}
          />
          <span className="absolute left-4 bottom-[-20px] text-4xl">
            {note?.icon}
          </span>
        </div>
      )}

      <div className="mt-8 px-4">
        <div className="">
          {!note?.coverImage && note?.icon && (
            <span className="text-4xl">{note?.icon}</span>
          )}
        </div>
        <div className="">
          <h1 className="">{note?.title}</h1>
          <p className="">
            <span>Created at:</span>{" "}
            <span className="text-dark-5 dark:text-light-2">
              {formatDate(note?.$createdAt)}
            </span>
          </p>

          {/* User Actions */}
          {
            user && (
                <div className="mt-2 flex items-center gap-4 text-dark-5 dark:text-off-white">
                  <Link to={`/edit-note/${note?.$id}`}>
                    <PencilLine size={20} />
                  </Link>
                  <Link to={`/delete-note/${note?.$id}${note?.isDeleted ? "?type=permanent" : ""}`}>
                    <Trash2 size={20} />
                  </Link>
                  <button>
                    <Globe size={20} />
                  </button>
                  <button
                    disabled={isTogglingFavourite}
                    className={note?.isFavourite && "text-primary-600 font-bold"}
                    onClick={markAsFavourite}
                  >
                    <Star size={20} />
                  </button>
                  {note?.isDeleted && (
                    <button onClick={handleRestoreNote} disabled={isRestoringNote} type="button">
                      <UndoDot size={24} />
                    </button>
                  )}
                </div>
              )
          }
        </div>
      </div>
    </>
  );
};
