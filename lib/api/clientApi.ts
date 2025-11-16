import type { Note, NoteFormValues } from "../../types/note";
import { nextServer } from "../api";

interface NotesResponse {
  notes: Note[];
  totalPages: number;
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
export async function createNote(note: NoteFormValues): Promise<Note> {
  const response = await nextServer.post<Note>("/notes", note, {
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
    },
  });
  return response.data;
}
export async function deleteNote(id: string): Promise<Note> {
  const response = await nextServer.delete<Note>(`/notes/${id}`, {
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
    },
  });
  return response.data;
}
export async function fetchNoteById(id: string): Promise<Note> {
  const response = await nextServer.get<Note>(`/notes/${id}`, {
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
    },
  });
  return response.data;
}
export async function register() {}
export async function login() {}
export async function logout() {}
export async function checkSession() {}
export async function getMe() {}
export async function updateMe() {}
