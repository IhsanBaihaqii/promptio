const app = document.querySelector("#app");
const header = document.querySelector("[data-header]");
const navPanel = document.querySelector("[data-nav-panel]");
const navToggle = document.querySelector("[data-nav-toggle]");
const toast = document.querySelector("[data-toast]");

const imageBase = "https://images.unsplash.com";

const prompts = [
  {
    title: "Cinematic Street Portrait",
    category: "Portrait",
    upload: "2026-07-07",
    isPro: true,
    img: `${imageBase}/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=900&q=88`,
    prompt:
      "Ultra realistic cinematic street portrait, soft neon rim light, 85mm lens, shallow depth of field, natural skin texture, rain-kissed asphalt, editorial color, professional film still.",
  },
  {
    title: "Cyberpunk Night Runner",
    category: "Cyberpunk",
    upload: "2026-07-09",
    isPro: false,
    img: `${imageBase}/photo-1519608487953-e999c86e7455?auto=format&fit=crop&w=900&q=88`,
    prompt:
      "Futuristic cyberpunk runner under electric city signage, reflective jacket, atmospheric fog, high contrast lighting, sharp facial detail, premium AI photography, cinematic realism.",
  },
  {
    title: "Luxury Fashion Editorial",
    category: "Fashion",
    upload: "2026-07-11",
    isPro: true,
    img: `${imageBase}/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=900&q=88`,
    prompt:
      "High-fashion editorial portrait, structured black outfit, studio spotlight, confident pose, magazine-grade retouching, crisp fabric detail, luxurious minimalist set, 8k photography.",
  },
  {
    title: "Hypercar Rain Studio",
    category: "Automotive",
    upload: "2026-07-14",
    isPro: true,
    img: `${imageBase}/photo-1542362567-b07e54358753?auto=format&fit=crop&w=1000&q=88`,
    prompt:
      "Premium hypercar product photo in dark wet studio, controlled reflections, cyan edge lighting, dramatic shadows, low angle, ultra sharp commercial automotive photography.",
  },
  {
    title: "Anime City Glow",
    category: "Anime",
    upload: "2026-07-16",
    isPro: false,
    img: `${imageBase}/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=88`,
    prompt:
      "Anime-inspired city balcony at blue hour, luminous skyline, expressive character styling, soft cinematic atmosphere, premium composition, polished visual novel frame.",
  },
  {
    title: "Alpine Film Landscape",
    category: "Landscape",
    upload: "2026-07-18",
    isPro: true,
    img: `${imageBase}/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1100&q=88`,
    prompt:
      "Epic alpine landscape at sunrise, clean cold air, long lens compression, cinematic haze, realistic terrain texture, professional travel photography, calm premium mood.",
  },
  {
    title: "Midnight Product Launch",
    category: "Product",
    upload: "2026-07-20",
    isPro: true,
    img: `${imageBase}/photo-1560472354-b33ff0c44a43?auto=format&fit=crop&w=1000&q=88`,
    prompt:
      "Luxury tech product on black acrylic surface, precise specular highlights, blue accent edge light, premium commercial campaign, sharp detail, minimal futuristic composition.",
  },
  {
    title: "Viral Food Closeup",
    category: "Lifestyle",
    upload: "2026-07-21",
    isPro: false,
    img: `${imageBase}/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=900&q=88`,
    prompt:
      "Viral food photography closeup, crisp texture, dramatic side lighting, shallow depth of field, appetizing editorial styling, high retention social media visual.",
  },
  {
    title: "Executive AI Headshot",
    category: "Professional",
    upload: "2026-07-23",
    isPro: true,
    img: `${imageBase}/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=900&q=88`,
    prompt:
      "Professional executive AI headshot, clean dark studio, trustworthy expression, premium corporate lighting, realistic facial detail, polished LinkedIn-ready portrait.",
  },
];

const gallery = [
  ["vc-portrait", "Portrait", prompts[0].img],
  ["vc-cinematic", "Cinematic", `${imageBase}/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1200&q=88`],
  ["vc-cyber", "Cyberpunk", prompts[1].img],
  ["vc-fashion", "Fashion", prompts[2].img],
  ["vc-auto", "Automotive", prompts[3].img],
  ["vc-anime", "Anime", `${imageBase}/photo-1526498460520-4c246339dccb?auto=format&fit=crop&w=900&q=88`],
  ["vc-landscape", "Landscape", prompts[5].img],
  ["vc-product", "Product", prompts[6].img],
];

const routes = {
  "/": renderHome,
  "/home": renderHome,
  "/prompt": renderPromptPage,
  "/prompts": renderPromptPage,
  "/pricing": renderPricing,
  "/profile": renderProfile,
  "/login": renderLogin,
};

const protectedRoutes = new Set(["/prompt", "/prompts", "/profile"]);

function isLoggedIn() {
  return localStorage.getItem("promptio.auth") === "true";
}

function setLoggedIn(value) {
  if (value) {
    localStorage.setItem("promptio.auth", "true");
  } else {
    localStorage.removeItem("promptio.auth");
  }
  updateLoginAction();
}

function navigate(path, options = {}) {
  const normalized = normalizePath(path);
  if (protectedRoutes.has(normalized) && !isLoggedIn()) {
    showToast("Silakan login dulu untuk mengakses halaman premium Promptio.");
    history.pushState({ from: normalized }, "", `/login?next=${encodeURIComponent(normalized)}`);
    renderRoute();
    return;
  }

  if (location.pathname + location.search !== normalized) {
    history.pushState({}, "", normalized);
  }
  renderRoute(options);
}

function normalizePath(path) {
  const url = new URL(path, location.origin);
  const clean = url.pathname.replace(/\/+$/, "") || "/";
  return clean;
}

function renderRoute(options = {}) {
  const path = normalizePath(location.pathname);
  const renderer = routes[path] || renderNotFound;

  if (protectedRoutes.has(path) && !isLoggedIn()) {
    history.replaceState({ from: path }, "", `/login?next=${encodeURIComponent(path)}`);
    renderLogin();
    return;
  }

  closeMenu();
  renderer(options);
  updateActiveNav();
  updateLoginAction();
  bindCommonActions();
  protectImages();
  revealOnScroll();
  app.focus({ preventScroll: true });
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function renderHome() {
  app.innerHTML = `
    <section class="hero">
      <div class="shell hero-grid">
        <div class="hero-copy reveal">
          <span class="eyebrow"><span class="eyebrow-dot"></span>@promptio.id</span>
          <h1>Turn Ordinary Photos Into Extraordinary Visuals.</h1>
          <p>Promptio mengkurasi prompt AI premium untuk membantu kreator menghasilkan foto sinematik, realistis, estetik, profesional, dan siap viral.</p>
          <div class="hero-actions">
            <a class="primary-button" href="/prompt" data-link data-protected-link>
              ${icon("sparkles")}
              Explore Prompts
            </a>
            <a class="secondary-button" href="/pricing" data-link>
              ${icon("crown")}
              Join Pro
            </a>
          </div>
          <div class="hero-stats" aria-label="Statistik Promptio">
            <div class="stat-tile">
              <strong>1.2K+</strong>
              <span>Prompt foto premium siap pakai.</span>
            </div>
            <div class="stat-tile">
              <strong>28</strong>
              <span>Kategori visual profesional.</span>
            </div>
            <div class="stat-tile">
              <strong>2026</strong>
              <span>Style trend AI photo terbaru.</span>
            </div>
          </div>
        </div>
        <div class="gallery-wrap reveal">
          <div class="gallery-shell" aria-label="Galeri inspirasi visual Promptio">
            ${gallery
              .map(
                ([className, label, img]) => `
                  <figure class="visual-card ${className}">
                    <img src="${img}" alt="${label} AI photo prompt preview" draggable="false" loading="lazy" />
                    <span>${label}</span>
                  </figure>
                `
              )
              .join("")}
          </div>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="shell">
        <div class="section-heading reveal">
          <div>
            <h2>Built for cinematic AI creators.</h2>
            <p>Setiap prompt dibuat untuk workflow cepat: copy, generate, refine, lalu publikasikan visual yang terasa mahal.</p>
          </div>
        </div>
        <div class="feature-grid">
          ${featureCard("aperture", "Cinematic Results", "Hasil foto berkualitas premium dengan rasa film still, editorial, dan commercial campaign.")}
          ${featureCard("copy", "Ready To Use", "Copy prompt dan langsung generate tanpa perlu menyusun ulang struktur prompt dari nol.")}
          ${featureCard("trending", "Trending Styles", "Koleksi gaya visual terus mengikuti tren AI photo terbaru untuk kreator modern.")}
          ${featureCard("infinity", "Unlimited Creativity", "Ribuan inspirasi prompt untuk portrait, fashion, product, landscape, dan konten viral.")}
        </div>
      </div>
    </section>

    <section class="section">
      <div class="shell">
        <div class="section-heading reveal">
          <div>
            <h2>Prompt preview.</h2>
            <p>Home menampilkan tiga prompt pilihan. Masuk ke halaman Prompt untuk membuka seluruh koleksi.</p>
          </div>
          <a class="secondary-button" href="/prompt" data-link data-protected-link>
            ${icon("grid")}
            Lihat Semua
          </a>
        </div>
        <div class="prompt-grid">
          ${prompts.slice(0, 3).map(promptCard).join("")}
        </div>
      </div>
    </section>
  `;
}

function renderPromptPage() {
  app.innerHTML = `
    <section class="page">
      <div class="shell">
        <div class="section-heading compact reveal">
          <div>
            <span class="eyebrow"><span class="eyebrow-dot"></span>Prompt Library</span>
            <h1>All premium prompts.</h1>
            <p>Search realtime berdasarkan judul, isi prompt, atau kategori. Prompt Pro bisa langsung disalin oleh member aktif.</p>
          </div>
        </div>

        <div class="search-shell reveal">
          <label class="search-bar" aria-label="Cari prompt">
            ${icon("search")}
            <input type="search" data-search placeholder="Cari title, prompt, atau category..." autocomplete="off" />
          </label>
        </div>

        <div class="prompt-grid masonry" data-prompt-list>
          ${prompts.map(promptCard).join("")}
        </div>
      </div>
    </section>
  `;

  const search = app.querySelector("[data-search]");
  search.addEventListener("input", () => {
    const term = search.value.trim().toLowerCase();
    const filtered = prompts.filter((item) =>
      [item.title, item.prompt, item.category].some((value) => value.toLowerCase().includes(term))
    );
    const list = app.querySelector("[data-prompt-list]");
    list.innerHTML = filtered.length
      ? filtered.map(promptCard).join("")
      : `<div class="empty-state"><h2>Tidak ada prompt yang cocok.</h2><p>Coba kata kunci lain seperti cinematic, fashion, product, atau portrait.</p></div>`;
    bindCommonActions();
    protectImages();
    revealOnScroll();
  });
}

function renderPricing() {
  app.innerHTML = `
    <section class="page">
      <div class="shell">
        <div class="section-heading compact reveal">
          <div>
            <span class="eyebrow"><span class="eyebrow-dot"></span>Pro Membership</span>
            <h1>Choose your creative access.</h1>
            <p>Mulai dari preview gratis, lalu upgrade saat kamu siap membuka seluruh prompt premium dan akses copy tanpa batas.</p>
          </div>
        </div>

        <div class="pricing-grid">
          <article class="pricing-card reveal">
            <h3>Free</h3>
            <div class="price">Rp0 <small>/bulan</small></div>
            <p>Cocok untuk eksplorasi awal dan melihat sebagian koleksi Promptio.</p>
            <ul class="feature-list">
              <li><span>View Prompt</span> Limited</li>
              <li><span>Copy Prompt</span> No</li>
              <li><span>New Uploads</span> Delayed</li>
              <li><span>Premium Styles</span> No</li>
            </ul>
          </article>

          <article class="pricing-card featured reveal">
            <h3>Pro</h3>
            <div class="price">Rp49K <small>/bulan</small></div>
            <p>Akses penuh untuk kreator yang butuh prompt siap pakai setiap hari.</p>
            <ul class="feature-list">
              <li><span>View Prompt</span> Unlimited</li>
              <li><span>Copy Prompt</span> Yes</li>
              <li><span>New Uploads</span> Instant</li>
              <li><span>Premium Styles</span> Yes</li>
            </ul>
            <div class="section-actions">
              <button class="primary-button" data-login-now>${icon("crown")}Upgrade Pro</button>
            </div>
          </article>
        </div>

        <div class="comparison reveal" aria-label="Perbandingan membership Promptio">
          <div class="comparison-row head">
            <div>Feature</div>
            <div>Free</div>
            <div>Pro</div>
          </div>
          <div class="comparison-row">
            <div>View Prompt</div>
            <div>Limited</div>
            <div>Unlimited</div>
          </div>
          <div class="comparison-row">
            <div>Copy Prompt</div>
            <div>No</div>
            <div>Yes</div>
          </div>
          <div class="comparison-row">
            <div>New Uploads</div>
            <div>Delayed</div>
            <div>Instant</div>
          </div>
          <div class="comparison-row">
            <div>Premium Styles</div>
            <div>No</div>
            <div>Yes</div>
          </div>
        </div>
      </div>
    </section>
  `;
}

function renderLogin() {
  const params = new URLSearchParams(location.search);
  const next = params.get("next") || "/profile";

  app.innerHTML = `
    <section class="auth-page">
      <div class="shell">
        <article class="auth-card">
          <span class="eyebrow"><span class="eyebrow-dot"></span>Member Access</span>
          <h1>Login to Promptio.</h1>
          <p>Gunakan demo login untuk membuka route premium seperti /prompt dan /profile.</p>
          <form class="form" data-login-form>
            <label class="field">
              ${icon("mail")}
              <input type="email" name="email" placeholder="Email" value="creator@promptio.id" autocomplete="email" required />
            </label>
            <label class="field">
              ${icon("lock")}
              <input type="password" name="password" placeholder="Password" value="promptio" autocomplete="current-password" required />
            </label>
            <button class="primary-button" type="submit">${icon("login")}Login</button>
          </form>
          <div class="auth-note">
            <span>Belum punya akun?</span>
            <button type="button" data-login-now>Buat akses demo</button>
          </div>
        </article>
      </div>
    </section>
  `;

  app.querySelector("[data-login-form]").addEventListener("submit", (event) => {
    event.preventDefault();
    setLoggedIn(true);
    showToast("Login berhasil. Selamat datang di Promptio Pro.");
    navigate(next);
  });
}

function renderProfile() {
  app.innerHTML = `
    <section class="page">
      <div class="shell profile-layout">
        <aside class="profile-card profile-main reveal">
          <div class="avatar" aria-hidden="true">P</div>
          <h1>Promptio Creator</h1>
          <p>creator@promptio.id</p>
          <span class="membership">${icon("crown")}Pro Member</span>
          <div class="section-actions">
            <button class="danger-button" data-logout>${icon("logout")}Logout</button>
          </div>
        </aside>

        <div class="profile-stack">
          <article class="profile-card reveal">
            <h2>Account Information</h2>
            <ul class="account-list">
              <li><span>Username</span><strong>Promptio Creator</strong></li>
              <li><span>Email</span><strong>creator@promptio.id</strong></li>
              <li><span>Instagram & TikTok</span><strong>@promptio.id</strong></li>
            </ul>
          </article>

          <article class="profile-card reveal">
            <h2>Change Password</h2>
            <p>Form password disiapkan sebagai area akun. Integrasi backend bisa ditambahkan saat autentikasi asli tersedia.</p>
            <div class="form">
              <label class="field">${icon("lock")}<input type="password" placeholder="Password baru" /></label>
              <label class="field">${icon("lock")}<input type="password" placeholder="Konfirmasi password" /></label>
              <button class="secondary-button" type="button">${icon("shield")}Update Password</button>
            </div>
          </article>

          <article class="profile-card reveal">
            <h2>Subscription</h2>
            <ul class="account-list">
              <li><span>Membership</span><strong>Pro</strong></li>
              <li><span>Status</span><strong>Active</strong></li>
              <li><span>Expired</span><strong>12 Juli 2027</strong></li>
            </ul>
          </article>
        </div>
      </div>
    </section>
  `;
}

function renderNotFound() {
  app.innerHTML = `
    <section class="auth-page">
      <div class="shell">
        <div class="empty-state">
          <span class="eyebrow"><span class="eyebrow-dot"></span>404</span>
          <h1>Halaman tidak ditemukan.</h1>
          <p>Route yang tersedia: /home, /prompt, /pricing, /profile, dan /login.</p>
          <div class="section-actions">
            <a class="primary-button" href="/home" data-link>${icon("home")}Kembali Home</a>
          </div>
        </div>
      </div>
    </section>
  `;
}

function featureCard(iconName, title, body) {
  return `
    <article class="feature-card reveal">
      <div class="feature-icon">${icon(iconName)}</div>
      <h3>${title}</h3>
      <p>${body}</p>
    </article>
  `;
}

function promptCard(item) {
  const locked = !item.isPro;
  return `
    <article class="prompt-card ${locked ? "locked" : ""} reveal" data-card>
      <div class="image-wrap">
        <img src="${item.img}" alt="${item.title}" draggable="false" loading="lazy" />
        <div class="badge-row">
          <span class="badge ${item.isPro ? "pro" : "free"}">${item.isPro ? "Pro" : "Free Preview"}</span>
          <span class="category-pill">${item.category}</span>
        </div>
      </div>
      ${locked ? `<div class="locked-panel"><span class="lock-badge">${icon("lock")}Locked Prompt</span></div>` : ""}
      <div class="prompt-body">
        <div class="prompt-topline">
          <h3>${item.title}</h3>
          <span class="prompt-meta">${icon("calendar")}${formatDate(item.upload)}</span>
        </div>
        <p class="prompt-copy">${item.prompt}</p>
        <div class="prompt-actions">
          <button class="card-action copy" ${locked ? "disabled" : ""} data-copy="${encodeURIComponent(item.prompt)}">
            ${icon("copy")}
            Copy
          </button>
          <button class="card-action" aria-label="Favorite ${item.title}" data-favorite>${icon("heart")}</button>
          <button class="card-action" aria-label="Share ${item.title}" data-share="${encodeURIComponent(item.title)}">${icon("share")}</button>
        </div>
      </div>
    </article>
  `;
}

function bindCommonActions() {
  document.querySelectorAll("[data-link]").forEach((link) => {
    link.addEventListener("click", (event) => {
      const url = new URL(link.href, location.origin);
      if (url.origin !== location.origin) return;
      event.preventDefault();
      navigate(url.pathname + url.search);
    });
  });

  document.querySelectorAll("[data-copy]").forEach((button) => {
    button.addEventListener("click", async () => {
      const text = decodeURIComponent(button.dataset.copy || "");
      try {
        await navigator.clipboard.writeText(text);
        showToast("Prompt berhasil disalin.");
      } catch {
        showToast("Clipboard tidak tersedia di browser ini.");
      }
    });
  });

  document.querySelectorAll("[data-favorite]").forEach((button) => {
    button.addEventListener("click", () => {
      button.classList.toggle("is-active");
      showToast(button.classList.contains("is-active") ? "Prompt ditambahkan ke favorite." : "Prompt dihapus dari favorite.");
    });
  });

  document.querySelectorAll("[data-share]").forEach((button) => {
    button.addEventListener("click", async () => {
      const title = decodeURIComponent(button.dataset.share || "Promptio prompt");
      const shareData = { title, text: "Lihat prompt premium ini di Promptio.", url: location.href };
      if (navigator.share) {
        await navigator.share(shareData).catch(() => {});
      } else {
        await navigator.clipboard.writeText(location.href).catch(() => {});
        showToast("Link halaman disalin untuk dibagikan.");
      }
    });
  });

  document.querySelectorAll("[data-login-now]").forEach((button) => {
    button.addEventListener("click", () => {
      setLoggedIn(true);
      showToast("Akses demo Pro aktif.");
      navigate("/profile");
    });
  });

  document.querySelectorAll("[data-logout]").forEach((button) => {
    button.addEventListener("click", () => {
      setLoggedIn(false);
      showToast("Logout berhasil.");
      navigate("/home");
    });
  });
}

function protectImages() {
  document.querySelectorAll("img").forEach((img) => {
    img.setAttribute("draggable", "false");
    img.addEventListener("contextmenu", (event) => event.preventDefault());
    img.addEventListener("dragstart", (event) => event.preventDefault());
  });
}

function updateActiveNav() {
  const path = normalizePath(location.pathname);
  document.querySelectorAll(".nav-panel a").forEach((link) => {
    const linkPath = normalizePath(link.getAttribute("href"));
    link.classList.toggle("is-active", linkPath === path || (path === "/prompts" && linkPath === "/prompt"));
  });
}

function updateLoginAction() {
  const action = document.querySelector("[data-login-action]");
  if (!action) return;
  action.textContent = isLoggedIn() ? "Logout" : "Login";
  action.onclick = () => {
    if (isLoggedIn()) {
      setLoggedIn(false);
      showToast("Logout berhasil.");
      navigate("/home");
    } else {
      navigate("/login");
    }
  };
}

function closeMenu() {
  navPanel.classList.remove("is-open");
  navToggle.setAttribute("aria-expanded", "false");
  document.body.classList.remove("no-scroll");
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("is-visible");
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => toast.classList.remove("is-visible"), 2600);
}

function revealOnScroll() {
  const items = document.querySelectorAll(".reveal");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );
  items.forEach((item) => observer.observe(item));
}

function formatDate(dateString) {
  return new Intl.DateTimeFormat("id-ID", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(dateString));
}

function icon(name) {
  const icons = {
    sparkles: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3l1.4 4.4L18 9l-4.6 1.6L12 15l-1.4-4.4L6 9l4.6-1.6L12 3zM19 14l.8 2.2L22 17l-2.2.8L19 20l-.8-2.2L16 17l2.2-.8L19 14zM5 14l.8 2.2L8 17l-2.2.8L5 20l-.8-2.2L2 17l2.2-.8L5 14z"/></svg>',
    crown: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 8l4 4 5-7 5 7 4-4-2 11H5L3 8z"/><path d="M5 19h14"/></svg>',
    grid: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 4h7v7H4zM13 4h7v7h-7zM4 13h7v7H4zM13 13h7v7h-7z"/></svg>',
    aperture: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M14.8 3.6L12 12M21 12h-9M14.8 20.4L12 12M4.2 20.4L12 12M3 12h9M4.2 3.6L12 12"/></svg>',
    copy: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="9" y="9" width="11" height="11" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>',
    trending: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 17l6-6 4 4 8-8"/><path d="M14 7h7v7"/></svg>',
    infinity: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M18.2 8.8c-2.5 0-4.2 3.2-6.2 3.2S8.3 8.8 5.8 8.8A3.7 3.7 0 0 0 2 12.5a3.7 3.7 0 0 0 3.8 3.7c2.5 0 4.2-3.2 6.2-3.2s3.7 3.2 6.2 3.2a3.7 3.7 0 0 0 3.8-3.7 3.7 3.7 0 0 0-3.8-3.7z"/></svg>',
    search: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="M20 20l-3.5-3.5"/></svg>',
    calendar: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>',
    lock: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="4" y="10" width="16" height="10" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/></svg>',
    heart: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 1 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8z"/></svg>',
    share: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="M8.6 10.5l6.8-4M8.6 13.5l6.8 4"/></svg>',
    mail: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/></svg>',
    login: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/><path d="M10 17l5-5-5-5M15 12H3"/></svg>',
    logout: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><path d="M16 17l5-5-5-5M21 12H9"/></svg>',
    shield: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>',
    home: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 11l9-8 9 8"/><path d="M5 10v10h14V10"/><path d="M9 20v-6h6v6"/></svg>',
  };
  return icons[name] || icons.sparkles;
}

window.addEventListener("popstate", renderRoute);

window.addEventListener("scroll", () => {
  header.classList.toggle("is-scrolled", window.scrollY > 16);
});

document.addEventListener("contextmenu", (event) => {
  if (event.target.closest("img, .image-wrap, .visual-card")) {
    event.preventDefault();
  }
});

document.addEventListener("selectstart", (event) => {
  if (event.target.closest("img, .image-wrap, .visual-card")) {
    event.preventDefault();
  }
});

navToggle.addEventListener("click", () => {
  const open = !navPanel.classList.contains("is-open");
  navPanel.classList.toggle("is-open", open);
  navToggle.setAttribute("aria-expanded", String(open));
});

renderRoute();
