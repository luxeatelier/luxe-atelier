import ServicesPage from "../../views/ServicesPage";
import JsonLd from "../../components/JsonLd";
import services from "../../servicesPage/services.json";
import { abs } from "../../site";

export const metadata = {
  title: "Interior Design Services in Kerala",
  description: "Design consultation, space planning, customized interiors, visual renderings, project management and styling, all under one roof at Luxe Atelier, Ernakulam.",
  alternates: { canonical: "/services" },
  openGraph: { url: "/services", title: "Interior Design Services in Kerala | Luxe Atelier", description: "From the first conversation to the last cushion, one team carries your project." },
};

export default function Page() {
  return (
    <>
      <ServicesPage />
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "ItemList",
        name: "Luxe Atelier interior design services",
        itemListElement: services.services.map((s, i) => ({
          "@type": "ListItem",
          position: i + 1,
          item: { "@type": "Service", name: s.service_name, description: s.service_content, provider: { "@id": abs("/#business") }, areaServed: "Kerala, India" },
        })),
      }} />
      <JsonLd data={{ "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: abs("/") }, { "@type": "ListItem", position: 2, name: "Services", item: abs("/services") }] }} />
    </>
  );
}
