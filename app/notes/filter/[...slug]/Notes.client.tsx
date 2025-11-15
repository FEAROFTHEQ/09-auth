"use client";

import { fetchNotes } from "@/lib/api";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import css from "./NotesClient.module.css";
import NoteList from "../../../../components/NoteList/NoteList";
import Pagination from "../../../../components/Pagination/Pagination";
// import Modal from "../../../../components/Modal/Modal";
// import NoteForm from "../../../../components/NoteForm/NoteForm";
import SearchBox from "../../../../components/SearchBox/SearchBox";
import { useParams } from "next/navigation";
import ALL_NOTES from "@/lib/all";
import Link from "next/link";

export default function NoteClient() {
  const params = useParams<{ slug: string[] }>();
  const searchSlug =
    params?.slug?.[0] === ALL_NOTES ? undefined : params.slug[0];
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");
  const {
    data: notesData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["notes", query, page, searchSlug],
    queryFn: () => fetchNotes(query, page, searchSlug),
    placeholderData: keepPreviousData,
    refetchOnMount: false,
  });

  // const [isModal, setIsModal] = useState(false);

  // const openModal = () => setIsModal(true);
  // const closeModal = () => setIsModal(false);

  const handleSearch = useDebouncedCallback((query: string) => {
    setQuery(query);
    setPage(1);
  }, 300);

  return (
    <>
      {isLoading && <p>Loading your notes...</p>}
      {isError && <p>Sorry, error happened...</p>}
      {!isLoading && !isError && notesData && (
        <div className={css.app}>
          <header className={css.toolbar}>
            <SearchBox onSearch={handleSearch} />
            {notesData.totalPages > 1 && (
              <Pagination
                totalPages={notesData.totalPages}
                page={page}
                setPage={setPage}
              />
            )}
            <Link className={css.button} href={`/notes/action/create`}>
              Create note +
            </Link>
            {/* <button className={css.button} onClick={openModal}>
              Create note +
            </button> */}
            {/* {isModal && (
              <Modal>
                <NoteForm setPage={setPage} closeModal={closeModal} />
              </Modal>
            )} */}
          </header>
          {notesData && notesData.notes.length > 0 && (
            <NoteList notes={notesData.notes} />
          )}
        </div>
      )}
    </>
  );
}
