import { User } from "@/types/user";
import type { Note } from "../../types/note";
import { nextServer } from "../api";
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
  const response = await nextServer.get<Note>(`/notes/${id}`, {
    // headers: {
    //   Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
    // },
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
    // headers: {
    //   Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
    // },
  });
  return response.data;
}
