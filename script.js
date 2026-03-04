(function () {
  // Year
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  // Mobile nav
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.getElementById("site-nav");

  function setExpanded(v) {
    if (toggle) toggle.setAttribute("aria-expanded", v ? "true" : "false");
  }

  toggle?.addEventListener("click", () => {
    const isOpen = nav?.classList.toggle("open");
    setExpanded(Boolean(isOpen));
  });

  nav?.querySelectorAll("a").forEach((a) => {
    a.addEventListener("click", () => {
      nav.classList.remove("open");
      setExpanded(false);
    });
  });

  // Theme toggle
  const root = document.documentElement;
  const themeBtn = document.getElementById("theme-toggle");
  const themeEmoji = themeBtn?.querySelector(".theme-emoji");

  function applyTheme(t) {
    root.setAttribute("data-theme", t);
    if (themeEmoji) themeEmoji.textContent = t === "dark" ? "🌙" : "☀️";
    try { localStorage.setItem("theme", t); } catch (_) {}
  }

  let saved = null;
  try { saved = localStorage.getItem("theme"); } catch (_) {}
  const prefersDark =
    window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
  applyTheme(saved || (prefersDark ? "dark" : "light"));

  themeBtn?.addEventListener("click", () => {
    const current = root.getAttribute("data-theme") || "dark";
    applyTheme(current === "dark" ? "light" : "dark");
  });

  // Reveal on scroll
  const reveals = Array.from(document.querySelectorAll(".reveal"));
  const io = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (e.isIntersecting) {
          e.target.classList.add("in");
          io.unobserve(e.target);
        }
      }
    },
    { threshold: 0.12 }
  );
  reveals.forEach((el) => io.observe(el));

  // Search filter
  const searchInput = document.getElementById("site-search");
  const clearBtn = document.getElementById("search-clear");
  const emptyState = document.getElementById("search-empty");
  const searchable = Array.from(document.querySelectorAll(".searchable"));

  function norm(s) {
    return (s || "")
      .toString()
      .toLowerCase()
      .normalize("NFD")
      .replace(/\p{Diacritic}/gu, "");
  }

  function runSearch(qRaw) {
    const q = norm(qRaw).trim();
    let visibleCount = 0;

    searchable.forEach((el) => {
      const hay = norm(el.getAttribute("data-keywords") || el.textContent || "");
      const show = !q || hay.includes(q);
      el.style.display = show ? "" : "none";
      if (show) visibleCount++;
    });

    if (emptyState) emptyState.hidden = (q === "" || visibleCount > 0);
  }

  searchInput?.addEventListener("input", (e) => runSearch(e.target.value));
  clearBtn?.addEventListener("click", () => {
    if (!searchInput) return;
    searchInput.value = "";
    searchInput.focus();
    runSearch("");
  });

  // Contact form -> mailto (static friendly)
  const form = document.getElementById("contact-form");
  const status = document.getElementById("form-status");
  const TO = "TSLtestes@gmail.com";

  form?.addEventListener("submit", (e) => {
    e.preventDefault();

    const fd = new FormData(form);
    const name = String(fd.get("name") || "").trim();
    const email = String(fd.get("email") || "").trim();
    const subject = String(fd.get("subject") || "").trim();
    const message = String(fd.get("message") || "").trim();

    const mailSubject = encodeURIComponent(subject || "Pedido de contacto (TSL)");
    const body = encodeURIComponent(
      `Nome: ${name}\nEmail: ${email}\n\nMensagem:\n${message}\n`
    );

    window.location.href = `mailto:${TO}?subject=${mailSubject}&body=${body}`;
    if (status) status.textContent = "A abrir o teu cliente de email…";
  });

  // Copy email
  const copyBtn = document.getElementById("copy-email");
  copyBtn?.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(TO);
      if (status) status.textContent = "Email copiado: " + TO;
    } catch (_) {
      if (status) status.textContent = "Não foi possível copiar. Email: " + TO;
    }
  });

  // Gallery lightbox
  const lightbox = document.getElementById("lightbox");
  const lbImg = document.getElementById("lightbox-img");
  const lbClose = document.getElementById("lightbox-close");
  const gallery = document.getElementById("gallery");

  function openLightbox(src, alt) {
    if (!lightbox || !lbImg) return;
    lbImg.src = src;
    lbImg.alt = alt || "";
    lightbox.classList.add("open");
    lightbox.setAttribute("aria-hidden", "false");
  }
  function closeLightbox() {
    if (!lightbox) return;
    lightbox.classList.remove("open");
    lightbox.setAttribute("aria-hidden", "true");
  }

  gallery?.querySelectorAll("img").forEach((img) => {
    img.addEventListener("click", () => {
      const full = img.getAttribute("data-full") || img.getAttribute("src");
      openLightbox(full, img.getAttribute("alt") || "");
    });
  });

  lbClose?.addEventListener("click", closeLightbox);
  lightbox?.addEventListener("click", (e) => {
    if (e.target === lightbox) closeLightbox();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeLightbox();
  });
})();