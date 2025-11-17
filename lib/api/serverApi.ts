import { User } from "@/types/user";
import type { Note } from "../../types/note";
import { nextServer } from "./api";
import { cookies } from "next/headers";

interface NotesResponse {
  notes: Note[];
  totalPages: number;
}
export async function checkSession() {
  const cookieStore = await cookies();
  const res = await nextServer.get("/auth/session", {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return res;
}
export async function getMe(): Promise<User> {
  const cookieStore = await cookies();
  const { data } = await nextServer.get("/users/me", {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return data;
}
export async function fetchNoteById(id: string): Promise<Note> {
  const cookieStore = await cookies();
  const response = await nextServer.get<Note>(`/notes/${id}`, {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return response.data;
}
export async function fetchNotes(
  query: string,
  page: number,
  searchSlug?: string
): Promise<{ notes: Note[]; totalPages: number }> {
  const cookieStore = await cookies();
  const response = await nextServer.get<NotesResponse>("/notes", {
    params: {
      search: query,
      page: page,
      perPage: 12,
      tag: searchSlug,
    },
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return response.data;
}
export async function deleteNote(id: string): Promise<Note> {
  const cookieStore = await cookies();

  const response = await nextServer.delete<Note>(`/notes/${id}`, {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });

  return response.data;
}
