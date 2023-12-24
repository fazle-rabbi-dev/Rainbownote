/**
  * Expected Prop:
  
  const data = {
    open: false,
    title: "Title",
    message: "Message...",
    yes: () => alert("Yes"),
    cancel: () => alert("cancel"),
  }
  
*/

import React from "react";

function Alert(props) {
  let data;
  if ("data" in props) {
    data = props.data;
  }

  return (
    <div
      className={`${
        data?.open ? "visible" : "hidden"
      } fixed w-full h-[100vh] top-0 left-0 right-0 bg-[rgba(0,0,0,.82)] px-4`}
    >
      <div className="relative rounded bg-white w-full mt-10 p-4">
        <span onClick={data?.cancel} className="absolute top-2 right-2">
          ✖️
        </span>
        <h2 className="text-2xl my-2 font-bold tracking-wide">
          {data?.title || "Are you sure?"}
        </h2>
        <p className="font-light tracking-wide">
          {data?.message ||
            "Aute duis laboris excepteur laboris mollit commodo excepteur mollit cupidatat enim ipsum excepteur est adipisicing consectetur deserunt elit eiusmod incididunt"}
        </p>
        <div className="flex justify-end gap-2">
          <button
            onClick={data?.cancel}
            className="py-1 px-2 rounded border-[1px] border-pink-500 text-pink-500"
            type="button"
          >
            Cancel
          </button>
          <button
            onClick={data?.yes}
            className="py-1 px-4 rounded bg-pink-500 text-white"
            type="button"
          >
            Yes
          </button>
        </div>
      </div>
    </div>
  );
}

export default Alert;
