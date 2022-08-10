import { Book } from "../../pages/Books/_id"

export const BookViewDialog = ({ _id }: { _id: string }) => {
  return (
    <section className="p-dialog-book">
      <Book _id={_id} />
    </section>
  )
}