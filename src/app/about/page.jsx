import AboutPage from "../../views/AboutPage";
import JsonLd from "../../components/JsonLd";
import { abs } from "../../site";

export const metadata = {
  title: "About the Studio and Our Directors",
  description: "Meet Luxe Atelier, an Ernakulam interior design studio led by three directors. See how we listen, draw, build and hand over bespoke homes across Kerala.",
  alternates: { canonical: "/about" },
  openGraph: { url: "/about", title: "About Luxe Atelier", description: "An Ernakulam interior design studio led by three directors, designing and building bespoke homes across Kerala." },
};

export default function Page() {
  return (
    <>
      <AboutPage />
      <JsonLd data={{ "@context": "https://schema.org", "@type": "AboutPage", name: "About Luxe Atelier", url: abs("/about"), about: { "@id": abs("/#business") } }} />
      <JsonLd data={{ "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: abs("/") }, { "@type": "ListItem", position: 2, name: "About", item: abs("/about") }] }} />
    </>
  );
}
