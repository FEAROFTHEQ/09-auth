"use client";
import { useParams, useRouter } from "next/navigation";
import css from "./NotePreview.module.css";
import { fetchNoteById } from "@/lib/api/clientApi";
import { useQuery } from "@tanstack/react-query";
import Modal from "@/components/Modal/Modal";

export default function NotePreviewClient() {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();
  const {
    data: note,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
    refetchOnMount: false,
  });
  return (
    <Modal>
      {isLoading && <p>Loading, please wait...</p>}
      {error && !note && <p>Something went wrong.</p>}
      {!isLoading && !error && note && (
        <div className={css.container}>
          <div className={css.item}>
            <div className={css.header}>
              <h2>{note.title}</h2>
            </div>
            <p className={css.content}>{note.content}</p>
            <p className={css.tag}>{note.tag}</p>
            <p className={css.date}>
              Created date: {new Date(note.createdAt).toLocaleString()}
            </p>
          </div>
          <button className={css.backBtn} onClick={() => router.back()}>
            Go Back
          </button>
        </div>
      )}
    </Modal>
  );
}
