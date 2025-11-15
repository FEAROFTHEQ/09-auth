"use client";

import { useRouter } from "next/navigation";

import css from "./NoteForm.module.css";
import * as Yup from "yup";
import { useId, useState } from "react";
import type { NoteFormValues, NoteTag } from "../../types/note";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { createNote } from "../../lib/api";
import { useNoteStore } from "@/lib/store/noteStore";

const NoteFormSchema = Yup.object().shape({
  title: Yup.string()
    .min(3, "Title must be at least 3 characters")
    .max(50, "Title is too long")
    .required("Title is required"),
  content: Yup.string().max(500, "Content is too long!").optional(),
  tag: Yup.string<NoteTag>().required(),
});

export default function NoteForm() {
  // const { note, setDraft } = useNoteStore();
  const draft = useNoteStore((state) => state.draft);
  const setDraft = useNoteStore((state) => state.setDraft);
  const clearDraft = useNoteStore((state) => state.clearDraft);
  const queryClient = useQueryClient();
  const id = useId();
  // const [title, setTitle] = useState("");
  // const [content, setContent] = useState("");
  // const [tag, setTag] = useState<NoteTag>("Personal");
  const [error, setError] = useState<
    Partial<Record<keyof NoteFormValues, string>>
  >({});
  const router = useRouter();

  const mutateSubmit = useMutation({
    mutationFn: async (values: NoteFormValues) => {
      const res = await createNote(values);
      return res;
    },
    onSuccess: async (data) => {
      clearDraft();
      setError({});
      toast.success(`Successfully created note "${data.title}"!`);

      await queryClient.refetchQueries({ queryKey: ["notes"] });
      // setTitle("");
      // setContent("");
      router.push("/notes/filter/all");
    },
    onError: (error) => {
      setError({});
      toast.error(error.message, {
        position: "top-left",
      });
    },
  });
  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setDraft({
      ...draft,
      [event.target.name]: event.target.value,
    });
  };

  async function handleSubmit(formData: FormData) {
    setError({});

    const title = formData.get("title") as string;
    const content = formData.get("content") as string;
    const tag = formData.get("tag") as NoteTag;
    try {
      await NoteFormSchema.validate(
        { title, content, tag },
        { abortEarly: false }
      );
      mutateSubmit.mutate({ title, content, tag });
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const fieldErrors: Partial<Record<keyof NoteFormValues, string>> = {};
        err.inner.forEach((e) => {
          if (e.path) {
            fieldErrors[e.path as keyof NoteFormValues] = e.message;
          }
        });
        setError(fieldErrors);
      }
    }
  }

  function handleCancel() {
    router.push("/notes/filter/all");
  }
  return (
    <form className={css.form} action={handleSubmit}>
      <div className={css.formGroup}>
        <label htmlFor={`title-${id}`}>Title</label>
        <input
          id={`title-${id}`}
          type="text"
          name="title"
          className={css.input}
          defaultValue={draft?.title}
          onChange={handleChange}
        />
        {error.title && <span className={css.error}>{error.title}</span>}
      </div>

      <div className={css.formGroup}>
        <label htmlFor={`content-${id}`}>Content</label>
        <textarea
          id={`content-${id}`}
          name="content"
          rows={8}
          className={css.textarea}
          defaultValue={draft?.content}
          onChange={handleChange}
        />
        {error.content && <span className={css.error}>{error.content}</span>}
      </div>

      <div className={css.formGroup}>
        <label htmlFor={`tag-${id}`}>Tag</label>
        <select
          id={`tag-${id}`}
          name="tag"
          className={css.select}
          value={draft?.tag}
          onChange={handleChange}
        >
          <option value="Todo">Todo</option>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
          <option value="Meeting">Meeting</option>
          <option value="Shopping">Shopping</option>
        </select>
        {error.tag && <span className={css.error}>{error.tag}</span>}
      </div>

      <div className={css.actions}>
        <button
          type="button"
          className={css.cancelButton}
          onClick={handleCancel}
        >
          Cancel
        </button>
        <button type="submit" className={css.submitButton} disabled={false}>
          {mutateSubmit.isPending ? "Creating note..." : "Create note"}
        </button>
      </div>
    </form>
  );
}
