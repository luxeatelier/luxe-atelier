import Home from "../views/Home";
import JsonLd from "../components/JsonLd";
import { site } from "../site";

export const metadata = {
  title: { absolute: site.title },
  description: site.description,
  alternates: { canonical: "/" },
};

export default function Page() {
  return (
    <>
      <Home />
      <JsonLd data={{ "@context": "https://schema.org", "@type": "WebSite", name: site.name, url: site.url, inLanguage: "en-IN", publisher: { "@id": `${site.url}/#business` } }} />
    </>
  );
}
