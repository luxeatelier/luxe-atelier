import Link from "next/link";
import { BsArrowRight } from "react-icons/bs";
import Img from "../components/Img";
import { posts } from "../journalData";
import { Words, Reveal } from "../components/Reveal";

export default function JournalPage() {
  return (
    <main className="page dark">
      <header className="page-head">
        <Words as="h1" text="The journal." />
        <p className="lede">Notes on designing and living well in Kerala homes.</p>
      </header>
      <ul className="j-list">
        {posts.map((p, n) => (
          <Reveal as="li" key={p.id}>
            <Link href={`/journal/${p.slug}`} data-cursor="Read">
              <span className="j-img"><Img src={p.cover} alt={p.coverAlt} sizes="(max-width: 800px) 100vw, 50vw" priority={n === 0} loading={n === 0 ? undefined : "lazy"} /></span>
              <span className="j-meta">
                <span className="j-sub">{p.sub}</span>
                <h2 className="j-title">{p.title}</h2>
                <span className="j-excerpt">{p.intro.slice(0, 190)}…</span>
                <span className="textlink">Read the article <BsArrowRight /></span>
              </span>
            </Link>
          </Reveal>
        ))}
      </ul>
    </main>
  );
}
