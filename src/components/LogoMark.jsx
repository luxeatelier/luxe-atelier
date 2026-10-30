// The Luxe Atelier logo as inline SVG so it can be drawn as outlines, then filled.
const shapes = [
  "561.13 195.9 660.03 366.92 775.74 366.92 562.3 0 348.88 366.92 462.24 366.92 561.13 195.9",
  "987.23 732.4 878.74 544.6 762.43 544.25 814.01 634.06 668.62 633.63 194.01 632.2 136.82 729.84 987.23 732.4",
  "360.4 543.04 246.43 542.69 241.67 550.83 355.66 551.17 360.4 543.04",
];

export default function LogoMark({ className = "", darkText = false }) {
  return (
    <svg className={`logomark ${darkText ? "dark-text" : ""} ${className}`} viewBox="0 0 1080 732.4" role="img" aria-label="Luxe Atelier">
      <defs>
        <linearGradient id="lm-gold" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#eebf2a" />
          <stop offset="1" stopColor="#c2983a" />
        </linearGradient>
      </defs>
      <g className="lm-fill">
        {shapes.map((p) => (<polygon key={p} points={p} fill="url(#lm-gold)" />))}
        <text x="0" y="515" textLength="1048" lengthAdjust="spacing" className="lm-word">LUXE ATELIER</text>
      </g>
      <g className="lm-line" fill="none">
        {shapes.map((p) => (<polygon key={p} points={p} pathLength="1" />))}
        <text x="0" y="515" textLength="1048" lengthAdjust="spacing" className="lm-word">LUXE ATELIER</text>
      </g>
    </svg>
  );
}
