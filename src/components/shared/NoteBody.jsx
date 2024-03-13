import React from "react";

export const NoteBody = ({ note }) => {
  console.log(note?.content)
  
  return (
    <div
      className="mt-6 px-4 prose note_container"
      dangerouslySetInnerHTML={{ __html: note?.content }}
    ></div>
  );
};
