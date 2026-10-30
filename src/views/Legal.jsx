import Link from "next/link";
import { Terms } from "../Allterms/terms";
import { Privacy } from "../Allterms/privacy";
import { Cookies } from "../Allterms/cookies";

export const legalDocs = {
  terms: { label: "Terms", title: "Terms and Conditions", Doc: Terms },
  privacy: { label: "Privacy", title: "Privacy Policy", Doc: Privacy },
  cookies: { label: "Cookies", title: "Cookies Policy", Doc: Cookies },
};

export default function Legal({ doc }) {
  const { Doc } = legalDocs[doc];
  return (
    <main className="page dark legal">
      <header className="page-head">
        <p className="legal-kicker">Legal</p>
        <nav className="chips" aria-label="Legal documents">
          {Object.entries(legalDocs).map(([k, d]) => (
            <Link key={k} href={`/legal/${k}`} className={k === doc ? "chip on" : "chip"} aria-current={k === doc ? "page" : undefined}>{d.label}</Link>
          ))}
        </nav>
      </header>
      <div className="legal-body"><Doc /></div>
    </main>
  );
}
