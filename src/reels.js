import kothamangalam from "./images/social/kothamangalam.jpg";
import marina from "./images/social/marina-one.jpg";
import bedroom from "./images/social/bedroom.jpg";
import craft from "./images/social/craftsmanship.jpg";
import comfort from "./images/social/comfort.jpg";

// Films from the studio's public Instagram profile (@luxeatelierinteriors), played through Instagram's own embed.
export const profileUrl = "https://www.instagram.com/luxeatelierinteriors/";

export const reels = {
  kothamangalam: {
    id: "DMfL8yuMmPB",
    poster: kothamangalam,
    title: "Project reveal",
    place: "Kothamangalam",
    description: "The finished luxury interior for Mr. Shias in Kothamangalam, from living spaces to bedrooms and a modular kitchen.",
    date: "2025-07-24",
  },
  marina: {
    id: "DMII0l3BLwJ",
    poster: marina,
    title: "Apartment walkthrough",
    place: "Sobha Marina One, Kochi",
    description: "A walkthrough of the apartment designed by Luxe Atelier at Sobha Marina One, Marine Drive, Kochi.",
    date: "2025-07-15",
  },
  bedroom: {
    id: "DeHRPzEBCy4",
    poster: bedroom,
    title: "Bedroom in warm detail",
    place: "Bedroom design",
    description: "A bedroom where premium finishes, warm lighting and calm details come together.",
    date: "2026-10-05",
  },
  craft: {
    id: "Dd_lWeKB0j5",
    poster: craft,
    title: "Craft in every detail",
    place: "Dining and joinery",
    description: "Close-up details of joinery, lighting and finishes in a Luxe Atelier dining space.",
    date: "2026-10-02",
  },
  comfort: {
    id: "DU56OdLgePp",
    poster: comfort,
    title: "Comfort, the ultimate luxury",
    place: "Living space",
    description: "A calm living space with warm timber, soft drapes and layered lighting, designed by Luxe Atelier.",
    date: "2026-02-18",
  },
};

export const films = [reels.marina, reels.craft, reels.bedroom, reels.comfort];
