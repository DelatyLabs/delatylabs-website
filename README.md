# DelatyLabs Website

The official company website for **DelatyLabs** — a software studio building web,
mobile, and TV applications. Built with plain HTML, CSS, and JavaScript (no build
tools required).

## Pages

| File             | Page      |
| ---------------- | --------- |
| `index.html`     | Home      |
| `about.html`     | About     |
| `services.html`  | Services  |
| `portfolio.html` | Portfolio |
| `contact.html`   | Contact   |

## Project structure

```
delatylabs-website/
├── index.html
├── about.html
├── services.html
├── portfolio.html
├── contact.html
├── css/
│   └── styles.css
├── js/
│   └── main.js
├── assets/          # Delaty Labs logo, favicon, touch icon, and images
├── CNAME            # custom domain for GitHub Pages
└── README.md
```

## Run locally

No build step needed. Either:

- Open `index.html` directly in your browser, **or**
- Serve the folder (recommended, so paths behave like production):

```bash
# Python 3
python3 -m http.server 8000
# then open http://localhost:8000
```

## Deploy

### Option A — GitHub Pages (free)

1. Push this repo to GitHub (see below).
2. On GitHub: **Settings → Pages**.
3. Under **Build and deployment**, set **Source: Deploy from a branch**, branch
   `main`, folder `/ (root)`, then **Save**.
4. The included `CNAME` file wires up the custom domain `delatylabs.com`.
5. Add DNS records at your registrar (Porkbun) — see below.

### Option B — Netlify / Cloudflare Pages (free)

1. Connect the GitHub repo (no build command; publish directory = root).
2. Add `delatylabs.com` as a custom domain in the dashboard.
3. Follow the DNS records they provide.

## DNS at Porkbun (for GitHub Pages)

In **Porkbun → delatylabs.com → DNS Records**, add:

| Type  | Host  | Value                   |
| ----- | ----- | ----------------------- |
| A     | (root/`@`) | 185.199.108.153    |
| A     | (root/`@`) | 185.199.109.153    |
| A     | (root/`@`) | 185.199.110.153    |
| A     | (root/`@`) | 185.199.111.153    |
| CNAME | `www` | `<your-username>.github.io` |

DNS changes can take a few minutes to a couple of hours to propagate. HTTPS is
issued automatically once DNS resolves.

## Push to GitHub

```bash
git remote add origin https://github.com/<your-username>/delatylabs-website.git
git branch -M main
git push -u origin main
```

## Connecting the contact form

The contact form is front-end only right now. To receive submissions without a
backend, point it at a form service such as [Formspree](https://formspree.io) or
[Netlify Forms](https://docs.netlify.com/forms/setup/):

```html
<form class="form" action="https://formspree.io/f/your-id" method="POST">
```

Then remove the demo `e.preventDefault()` handler in `js/main.js`.
