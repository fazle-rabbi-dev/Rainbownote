import { useParams } from "react-router-dom"
import { Editor, PageLoader } from "@/components"
import { useGetNoteById } from "@/lib/react-query/QueriesAndMutations"
import { useUserContext } from "@/context"


export const UpdateNote = () => {
  const { noteid } = useParams()
  
  const { user } = useUserContext()
  const { data: note, isPending: isLoadingNote } = useGetNoteById(noteid, user?.id)
  
  if(isLoadingNote){
    return <PageLoader />
  }
  
  return (
    <div className="p-4">
      <h1 className="big_heading-1">
        Edit Note
      </h1>
      <Editor note={note} action="update" />
    </div>
  )
}

