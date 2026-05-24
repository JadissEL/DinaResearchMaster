"use client";

import { ReactLenis } from "lenis/react";
import { useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

export function SmoothScrollProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const prefersReducedMotion = useReducedMotion();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Defer Lenis until after hydration — root mode mutates <html> inline styles.
  if (!mounted || prefersReducedMotion) {
    return <>{children}</>;
  }

  return (
    <ReactLenis root options={{ lerp: 0.08, smoothWheel: true }}>
      {children}
    </ReactLenis>
  );
}
