import { Link, useParams, useNavigate } from "react-router-dom"
import { useDeleteNoteById } from "@/lib/react-query/QueriesAndMutations"
import toast from "react-hot-toast"
import { Loader } from "@/components"

export const DeleteNote = () => {
  const { noteid } = useParams();
  const navigate = useNavigate()
  const { mutateAsync: deleteNote, isPending: isDeleting } = useDeleteNoteById(noteid)
  
  const handleDelete = async () => {
    if(noteid){
      const res = await deleteNote(noteid);
      if(res.status === 'ok'){
        toast.success("Note deleted successfully")
        navigate("/dashboard")
      }
    }
  }
  
  return (
    <div className="p-4">
      <p className="info">
        Are you sure you want to delete this? After deleting, it moves to the trash. You can find it anytime in your trash, and you can even restore it.
      </p>
      <div className="mt-4 flex gap-2">
        <button disabled={isDeleting} onClick={handleDelete} className="px-4 py-2 rounded bg-rose-500 text-white disabled:bg-rose-300 " type="button">
          {
            isDeleting ? (
                <div className="flex items-center gap-2">
                  <Loader />
                  <span>Deleting</span>
                </div>
              ) : "Delete"
          }
        </button>
        <button disabled={isDeleting} className="px-4 py-2 rounded bg-light-2 dark:bg-dark-3" type="button">
          <Link to={`/view-note/${noteid}`}>
            Cancel
          </Link>
        </button>
      </div>
    </div>
  )
}

