import { posts } from "../journalData";
import { site } from "../site";

export default function sitemap() {
  const now = new Date();
  const pages = [
    ["/", 1, "weekly"], ["/about", 0.8, "monthly"], ["/services", 0.9, "monthly"], ["/projects", 0.9, "weekly"],
    ["/journal", 0.7, "weekly"], ["/contact", 0.8, "yearly"],
    ["/legal/terms", 0.2, "yearly"], ["/legal/privacy", 0.2, "yearly"], ["/legal/cookies", 0.2, "yearly"],
  ].map(([path, priority, changeFrequency]) => ({ url: `${site.url}${path}`, lastModified: now, changeFrequency, priority }));
  const articles = posts.map((p) => ({ url: `${site.url}/journal/${p.slug}`, lastModified: new Date(p.iso), changeFrequency: "yearly", priority: 0.6 }));
  return [...pages, ...articles];
}
