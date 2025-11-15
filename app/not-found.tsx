import type { Metadata } from "next";
import css from "./notFound.module.css";

export const metadata: Metadata = {
  title: "Page wasn't found",
  description: "Sorry, the page you are looking for does not exist.",
  openGraph: {
    title: "Page wasn't found",
    description: "Sorry, the page you are looking for does not exist.",
    url: "https://08-zustand-six-omega.vercel.app/",
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        width: 1200,
        height: 630,
        alt: "NoteHub",
      },
    ],
    type: "article",
  },
};

export default function NotFound() {
  return (
    <>
      <h1 className={css.title}>404 - Page not found</h1>
      <p className={css.description}>
        Sorry, the page you are looking for does not exist.
      </p>
    </>
  );
}
