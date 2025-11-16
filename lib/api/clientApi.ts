import { User } from "@/types/user";
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
    // headers: {
    //   Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
    // },
  });
  return response.data;
}
export async function createNote(note: NoteFormValues): Promise<Note> {
  const response = await nextServer.post<Note>("/notes", note, {
    // headers: {
    //   Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
    // },
  });
  return response.data;
}
export async function deleteNote(id: string): Promise<Note> {
  const response = await nextServer.delete<Note>(`/notes/${id}`, {
    // headers: {
    //   Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
    // },
  });
  return response.data;
}
export async function fetchNoteById(id: string): Promise<Note> {
  const response = await nextServer.get<Note>(`/notes/${id}`, {
    // headers: {
    //   Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
    // },
  });
  return response.data;
}
export type RegisterRequest = {
  email: string;
  password: string;
  userName: string;
};

export async function register(data: RegisterRequest) {
  const res = await nextServer.post<User>("/auth/register", data);
  return res.data;
}

export type LoginRequest = {
  email: string;
  password: string;
};
export async function login(data: LoginRequest) {
  const res = await nextServer.post<User>("/auth/login", data);
  return res.data;
}
export async function logout(): Promise<void> {
  await nextServer.post("/auth/logout");
}

type CheckSessionRequest = {
  success: boolean;
};
export async function checkSession() {
  const res = await nextServer.get<CheckSessionRequest>("/auth/session");
  return res.data.success;
}
export async function getMe() {
  const { data } = await nextServer.get<User>("/users/me");
  return data;
}
export async function updateMe(data: { username: string }): Promise<User>{
   const res = await nextServer.patch("/users/me", data);
  return res.data;
}
