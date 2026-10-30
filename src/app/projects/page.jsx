import ProjectsPage from "../../views/ProjectsPage";
import JsonLd from "../../components/JsonLd";
import { abs } from "../../site";
import { reels } from "../../reels";

export const metadata = {
  title: "Residential Interior Design Projects in Kerala",
  description: "Browse complete homes and individual spaces, from kitchens to bedrooms and bathrooms, designed and built by Luxe Atelier across Kerala. Over 250 projects delivered.",
  alternates: { canonical: "/projects" },
  openGraph: { url: "/projects", title: "Our Interior Design Projects | Luxe Atelier", description: "A selection of complete homes and spaces designed and built across Kerala." },
};

export default function Page() {
  return (
    <>
      <ProjectsPage />
      {Object.values(reels).map((r) => (
        <JsonLd key={r.id} data={{ "@context": "https://schema.org", "@type": "VideoObject", name: `${r.title}, ${r.place}`, description: r.description, thumbnailUrl: abs(r.poster.src), uploadDate: r.date, embedUrl: `https://www.instagram.com/reel/${r.id}/embed/`, publisher: { "@id": abs("/#business") } }} />
      ))}
      <JsonLd data={{ "@context": "https://schema.org", "@type": "CollectionPage", name: "Luxe Atelier projects", url: abs("/projects"), about: { "@id": abs("/#business") } }} />
      <JsonLd data={{ "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: abs("/") }, { "@type": "ListItem", position: 2, name: "Projects", item: abs("/projects") }] }} />
    </>
  );
}
