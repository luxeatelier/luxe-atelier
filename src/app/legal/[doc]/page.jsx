import { notFound } from "next/navigation";
import Legal, { legalDocs } from "../../../views/Legal";

export const dynamicParams = false;
export const generateStaticParams = () => Object.keys(legalDocs).map((doc) => ({ doc }));

export function generateMetadata({ params }) {
  const d = legalDocs[params.doc];
  if (!d) return {};
  return { title: d.title, description: `${d.title} for the Luxe Atelier website.`, alternates: { canonical: `/legal/${params.doc}` }, robots: { index: true, follow: true } };
}

export default function Page({ params }) {
  if (!legalDocs[params.doc]) notFound();
  return <Legal doc={params.doc} />;
}
