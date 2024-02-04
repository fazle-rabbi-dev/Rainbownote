import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Editor as TextEditor } from "@tinymce/tinymce-react";
import EmojiPicker from "emoji-picker-react";
import toast from "react-hot-toast";
import { Smile, Image, X, Save } from "lucide-react";

import {
  useCreateNote,
  useUpdateNoteById
} from "@/lib/react-query/QueriesAndMutations";
import { useUserContext } from "@/context";
import { ImageUploader } from "../ui/ImageUploader";
import { Loader } from "@/components";

export const Editor = ({ note, action }) => {
  const [title, setTitle] = useState(note?.title || "");
  const [icon, setIcon] = useState(note?.icon || "");
  const [file, setFile] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [isReadyEditor, setIsReadyEdtor] = useState(false);

  const editorRef = useRef(null);
  const { user } = useUserContext();
  const navigate = useNavigate();

  const { mutateAsync: createNote, isPending: isCreatingNote } =
    useCreateNote();
  const { mutateAsync: updateNote, isPending: isUpdatingNote } =
    useUpdateNoteById(note?.$id);

  const getHtml = () => {
    if (editorRef.current) {
      return editorRef.current.getContent();
    }
  };

  const saveNote = async () => {
    if (!user) {
      return toast.error("Oops! user not loggedin");
    }

    const content = getHtml();

    if (!title || !content) {
      return toast.error(
        "Oops! this note couldn't be created because it's empty.",
        {
          duration: 2000
        }
      );
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

  return (
    <div className="">
      <ImageUploader setFile={setFile} mediaUrl={note?.coverImage} />

      {/* User Actions */}
      <div className="my-4 flex items-center gap-4">
        {!icon && (
          <button
            className="text-gray-400 flex items-center gap-1"
            onClick={toggleEmojiPicker}
            type="button"
          >
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
            <button
              className="text-2xl p-2 bg-gray-100 rounded"
              onClick={() => setShowEmojiPicker(false)}
            >
              <X />
            </button>
          </div>
          <EmojiPicker
            onEmojiClick={value => toggleEmojiPicker(value.emoji)}
            autoFocusSearch={false}
          />
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
      <div className="z-10">
        {!isReadyEditor && <Loader />}

        <TextEditor
          apiKey={`${import.meta.env.VITE_MCE_EDITOR_API_KEY}`}
          onInit={(evt, editor) => (editorRef.current = editor)}
          initialValue={note?.content}
          init={{
            setup: editor => {
              editor.on("init", setIsReadyEdtor(true));
            },
            contextmenu_avoid_overlap: ".mce-spelling-word",
            height: 500,
            menubar: false,
            plugins: [
              "advlist",
              "autolink",
              "lists",
              "link",
              "image",
              "charmap",
              "preview",
              "anchor",
              "searchreplace",
              "visualblocks",
              "code",
              "fullscreen",
              "insertdatetime",
              "media",
              "table",
              "code",
              "help",
              "wordcount"
            ],
            toolbar:
              "undo redo | blocks | " +
              "bold italic underline fontfamily backcolor forecolor | alignleft aligncenter " +
              "alignright alignjustify | bullist checklist numlist outdent indent | " +
              "removeformat help",
            content_style:
              "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
            color_cols_background: 6,
            skin: window.matchMedia("(prefers-color-scheme: dark)").matches
              ? "oxide-dark"
              : "oxide",
            content_css: window.matchMedia("(prefers-color-scheme: dark)")
              .matches
              ? "dark"
              : "default"
          }}
        />
      </div>
      <button
        disabled={isCreatingNote || isUpdatingNote}
        className="submit_button"
        onClick={saveNote}
      >
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
