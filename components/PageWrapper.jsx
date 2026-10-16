"use client";

import { useState, useCallback } from "react";
import { usePathname } from "next/navigation";
import Preloader from "@/components/Preloader";

// Landings de campaña (QR / anuncios): sin preloader, el formulario debe verse de inmediato
const NO_PRELOADER = ["/mukta"];

export default function PageWrapper({ children }) {
  const pathname = usePathname() || "";
  const skip = NO_PRELOADER.some((p) => pathname === p || pathname.startsWith(`${p}/`));
  const [done, setDone] = useState(skip);

  const handleComplete = useCallback(() => setDone(true), []);

  return (
    <>
      {!done && <Preloader onComplete={handleComplete} />}
      {children}
    </>
  );
}
