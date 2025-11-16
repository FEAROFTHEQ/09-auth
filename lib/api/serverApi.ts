import type { Note } from "../../types/note";
import { nextServer } from "../api";

interface NotesResponse {
  notes: Note[];
  totalPages: number;
}
export async function checkSession() {}
export async function getMe() {}
export async function fetchNoteById(id: string): Promise<Note> {
  const response = await nextServer.get<Note>(`/notes/${id}`, {
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
    },
  });
  return response.data;
}
export async function fetchNotes(
  query: string,
  page: number,
  searchSlug?: string
): Promise<{ notes: Note[]; totalPages: number }> {
  const response = await nextServer.get<NotesResponse>("/notes", {
    params: {
      search: query,
      page: page,
      perPage: 12,
      tag: searchSlug,
    },
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
    },
  });
  return response.data;
}
