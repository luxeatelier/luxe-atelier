# Luxe Atelier

Marketing site for Luxe Atelier, built with Next.js (App Router).

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build
npm start       # serve the production build
```

- Pages live in `src/app`; page bodies in `src/views`; page sections in `src/sections`.
- Content data: `src/servicesPage/services.json`, `src/project/projects.json`, `src/team/team_members.json`, `src/blog/blogData.json`, `src/faq/faqData.json`, `src/home/peopleThoughts.json`.
- Site-wide SEO settings (URL, phone, email) are in `src/site.js`. `sitemap.xml` and `robots.txt` are generated.
- Old URLs are permanently redirected in `next.config.mjs`.
