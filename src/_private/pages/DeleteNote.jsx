import { Link, useParams, useNavigate } from "react-router-dom";
import { useDeleteNoteById } from "@/lib/react-query/QueriesAndMutations";
import toast from "react-hot-toast";
import { Loader } from "@/components";

export const DeleteNote = () => {
  const { noteid } = useParams();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const type = queryParams.get("type");

  const { mutateAsync: deleteNote, isPending: isDeleting } =
    useDeleteNoteById(noteid);

  const handleDelete = async () => {
    if (noteid) {
      const res = await deleteNote({ noteid, type });
      console.log(res);
      if (res && res.status === "ok") {
        const message = `Note ${
          res.ontrash ? "moved to trash" : "deleted"
        } successfully`;
        toast.success(message);
        navigate("/dashboard");
      } else {
        toast.error("Oops! You might have done something wrong.");
      }
    }
  };

  return (
    <div className="p-4">
      {type && type === "permanent" && (
        <h2 className="text-rose-600 text-2xl mb-3">
          ⚠️ It will be permanently deleted
        </h2>
      )}
      <p className="info">
        Are you sure you want to delete this? After deleting,{" "}
        {type === "permanent"
          ? "it will be permanently deleted.You can't restore it."
          : "it moves to the trash. You can find it anytime in your trash, and you can even restore it."}
      </p>
      <div className="mt-4 flex gap-2">
        <button
          disabled={isDeleting}
          onClick={handleDelete}
          className="px-4 py-2 rounded bg-rose-500 text-white disabled:bg-rose-400 "
          type="button"
        >
          {isDeleting ? (
            <div className="flex items-center gap-2">
              <Loader />
              <span>Deleting</span>
            </div>
          ) : (
            "Delete"
          )}
        </button>
        <button
          disabled={isDeleting}
          className="px-4 py-2 rounded bg-light-2 dark:bg-dark-3"
          type="button"
        >
          <Link to={`/view-note/${noteid}`}>Cancel</Link>
        </button>
      </div>
    </div>
  );
};
