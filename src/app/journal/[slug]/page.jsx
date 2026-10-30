import { notFound } from "next/navigation";
import JournalPost from "../../../views/JournalPost";
import JsonLd from "../../../components/JsonLd";
import { posts, getPost } from "../../../journalData";
import { abs, site } from "../../../site";

export const dynamicParams = false;
export const generateStaticParams = () => posts.map((p) => ({ slug: p.slug }));

export function generateMetadata({ params }) {
  const post = getPost(params.slug);
  if (!post) return {};
  const description = post.intro.slice(0, 157).replace(/\s+\S*$/, "") + "…";
  return {
    title: post.title,
    description,
    alternates: { canonical: `/journal/${post.slug}` },
    openGraph: { type: "article", url: `/journal/${post.slug}`, title: post.title, description, publishedTime: post.iso, authors: [site.name], images: [{ url: post.cover.src, width: post.cover.width, height: post.cover.height, alt: post.coverAlt }] },
    twitter: { card: "summary_large_image", title: post.title, description, images: [post.cover.src] },
  };
}

export default function Page({ params }) {
  const post = getPost(params.slug);
  if (!post) notFound();
  const url = abs(`/journal/${post.slug}`);
  return (
    <>
      <JournalPost post={post} />
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        mainEntityOfPage: url,
        headline: post.title,
        description: post.intro.slice(0, 200),
        image: [abs(post.cover.src)],
        datePublished: post.iso,
        dateModified: post.iso,
        author: { "@type": "Organization", name: site.name, url: site.url },
        publisher: { "@type": "Organization", name: site.name, logo: { "@type": "ImageObject", url: abs("/apple-touch-icon.png") } },
        articleSection: post.sub,
        inLanguage: "en-IN",
      }} />
      <JsonLd data={{ "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: abs("/") }, { "@type": "ListItem", position: 2, name: "Journal", item: abs("/journal") }, { "@type": "ListItem", position: 3, name: post.title, item: url }] }} />
    </>
  );
}
