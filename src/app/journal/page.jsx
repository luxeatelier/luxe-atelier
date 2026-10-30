import JournalPage from "../../views/JournalPage";
import JsonLd from "../../components/JsonLd";
import { posts } from "../../journalData";
import { abs } from "../../site";

export const metadata = {
  title: "Interior Design Journal: Ideas for Kerala Homes",
  description: "Guides on modernizing traditional Kerala interiors, making small apartments feel larger and the design elements every Kerala home needs.",
  alternates: { canonical: "/journal" },
  openGraph: { url: "/journal", title: "The Luxe Atelier Journal", description: "Notes on designing and living well in Kerala homes." },
};

export default function Page() {
  return (
    <>
      <JournalPage />
      <JsonLd data={{ "@context": "https://schema.org", "@type": "Blog", name: "The Luxe Atelier Journal", url: abs("/journal"), blogPost: posts.map((p) => ({ "@type": "BlogPosting", headline: p.title, url: abs(`/journal/${p.slug}`), datePublished: p.iso })) }} />
    </>
  );
}
