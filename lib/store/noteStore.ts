import { NoteFormValues } from "@/types/note";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type NoteStore = {
  draft: NoteFormValues;
  setDraft: (note: NoteFormValues) => void;
  clearDraft: () => void;
};

const initialDraft: NoteFormValues = {
  title: "",
  content: "",
  tag: "Personal",
};
export const useNoteStore = create<NoteStore>()(
  persist(
    (set) => ({
      draft: initialDraft,
      setDraft: (note) => set(() => ({ draft: note })),
      clearDraft: () => set(() => ({ draft: initialDraft })),
    }),
    {
      name: "note-draft",
      partialize: (state) => ({ draft: state.draft }),
    }
  )
);
