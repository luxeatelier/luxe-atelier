import living from "./images/opt/living-bright.jpg";
import kitchenWide from "./images/opt/kitchen-wide.jpg";
import livingWide from "./images/opt/living-wide.jpg";
import kitchenDark from "./images/opt/kitchen-dark.jpg";
import niche from "./images/opt/niche.jpg";
import archesA from "./images/opt/arches-a.jpg";
import archesB from "./images/opt/arches-b.jpg";
import plant from "./images/opt/plant.jpg";
import bedroomTall from "./images/opt/bedroom-tall.jpg";
import bathTall from "./images/opt/bath-tall.jpg";
import kitchenTall from "./images/opt/kitchen-tall.jpg";
import livingTall from "./images/opt/living-tall.jpg";

export const img = { living, kitchenWide, livingWide, kitchenDark, niche, archesA, archesB, plant, bedroomTall, bathTall, kitchenTall, livingTall };

export const nav = [
  { label: "Studio", to: "/about" },
  { label: "Services", to: "/services" },
  { label: "Projects", to: "/projects" },
  { label: "Journal", to: "/journal" },
  { label: "Contact", to: "/contact" },
];

export const heroSlides = [
  { src: kitchenWide, alt: "Open-plan kitchen with a stone island and timber joinery", label: "Kitchens" },
  { src: living, alt: "Bright living room with a linen sofa and leather chair", label: "Living spaces" },
  { src: kitchenDark, alt: "Walnut and fluted-black kitchen with a brass pendant", label: "Bespoke joinery" },
  { src: livingWide, alt: "Living room opening onto a garden through tall windows", label: "Family homes" },
];

export const serviceImages = [living, kitchenWide, kitchenDark, niche, livingWide, archesB];

export const process = [
  ["Listen", "We start in your home, with how you live, who you host and what you want to stop putting up with."],
  ["Draw", "Plans, material boards and lifelike renderings, so you approve every decision before a single wall is touched."],
  ["Build", "Our own craftsmen make the joinery and run the site, with one project manager answerable for the schedule."],
  ["Hand over", "We style the finished interiors, walk you through every detail and stay on call after you move in."],
];

export const materials = [
  { name: "Calacatta marble", note: "Veined, cool, endlessly calm", color: "#e7e3dc" },
  { name: "Smoked walnut", note: "Deep grain for joinery", color: "#4a3326" },
  { name: "Brushed brass", note: "Handles, pendants, inlays", color: "#b08d4f" },
  { name: "Fluted oak", note: "Texture without noise", color: "#bda27c" },
  { name: "Bouclé linen", note: "Soft seating, quiet colour", color: "#d8d0c2" },
  { name: "Forest green", note: "Lacquer and velvet accents", color: "#27382f" },
];
