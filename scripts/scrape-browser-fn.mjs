/**
 * Browser-side scrape function (plain JS — must run inside page.evaluate).
 * Kept separate so tsx/esbuild does not inject __name helpers.
 */
export const SCRAPE_FN = () => {
  const pickStyles = (el) => {
    const s = getComputedStyle(el);
    return {
      fontSize: s.fontSize,
      fontFamily: s.fontFamily,
      color: s.color,
      backgroundColor: s.backgroundColor,
      borderRadius: s.borderRadius,
      padding: s.padding,
      letterSpacing: s.letterSpacing,
      lineHeight: s.lineHeight,
      fontWeight: s.fontWeight,
    };
  };

  const navLinks = Array.from(
    document.querySelectorAll("header a, nav a, [role='navigation'] a"),
  )
    .slice(0, 20)
    .map((a) => ({
      text: (a.textContent || "").trim().slice(0, 80),
      href: a.href,
    }))
    .filter((l) => l.text.length > 0);

  const headings = Array.from(document.querySelectorAll("h1, h2, h3"))
    .slice(0, 15)
    .map((h) => {
      const st = pickStyles(h);
      return {
        level: h.tagName.toLowerCase(),
        text: (h.textContent || "").trim().replace(/\s+/g, " ").slice(0, 120),
        fontSize: st.fontSize,
        fontFamily: st.fontFamily,
        color: st.color,
        fontWeight: st.fontWeight,
        letterSpacing: st.letterSpacing,
        lineHeight: st.lineHeight,
      };
    });

  const buttons = Array.from(
    document.querySelectorAll(
      "button, a[class*='button'], a[class*='btn'], [class*='cta']",
    ),
  )
    .slice(0, 12)
    .map((b) => {
      const st = pickStyles(b);
      return {
        text: (b.textContent || "").trim().slice(0, 60),
        bg: st.backgroundColor,
        color: st.color,
        borderRadius: st.borderRadius,
        fontSize: st.fontSize,
      };
    })
    .filter((b) => b.text.length > 0);

  const fontSet = new Set();
  const colorSet = new Set();
  document.querySelectorAll("*").forEach((el, i) => {
    if (i > 500) return;
    const s = getComputedStyle(el);
    if (s.fontFamily)
      fontSet.add(s.fontFamily.split(",")[0].replace(/['"]/g, ""));
    if (s.color && s.color !== "rgba(0, 0, 0, 0)") colorSet.add(s.color);
    if (s.backgroundColor && s.backgroundColor !== "rgba(0, 0, 0, 0)")
      colorSet.add(s.backgroundColor);
  });

  const sections = Array.from(
    document.querySelectorAll(
      "section, main > div, [class*='section'], [class*='hero']",
    ),
  )
    .slice(0, 12)
    .map((el) => {
      const r = el.getBoundingClientRect();
      return {
        tag: el.tagName.toLowerCase(),
        className: (el.className?.toString() || "").slice(0, 100),
        rect: {
          width: Math.round(r.width),
          height: Math.round(r.height),
          top: Math.round(r.top + window.scrollY),
        },
      };
    })
    .filter((s) => s.rect.height > 80);

  const body = pickStyles(document.body);
  const header = document.querySelector(
    "header, nav, [class*='header'], [class*='nav']",
  );
  const headerRect = header?.getBoundingClientRect();
  const headerStyle = header ? getComputedStyle(header) : null;
  const main = document.querySelector("main, [role='main'], #main, .main");
  const mainRect = main?.getBoundingClientRect();

  return {
    title: document.title,
    metaDescription:
      document.querySelector('meta[name="description"]')?.getAttribute("content") ??
      null,
    themeColor:
      document.querySelector('meta[name="theme-color"]')?.getAttribute("content") ??
      null,
    fonts: [...fontSet].slice(0, 20),
    colors: [...colorSet].slice(0, 30),
    navLinks,
    headings,
    buttons,
    sections,
    layout: {
      bodyBg: body.backgroundColor,
      bodyColor: body.color,
      bodyFont: body.fontFamily,
      maxContentWidth: mainRect ? Math.round(mainRect.width) : null,
      hasStickyHeader:
        headerStyle?.position === "sticky" || headerStyle?.position === "fixed",
      headerHeight: headerRect ? Math.round(headerRect.height) : null,
    },
    interactions: {
      linkCount: document.querySelectorAll("a").length,
      buttonCount: document.querySelectorAll("button").length,
      hasVideo: !!document.querySelector("video"),
      hasCarousel: !!document.querySelector(
        "[class*='carousel'], [class*='swiper'], [class*='slider'], [class*='slick']",
      ),
      scrollHeight: document.documentElement.scrollHeight,
    },
  };
};
