"use client";

import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Toaster } from "sonner";
import { ThemeProvider } from "@/components/providers/ThemeProvider";

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      {children}
      <Toaster
        position="bottom-center"
        toastOptions={{
          classNames: {
            toast:
              "border border-[var(--surface-border)] bg-[var(--surface-bg-elevated)] text-[var(--surface-text)] font-ui shadow-lg",
          },
        }}
        richColors
        closeButton
      />
      <Analytics />
      <SpeedInsights />
    </ThemeProvider>
  );
}
