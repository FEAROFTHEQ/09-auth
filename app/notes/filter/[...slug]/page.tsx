import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from "@tanstack/react-query";
import NotesClient from "./Notes.client";
import { fetchNotes } from "@/lib/api";
import ALL_NOTES from "@/lib/all";
import { Metadata } from "next";

interface propsFilterPage {
  params: Promise<{ slug: string[] }>;
}

export async function generateMetadata({
  params,
}: propsFilterPage): Promise<Metadata> {
  const { slug } = await params;
  const searchSlug = slug[0] === ALL_NOTES ? undefined : slug[0];
  const metaTitle = searchSlug ? `Notes: ${searchSlug}` : "All notes";
  const metaDescr = searchSlug
    ? `This page contains all of your notes with tag ${searchSlug}`
    : "This page contains all of your notes.";
  return {
    title: metaTitle,
    description: metaDescr,
    openGraph: {
      title: metaTitle,
      description: metaDescr,
      url: `https://08-zustand-six-omega.vercel.app/notes/filter/${
        searchSlug ?? "all"
      }`,
      siteName: metaTitle,
      images: [
        {
          url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
          width: 1200,
          height: 630,
          alt: metaTitle,
        },
      ],
      type: "article",
    },
  };
}

export default async function FilterPage({ params }: propsFilterPage) {
  const { slug } = await params;
  const searchSlug = slug[0] === ALL_NOTES ? undefined : slug[0];
  const query = "";
  const page = 1;
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["notes", query, page],
    queryFn: () => fetchNotes(query, page, searchSlug),
  });
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient />
    </HydrationBoundary>
  );
}
