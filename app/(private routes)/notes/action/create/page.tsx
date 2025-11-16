import NoteForm from "@/components/NoteForm/NoteForm";
import css from "./CreateNote.module.css";
import Modal from "@/components/Modal/Modal";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create note",
  description: "Here you can create your new note.",
  openGraph: {
    title: "Create note",
    description: "Here you can create your new note.",
    url: "https://08-zustand-six-omega.vercel.app/notes/action/create",
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        width: 1200,
        height: 630,
        alt: "Create note",
      },
    ],
    type: "article",
  },
};

export default function CreateNote() {
  return (
    <main className={css.main}>
      <div className={css.container}>
        <h1 className={css.title}>Create note</h1>
        <Modal>
          <NoteForm />
        </Modal>
      </div>
    </main>
  );
}
