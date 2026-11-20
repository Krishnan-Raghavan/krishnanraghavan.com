# Deploying krishnanraghavan.com

Hosted on Cloudflare Workers (static assets), built from this repo.

- `public/` is the site. Only this folder is published.
- `wrangler.jsonc` sets the assets directory, the custom 404, and turns off workers.dev and preview URLs.
- Every push to `main` triggers a build. Build command: empty. Deploy command: `npx wrangler deploy`.
- Domain: `krishnanraghavan.com` and `www` are attached as custom domains on the Worker. DNS is managed at Cloudflare (nameservers set at Namecheap). Don't delete the MX and TXT records: they are Namecheap email forwarding.

## Adding a blog post
1. Copy `public/blog/post-template.html` to `public/blog/your-post-slug.html` and write the post.
2. Add one `<li>` to the list in `public/blog/index.html`, newest first.
3. Commit and push.

## Pages
`index`, `about`, `projects`, `services`, `contact` are the main pages. `bucket-list` and `travelogue` are linked from About only; add them to the nav once they have entries.
