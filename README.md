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

## GitHub repository

```bash
git remote set-url origin https://github.com/DelatyLabs/delatylabs-website.git
git push origin main
```

## Contact form

The contact form posts to FormSubmit and delivers inquiries to
`hello@delatylabs.com`. The first test submission sends an activation message to
that inbox; approve it once to begin receiving form submissions. Spam filtering,
a honeypot field, reply-to handling, and an automatic acknowledgement are enabled.

## Analytics

The site includes consent-aware Google Analytics 4 tracking for page views,
traffic sources, geography, project and outbound links, navigation, contact
links, portfolio filters, and completed contact inquiries.

Create a GA4 property and web data stream for `https://delatylabs.com`, then
paste the `G-...` Measurement ID into `js/analytics-config.js`. Analytics loads
only after a visitor allows it in the on-site preference prompt.
