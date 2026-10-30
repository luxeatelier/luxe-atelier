"use client";
import { useEffect, useRef, useState } from "react";
import { BsInstagram } from "react-icons/bs";
import Img from "./Img";

// Instagram's player is laid out at this width: a 54px header, a 4:5 media area (the 9:16 video is
// letterboxed inside it), then a footer. We scale the player so the video alone fills our frame and
// let the frame crop away the header, footer and black bars.
const EMBED_W = 320;
const HEADER = 54;
const MEDIA_H = EMBED_W * 1.25;
const VIDEO_W = MEDIA_H * (9 / 16);

// Shows the film's cover. Instagram's player (heavy) loads only when the visitor presses play.
export default function ReelEmbed({ reel, className = "" }) {
  const [live, setLive] = useState(false);
  const [ready, setReady] = useState(false);
  const [fit, setFit] = useState(null);
  const frame = useRef(null);
  const watch = `https://www.instagram.com/reel/${reel.id}/`;

  useEffect(() => {
    if (!live) return;
    const el = frame.current;
    const measure = () => {
      const f = el.getBoundingClientRect().width;
      const s = f / VIDEO_W;
      setFit({ s, tx: f / 2 - (EMBED_W / 2) * s, ty: (f * 16) / 18 - (HEADER + MEDIA_H / 2) * s });
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [live]);

  return (
    <figure className={`reel ${live ? "live" : ""} ${className}`}>
      <div className="reel-frame" ref={frame}>
        {live && fit && (
          <iframe
            src={`${watch}embed/`}
            title={`${reel.title}, ${reel.place}`}
            allow="autoplay; encrypted-media; picture-in-picture; fullscreen; clipboard-write"
            allowFullScreen
            scrolling="no"
            referrerPolicy="strict-origin-when-cross-origin"
            onLoad={() => setTimeout(() => setReady(true), 2600)}
            style={{ width: EMBED_W, height: 760, transform: `translate(${fit.tx}px, ${fit.ty}px) scale(${fit.s})`, opacity: ready ? 1 : 0 }}
          />
        )}
        {!ready && (
          <button type="button" className="reel-cover" onClick={() => setLive(true)} aria-label={`Play film: ${reel.title}, ${reel.place}`} data-cursor="Play" tabIndex={live ? -1 : 0}>
            <Img src={reel.poster} alt="" unoptimized placeholder="blur" sizes="(max-width: 700px) 70vw, 300px" />
            <span className={`reel-play ${live ? "loading" : ""}`} aria-hidden="true">
              <svg viewBox="0 0 24 24" width="30" height="30"><path d="M8 5.5v13l11-6.5z" fill="currentColor" /></svg>
            </span>
          </button>
        )}
      </div>
      <figcaption>
        <span><b>{reel.title}</b><i>{reel.place}</i></span>
        <a href={watch} target="_blank" rel="noopener noreferrer" aria-label={`Watch ${reel.title} on Instagram (opens in a new tab)`}><BsInstagram aria-hidden="true" /></a>
      </figcaption>
    </figure>
  );
}
