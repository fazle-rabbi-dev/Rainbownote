import React from "react";
import { Link } from "react-router-dom";
import { formatDate } from "@/lib";
import { BookText } from "lucide-react";

export const NoteCard = ({ note }) => {
  return (
    <li className="flex rounded hover:bg-gray-100 dark:hover:bg-gray-700">
      <Link to={`/view-note/${note?.$id}`} className="note_list">
        <span className="text-dark-5 dark:text-off-white">{note?.icon ? note.icon : <BookText size={20} />}</span>
        <h2 className="text-dark-5 dark:text-off-white">{note?.title.slice(0, 30)} {note?.title.length > 30 && "..."}</h2>
      </Link>
    </li>
  );
};
