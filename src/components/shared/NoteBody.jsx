import React from "react";

export const NoteBody = ({ note }) => {
  return (
    <p
      className="mt-6 px-4"
      dangerouslySetInnerHTML={{ __html: note?.content }}
    ></p>
  );
};
