import { useState } from "react";
import { X } from "lucide-react";
import toast from "react-hot-toast";

export const PublishNoteModal = ({
  isPublished,
  handlePublish,
  setOpenPublishModal,
  note,
  publishProcessing
}) => {
  function copyToClipboard(text) {
    try {
      const textarea = document.createElement("textarea");
      textarea.value = text;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      toast.success("Copied to clipboard")
    } catch (error) {
      toast.error("Copy faled")
    }
  }

  return (
    <div className="py-14 px-10 fixed z-50 top-0 left-0 right-0 bottom-0 w-full h-screen bg-dark-1/30 flex justify-center items-center">
      <div className="w-full h-fit p-4 rounded-lg bg-white shadow-2xl">
        <div className="flex justify-between items-center">
          <span className="text-gray-600 text-sm">
            🎉 Share note with anyone
          </span>
          <button
            className="p-1 rounded bg-gray-100"
            onClick={() => setOpenPublishModal(false)}
          >
            <X />
          </button>
        </div>
        <div className="mt-2">
          <button
            disabled={publishProcessing}
            onClick={handlePublish}
            className="bg-blue-500 text-white w-full rounded px-2 py-1 hover:bg-blue-600 disabled:bg-blue-400"
            type="button"
          >
            {isPublished ? "Unpublish" : "Publish"}
          </button>

          {isPublished && (
            <div className="">
              <pre className="my-4 overflow-auto">{note?.publicUrl || ""}</pre>
              <div className="text-center">
                <span
                  onClick={() => copyToClipboard(note?.publicUrl)}
                  className="bg-gray-200 rounded p-2"
                >
                  Copy link
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
