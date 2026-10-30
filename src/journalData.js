import blog from "./blog/blogData.json";
import { img } from "./content";
import p3 from "./images/opt/p/living-3.jpg";
import p2 from "./images/opt/p/kitchen-2.jpg";

// Journal photography: large originals from the studio's own library, one distinct set per article.
const slugs = {
  post1: { slug: "modernizing-traditional-kerala-interiors", cover: img.livingWide, coverAlt: "Living room opening onto a garden through tall windows, warm timber and linen", gallery: [[img.kitchenDark, "Walnut and fluted-black kitchen with a brass pendant"], [img.archesA, "Sculptural arches in sand and terracotta tones"]] },
  post2: { slug: "maximizing-space-in-small-apartments", cover: img.kitchenWide, coverAlt: "Open-plan kitchen with a stone island and timber joinery", gallery: [[p3, "Compact living area with a grey sofa and glass table"], [p2, "Kitchen island with lantern pendants"]] },
  post3: { slug: "interior-design-elements-for-kerala-homes", cover: img.living, coverAlt: "Bright living room with a linen sofa and leather chair", gallery: [[img.niche, "Warm-lit shelf niche with a sculptural bowl"], [img.plant, "Potted plants on a white table"]] },
};

export const posts = Object.keys(blog).map((id) => {
  const p = blog[id][0];
  const meta = slugs[id];
  return {
    id,
    slug: meta.slug,
    title: p.heading,
    sub: p.subheading,
    quote: p.quote,
    intro: p.Introduction,
    body: p.mainContent,
    end: p.conclusion || p.conslusion,
    cover: meta.cover,
    coverAlt: meta.coverAlt,
    gallery: meta.gallery,
    date: "3 March 2023",
    iso: "2023-03-03",
  };
});

export const getPost = (slug) => posts.find((p) => p.slug === slug);
