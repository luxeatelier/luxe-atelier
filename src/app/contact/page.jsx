import ContactPage from "../../views/ContactPage";
import JsonLd from "../../components/JsonLd";
import faq from "../../faq/faqData.json";
import { abs } from "../../site";

export const metadata = {
  title: "Contact and Book a Design Consultation",
  description: "Book a design consultation with Luxe Atelier in Ernakulam, Kerala. Email, WhatsApp or send a message about your home, from a single kitchen to a complete interior.",
  alternates: { canonical: "/contact" },
  openGraph: { url: "/contact", title: "Book a Design Consultation | Luxe Atelier", description: "Tell us about your home, the spaces and the timeline. A director will reply personally." },
};

export default function Page() {
  return (
    <>
      <ContactPage />
      <JsonLd data={{ "@context": "https://schema.org", "@type": "ContactPage", name: "Contact Luxe Atelier", url: abs("/contact"), about: { "@id": abs("/#business") } }} />
      <JsonLd data={{ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) }} />
      <JsonLd data={{ "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: abs("/") }, { "@type": "ListItem", position: 2, name: "Contact", item: abs("/contact") }] }} />
    </>
  );
}
