"use client";
const words = ["Complete homes", "Kitchens", "Living spaces", "Bedrooms", "Bathrooms", "Bespoke joinery", "Lighting", "Styling & decor", "Turnkey interiors"];

export default function Marquee() {
  const row = words.concat(words);
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee-track">
        {[0, 1].map((k) => (
          <ul key={k}>
            {row.map((w, n) => (<li key={n}>{w}<b>✦</b></li>))}
          </ul>
        ))}
      </div>
    </div>
  );
}
