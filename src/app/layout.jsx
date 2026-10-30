import localFont from "next/font/local";
import Script from "next/script";
import "lenis/dist/lenis.css";
import "../theme.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Cursor from "../components/Cursor";
import Scroller from "../components/Scroller";
import JsonLd from "../components/JsonLd";
import { Loader, Curtain, WhatsApp } from "../components/Extras";
import MotionProvider from "../components/MotionProvider";
import { site, abs } from "../site";

const serif = localFont({
  src: [
    { path: "../../node_modules/@fontsource/cormorant-garamond/files/cormorant-garamond-latin-300-normal.woff2", weight: "300", style: "normal" },
    { path: "../../node_modules/@fontsource/cormorant-garamond/files/cormorant-garamond-latin-400-normal.woff2", weight: "400", style: "normal" },
  ],
  variable: "--font-serif",
  display: "swap",
  adjustFontFallback: "Times New Roman",
});
const sans = localFont({
  src: "../../node_modules/@fontsource-variable/jost/files/jost-latin-wght-normal.woff2",
  weight: "300 500",
  variable: "--font-sans",
  display: "swap",
  adjustFontFallback: "Arial",
});

export const metadata = {
  metadataBase: new URL(site.url),
  title: { default: site.title, template: "%s | Luxe Atelier" },
  description: site.description,
  applicationName: site.name,
  keywords: ["interior designers in Kerala", "residential interior design Kerala", "turnkey home interiors", "interior design Ernakulam", "luxury interiors Kochi", "modular kitchen Kerala", "bespoke furniture Kerala", "home interior design Kerala", "Luxe Atelier"],
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: site.name,
    locale: site.locale,
    url: site.url,
    title: site.title,
    description: site.description,
    images: [{ url: "/og.jpg", width: 1200, height: 630, alt: "Luxe Atelier, bespoke interiors in Kerala" }],
  },
  twitter: { card: "summary_large_image", title: site.title, description: site.description, images: ["/og.jpg"] },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 } },
  icons: { icon: [{ url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" }, { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" }], apple: "/apple-touch-icon.png" },
  manifest: "/site.webmanifest",
  other: { google: "notranslate" },
  formatDetection: { telephone: true, email: true, address: true },
};

export const viewport = { themeColor: "#33443a", width: "device-width", initialScale: 1 };

const business = {
  "@context": "https://schema.org",
  "@type": ["InteriorDesigner", "LocalBusiness"],
  "@id": abs("/#business"),
  name: site.name,
  url: site.url,
  logo: abs("/apple-touch-icon.png"),
  image: abs("/og.jpg"),
  description: site.description,
  email: site.email,
  telephone: site.phone,
  address: { "@type": "PostalAddress", addressLocality: "Ernakulam", addressRegion: "Kerala", addressCountry: "IN" },
  areaServed: { "@type": "State", name: "Kerala" },
  knowsAbout: ["Interior design", "Modular kitchens", "Bespoke joinery", "Space planning", "Home styling"],
  sameAs: site.social,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en-IN" translate="no" className={`${serif.variable} ${sans.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: "var d=document.documentElement;d.classList.add('js');try{if(sessionStorage.getItem('la-seen')){d.classList.add('seen')}else{d.classList.add('intro')}}catch(e){}" }} />
      </head>
      <body>
        <a className="skip" href="#main">Skip to content</a>
        <MotionProvider>
          <Scroller />
          <Cursor />
          <Header />
          <div id="main">{children}</div>
          <Footer />
        </MotionProvider>
        <WhatsApp />
        <Curtain />
        <Loader />
        <JsonLd data={business} />
        <Script src="https://www.googletagmanager.com/gtag/js?id=AW-16600287940" strategy="lazyOnload" />
        <Script id="gtag-init" strategy="lazyOnload">{`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','AW-16600287940');`}</Script>
      </body>
    </html>
  );
}
