import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import EmojiPicker from "emoji-picker-react";
import toast from "react-hot-toast";
import { Smile, Image, X, Save } from "lucide-react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

import { useCreateNote, useUpdateNoteById } from "@/lib/react-query/QueriesAndMutations";
import { useUserContext } from "@/context";
import { ImageUploader } from "../ui/ImageUploader";
import { Loader } from "@/components";

// Editor Configuration
const modules = {
  toolbar: [
    [{ header: "1" }, { header: "2" }, { font: [] }],
    [{ size: [] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [{ list: "ordered" }, { list: "bullet" }, { indent: "-1" }, { indent: "+1" }],
    ["link"],
    [{ color: [] }, { background: [] }],
    ["clean"]
  ]
};

const formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  // "image",
  // "video",
  "color",
  "background"
];

export const Editor = ({ note, action }) => {
  const [title, setTitle] = useState(note?.title || "");
  const [icon, setIcon] = useState(note?.icon || "");
  const [file, setFile] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [editorHtml, setEditorHtml] = useState("");
  const [editorLoaded, setEditorLoaded] = useState(false);

  const { user } = useUserContext();
  const navigate = useNavigate();

  const { mutateAsync: createNote, isPending: isCreatingNote } = useCreateNote();
  const { mutateAsync: updateNote, isPending: isUpdatingNote } = useUpdateNoteById(note?.$id);

  // =====================================================================================================================
  // Create Note
  // =====================================================================================================================
  const saveNote = async () => {
    if (!user) {
      return toast.error("Oops! user not loggedin");
    }

    const content = editorHtml;

    if (!title || !content) {
      return toast.error("Oops! this note couldn't be created because it's empty.", {
        duration: 2000
      });
    }

    /* Update Note */
    if (action === "update") {
      const newNote = await updateNote({
        noteId: note?.$id,
        title,
        content,
        author: user?.id,
        icon: icon || "",
        file,
        coverImageId: note?.coverImageId || "not exists"
      });

      if (!newNote) {
        return toast.error("Oops! something went wrong");
      }

      toast.success("Note updated successfully");
      navigate(`/view-note/${note?.$id}`);
      return;
    }

    /* Create Note */
    const newNote = await createNote({
      title,
      content,
      author: user?.id,
      icon: icon || "",
      file
    });
    console.log({ newNote });
    if (!newNote) {
      return toast.error("Oops! something went wrong");
    }

    toast.success("Note created successfully");
    navigate("/dashboard");
  };

  const toggleEmojiPicker = (emoji, a) => {
    setShowEmojiPicker(!showEmojiPicker);
    if (typeof emoji === "string") {
      setIcon(emoji);
    }
  };
  
  useEffect(() => {
    if (note?.content) {
      setEditorHtml(note.content);
    }
    
    const timeout = setTimeout(() => {
      setEditorLoaded(true);
    }, 1000);

    // Clean up the timeout
    return () => clearTimeout(timeout);
  }, [note?.content]);

  return (
    <div className="">
      <ImageUploader setFile={setFile} mediaUrl={note?.coverImage} />

      {/* User Actions */}
      <div className="my-4 flex items-center gap-4">
        {!icon && (
          <button className="text-gray-400 flex items-center gap-1" onClick={toggleEmojiPicker} type="button">
            <span>
              <Smile />
            </span>
            <span>Add icon</span>
          </button>
        )}
      </div>

      {/* Emoji Picker */}
      <div
        className={`${
          showEmojiPicker ? "flex justify-center items-center " : "hidden"
        } fixed bg-gray-900/60 top-0 bottom-0 left-0 right-0 w-full z-40`}
      >
        <div className="bg-white m-4 rounded">
          <div className="flex justify-between items-center m-2">
            <span className="text-gray-600">Choose your favourite one</span>
            <button className="text-2xl p-2 bg-gray-100 rounded" onClick={() => setShowEmojiPicker(false)}>
              <X />
            </button>
          </div>
          <EmojiPicker onEmojiClick={value => toggleEmojiPicker(value.emoji)} autoFocusSearch={false} />
        </div>
      </div>

      {/* Display icon & title */}
      <div className="flex items-center gap-1">
        {icon && (
          <button className="text-2xl" onClick={toggleEmojiPicker}>
            {icon}
          </button>
        )}
        <input
          onChange={e => setTitle(e.target.value)}
          placeholder="Title"
          className="bg-transparent w-full my-2 border-0 focus:outline-0 text-3xl"
          type="text"
          name=""
          id=""
          value={title}
        />
      </div>

      {/* Rich Text Editor */}
      <div className="h-[400px]">
        {
          editorLoaded ? <ReactQuill theme="snow" value={editorHtml} onChange={setEditorHtml} modules={modules} formats={formats} className="h-[300px]" /> : (
              <Loader />
            )
        }
      </div>

      <button disabled={isCreatingNote || isUpdatingNote} className="submit_button" onClick={saveNote}>
        {isCreatingNote || isUpdatingNote ? (
          <>
            <Loader />
            <span>Saving...</span>
          </>
        ) : (
          <>
            <span>Save note</span>
            <Save size={17} />
          </>
        )}
      </button>
    </div>
  );
};
