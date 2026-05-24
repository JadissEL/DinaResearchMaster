/**
 * Design constants extracted from docs/reference-ux-scrape/*.json
 * Sources: Volume10, Apple, New Yorker, Wealthsimple, TGI Fridays
 */

export const REF = {
  volume10: {
    gray: "#e6e4e4",
    green: "#008000",
    orange: "#f05733",
    pink: "#d987d8",
    beige: "#e3c9ab",
    black: "#000000",
    h1Size: "3.5rem", // 56px
    labelSize: "0.7rem", // 11.2px CASE STUDY
    cardTitleSize: "1.2rem", // 19.2px
  },
  newYorker: {
    h1Size: "2.625rem", // 42px
    sectionTitleSize: "1.75rem", // 28px Today's Mix
    articleTitleSize: "1.375rem", // 22px
    slate: "#4a5568",
    border: "#e2e8f0",
  },
  wealthsimple: {
    bg: "#fcfcfc",
    text: "#32302f",
    muted: "#686664",
    displaySize: "8rem", // 128px trust headlines
    heroSize: "4rem", // 64px
  },
  apple: {
    text: "#1d1d1f",
    muted: "#6e6e73",
    tileBg: "#fafafc",
    navSize: "0.75rem", // 12px section labels
  },
  fridays: {
    red: "#df271d",
    heroHeight: "100vh",
  },
} as const;

export const NAV_TAXONOMY = [
  { href: "/intelligence", label: "The Latest" },
  { href: "/topics", label: "Topics" },
  { href: "/research", label: "Research" },
  { href: "/discussions", label: "Discussions" },
] as const;
