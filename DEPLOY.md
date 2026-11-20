# Deploying krishnanraghavan.com (Cloudflare Pages)

## 1. Create a Cloudflare account

Skip this if you already made one for Kaizen Studio or Pomodojo — one account covers all three.

## 2. Add the domain to Cloudflare

1. Cloudflare dashboard → "Add a site" → enter `krishnanraghavan.com`.
2. Pick the Free plan.
3. Cloudflare scans and imports your existing Namecheap DNS records automatically. Check the list it shows you before continuing — make sure nothing looks missing.
4. Cloudflare gives you two nameservers (something like `xxx.ns.cloudflare.com`).

## 3. Point Namecheap at Cloudflare

In Namecheap: Domain List → Manage → Nameservers → switch from "Namecheap BasicDNS" to "Custom DNS" → enter the two Cloudflare nameservers.

This is the one step with a wait — usually minutes, sometimes a few hours. Cloudflare's dashboard will show the zone as "Active" once it's done. Don't touch the Pages custom-domain step until it says Active.

## 4. Push the site to GitHub

```bash
cd site
git init
git add .
git commit -m "Initial site"
git branch -M main
git remote add origin https://github.com/Krishnan-Raghavan/<repo-name>.git
git push -u origin main
```

## 5. Create the Cloudflare Pages project

1. Cloudflare dashboard → Workers & Pages → Create → Pages → Connect to Git.
2. Select the repo you just pushed.
3. Build settings: no build command, no framework preset — this is plain static HTML. Set the output directory to `/` (the repo root).
4. Deploy. You'll get a `*.pages.dev` URL first — check it loads before touching the custom domain.

## 6. Attach the custom domain

In the Pages project → Custom domains → Set up a custom domain → enter `krishnanraghavan.com`. Since the domain is now a Cloudflare zone (step 2–3), Cloudflare configures the DNS record for you automatically — no manual CNAME needed for the apex domain.

## 7. Before you call it done

- [ ] Contact page currently has no email — add one back once you've set up a real inbox
- [ ] Sanity-check the Services and Projects copy — it's drafted from what I know of your work, not dictated by you
- [ ] Favicon is `favicon.svg` (teal node mark). Swap the file if you want a different one; every page already links to it.

## What's in the folder

Everything is plain static files — no build step, nothing to install.

| File | Purpose |
| --- | --- |
| `index.html`, `about.html`, `projects.html`, `services.html`, `contact.html` | The pages |
| `bucket-list.html`, `travelogue.html` | Personal pages, linked from About only. Add them to the nav once they have entries |
| `blog/index.html` | Post list (empty until the first post) |
| `blog/post-template.html` | Copy this to start a post; the writing guide is in a comment at the top |
| `style.css` | The one shared stylesheet |
| `theme.js` | Dark/light theme: follows the system, remembers a toggle in localStorage |
| `favicon.svg` | Browser-tab icon |
| `404.html` | Cloudflare Pages serves this automatically for unknown URLs (links in it are root-relative, so it works from any path) |

Fonts (Literata and JetBrains Mono) load from Google Fonts via a `<link>` in each page's `<head>`; nothing to host.

## Adding a blog post later

1. Copy `blog/post-template.html` to `blog/your-post-slug.html`.
2. Write the post.
3. Add one `<li>` to the empty `<ul class="rows">` in `blog/index.html`, linking to the new file.
