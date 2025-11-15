"use client";
import { useRouter } from "next/navigation";
// import { useEffect } from "react";
import css from "./Modal.module.css";
import { useEffect } from "react";

interface ModalProps {
  // onClose: () => void;
  children: React.ReactNode;
}

export default function Modal({ children }: ModalProps) {
  const router = useRouter();
  // function handleClose(event: React.MouseEvent<HTMLDivElement>) {
  //   if (event.target === event.currentTarget) {
  //     onClose();
  //   }
  // }
  function handleClose(event: React.MouseEvent<HTMLDivElement>) {
    if (event.target === event.currentTarget) {
      router.back();
    }
  }

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        router.back();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [router]);

  return (
    <div
      className={css.backdrop}
      role="dialog"
      aria-modal="true"
      onClick={handleClose}
    >
      <div className={css.modal}>{children}</div>
    </div>
  );
}
