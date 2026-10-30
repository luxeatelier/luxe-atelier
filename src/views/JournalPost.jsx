import Link from "next/link";
import { BsArrowRight } from "react-icons/bs";
import Img from "../components/Img";
import { posts } from "../journalData";
import { Reveal } from "../components/Reveal";

export default function JournalPost({ post }) {
  const others = posts.filter((p) => p.id !== post.id);
  return (
    <main className="page dark post">
      <article>
        <header className="post-head">
          <p className="j-sub">{post.sub}</p>
          <h1>{post.title}</h1>
          <p className="post-date"><time dateTime={post.iso}>{post.date}</time> · Interior, design, home, decor</p>
        </header>
        <div className="post-cover"><Img src={post.cover} alt={post.coverAlt} priority sizes="(max-width: 1300px) 100vw, 1300px" /></div>
        <div className="post-body">
          <Reveal as="p" className="post-intro">{post.intro}</Reveal>
          <Reveal as="blockquote">“{post.quote}”</Reveal>
          <Reveal as="h2">{post.sub}</Reveal>
          <Reveal as="p">{post.body}</Reveal>
          <div className="post-gallery">{post.gallery.map(([g, alt]) => (<Img key={alt} src={g} alt={alt} sizes="(max-width: 800px) 50vw, 380px" loading="lazy" />))}</div>
          <Reveal as="p">{post.end}</Reveal>
        </div>
      </article>
      <section className="post-more" aria-labelledby="more">
        <h2 id="more">Keep reading</h2>
        <ul>
          {others.map((p) => (
            <li key={p.id}><Link href={`/journal/${p.slug}`}><span className="j-title">{p.title}</span><BsArrowRight /></Link></li>
          ))}
        </ul>
      </section>
    </main>
  );
}
