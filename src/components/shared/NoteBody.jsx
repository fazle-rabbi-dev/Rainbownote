import React from "react";

export const NoteBody = ({ note }) => {
  return (
    <div
      className="mt-6 px-4 note_container"
      dangerouslySetInnerHTML={{ __html: note?.content }}
    ></div>
  );
};
