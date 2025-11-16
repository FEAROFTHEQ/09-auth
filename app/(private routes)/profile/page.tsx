import Link from "next/link";
import type { Metadata } from "next";
import css from "./ProfilePage.module.css";
import Image from "next/image";
import { getMe } from "@/lib/api/serverApi";

export const metadata: Metadata = {
  title: "Profile page",
  description: "This page shows your profile and helps to easily manage it.",
  openGraph: {
    title: "Profile page",
    description: "This page shows your profile and helps to easily manage it.",
    url: "https://09-auth-jszo.vercel.app/",
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        width: 1200,
        height: 630,
        alt: "Profile page",
      },
    ],
    type: "article",
  },
};

export default async function ProfilePage() {
  const user = await getMe();
  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <div className={css.header}>
          <h1 className={css.formTitle}>Profile Page</h1>
          <Link href="" className={css.editProfileButton}>
            Edit Profile
          </Link>
        </div>
        <div className={css.avatarWrapper}>
          <Image
            src="Avatar"
            alt="User Avatar"
            width={120}
            height={120}
            className={css.avatar}
          />
        </div>
        <div className={css.profileInfo}>
          <p>Username: {user.username}</p>
          <p>Email: {user.email}</p>
        </div>
      </div>
    </main>
  );
}
