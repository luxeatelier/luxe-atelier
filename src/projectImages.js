import data from "./project/projects.json";

import kitchen_1_t from "./images/gallery/t/kitchen-1.webp";
import kitchen_1_f from "./images/gallery/f/kitchen-1.webp";
import kitchen_2_t from "./images/gallery/t/kitchen-2.webp";
import kitchen_2_f from "./images/gallery/f/kitchen-2.webp";
import kitchen_3_t from "./images/gallery/t/kitchen-3.webp";
import kitchen_3_f from "./images/gallery/f/kitchen-3.webp";
import kitchen_4_t from "./images/gallery/t/kitchen-4.webp";
import kitchen_4_f from "./images/gallery/f/kitchen-4.webp";
import kitchen_5_t from "./images/gallery/t/kitchen-5.webp";
import kitchen_5_f from "./images/gallery/f/kitchen-5.webp";
import kitchen_6_t from "./images/gallery/t/kitchen-6.webp";
import kitchen_6_f from "./images/gallery/f/kitchen-6.webp";
import kitchen_7_t from "./images/gallery/t/kitchen-7.webp";
import kitchen_7_f from "./images/gallery/f/kitchen-7.webp";
import kitchen_8_t from "./images/gallery/t/kitchen-8.webp";
import kitchen_8_f from "./images/gallery/f/kitchen-8.webp";
import living_1_t from "./images/gallery/t/living-1.webp";
import living_1_f from "./images/gallery/f/living-1.webp";
import living_2_t from "./images/gallery/t/living-2.webp";
import living_2_f from "./images/gallery/f/living-2.webp";
import living_3_t from "./images/gallery/t/living-3.webp";
import living_3_f from "./images/gallery/f/living-3.webp";
import living_4_t from "./images/gallery/t/living-4.webp";
import living_4_f from "./images/gallery/f/living-4.webp";
import living_5_t from "./images/gallery/t/living-5.webp";
import living_5_f from "./images/gallery/f/living-5.webp";
import living_6_t from "./images/gallery/t/living-6.webp";
import living_6_f from "./images/gallery/f/living-6.webp";
import living_7_t from "./images/gallery/t/living-7.webp";
import living_7_f from "./images/gallery/f/living-7.webp";
import living_8_t from "./images/gallery/t/living-8.webp";
import living_8_f from "./images/gallery/f/living-8.webp";
import living_9_t from "./images/gallery/t/living-9.webp";
import living_9_f from "./images/gallery/f/living-9.webp";
import bedroom_1_t from "./images/gallery/t/bedroom-1.webp";
import bedroom_1_f from "./images/gallery/f/bedroom-1.webp";
import bedroom_2_t from "./images/gallery/t/bedroom-2.webp";
import bedroom_2_f from "./images/gallery/f/bedroom-2.webp";
import bedroom_3_t from "./images/gallery/t/bedroom-3.webp";
import bedroom_3_f from "./images/gallery/f/bedroom-3.webp";
import bedroom_4_t from "./images/gallery/t/bedroom-4.webp";
import bedroom_4_f from "./images/gallery/f/bedroom-4.webp";
import bedroom_5_t from "./images/gallery/t/bedroom-5.webp";
import bedroom_5_f from "./images/gallery/f/bedroom-5.webp";
import bedroom_6_t from "./images/gallery/t/bedroom-6.webp";
import bedroom_6_f from "./images/gallery/f/bedroom-6.webp";
import bedroom_7_t from "./images/gallery/t/bedroom-7.webp";
import bedroom_7_f from "./images/gallery/f/bedroom-7.webp";
import bedroom_8_t from "./images/gallery/t/bedroom-8.webp";
import bedroom_8_f from "./images/gallery/f/bedroom-8.webp";
import bedroom_9_t from "./images/gallery/t/bedroom-9.webp";
import bedroom_9_f from "./images/gallery/f/bedroom-9.webp";
import bathroom_1_t from "./images/gallery/t/bathroom-1.webp";
import bathroom_1_f from "./images/gallery/f/bathroom-1.webp";
import bathroom_2_t from "./images/gallery/t/bathroom-2.webp";
import bathroom_2_f from "./images/gallery/f/bathroom-2.webp";
import bathroom_3_t from "./images/gallery/t/bathroom-3.webp";
import bathroom_3_f from "./images/gallery/f/bathroom-3.webp";
import bathroom_4_t from "./images/gallery/t/bathroom-4.webp";
import bathroom_4_f from "./images/gallery/f/bathroom-4.webp";
import bathroom_5_t from "./images/gallery/t/bathroom-5.webp";
import bathroom_5_f from "./images/gallery/f/bathroom-5.webp";
import bathroom_6_t from "./images/gallery/t/bathroom-6.webp";
import bathroom_6_f from "./images/gallery/f/bathroom-6.webp";
import bathroom_7_t from "./images/gallery/t/bathroom-7.webp";
import bathroom_7_f from "./images/gallery/f/bathroom-7.webp";
import bathroom_8_t from "./images/gallery/t/bathroom-8.webp";
import bathroom_8_f from "./images/gallery/f/bathroom-8.webp";
import bathroom_9_t from "./images/gallery/t/bathroom-9.webp";
import bathroom_9_f from "./images/gallery/f/bathroom-9.webp";

const files = {
  kitchen_1: { thumb: kitchen_1_t, full: kitchen_1_f },
  kitchen_2: { thumb: kitchen_2_t, full: kitchen_2_f },
  kitchen_3: { thumb: kitchen_3_t, full: kitchen_3_f },
  kitchen_4: { thumb: kitchen_4_t, full: kitchen_4_f },
  kitchen_5: { thumb: kitchen_5_t, full: kitchen_5_f },
  kitchen_6: { thumb: kitchen_6_t, full: kitchen_6_f },
  kitchen_7: { thumb: kitchen_7_t, full: kitchen_7_f },
  kitchen_8: { thumb: kitchen_8_t, full: kitchen_8_f },
  living_1: { thumb: living_1_t, full: living_1_f },
  living_2: { thumb: living_2_t, full: living_2_f },
  living_3: { thumb: living_3_t, full: living_3_f },
  living_4: { thumb: living_4_t, full: living_4_f },
  living_5: { thumb: living_5_t, full: living_5_f },
  living_6: { thumb: living_6_t, full: living_6_f },
  living_7: { thumb: living_7_t, full: living_7_f },
  living_8: { thumb: living_8_t, full: living_8_f },
  living_9: { thumb: living_9_t, full: living_9_f },
  bedroom_1: { thumb: bedroom_1_t, full: bedroom_1_f },
  bedroom_2: { thumb: bedroom_2_t, full: bedroom_2_f },
  bedroom_3: { thumb: bedroom_3_t, full: bedroom_3_f },
  bedroom_4: { thumb: bedroom_4_t, full: bedroom_4_f },
  bedroom_5: { thumb: bedroom_5_t, full: bedroom_5_f },
  bedroom_6: { thumb: bedroom_6_t, full: bedroom_6_f },
  bedroom_7: { thumb: bedroom_7_t, full: bedroom_7_f },
  bedroom_8: { thumb: bedroom_8_t, full: bedroom_8_f },
  bedroom_9: { thumb: bedroom_9_t, full: bedroom_9_f },
  bathroom_1: { thumb: bathroom_1_t, full: bathroom_1_f },
  bathroom_2: { thumb: bathroom_2_t, full: bathroom_2_f },
  bathroom_3: { thumb: bathroom_3_t, full: bathroom_3_f },
  bathroom_4: { thumb: bathroom_4_t, full: bathroom_4_f },
  bathroom_5: { thumb: bathroom_5_t, full: bathroom_5_f },
  bathroom_6: { thumb: bathroom_6_t, full: bathroom_6_f },
  bathroom_7: { thumb: bathroom_7_t, full: bathroom_7_f },
  bathroom_8: { thumb: bathroom_8_t, full: bathroom_8_f },
  bathroom_9: { thumb: bathroom_9_t, full: bathroom_9_f },
};
// A few entries in projects.json point at a different file than their key suggests.
const swaps = { bathroom7: "bathroom_9", living4: "living_9" };

export const categories = ["Kitchen", "Living Area", "Bedroom", "Bathroom"];
export const spaceLabel = (c) => (c === "Living Area" ? "Living" : c);

// thumb: 640px webp for grids (served as-is, no on-demand resizing); full: 1400px webp for the viewer.
export const projects = categories.flatMap((cat) =>
  data[cat].map((p) => {
    const m = p.image.match(/^([a-z]+)(\d)$/);
    const key = swaps[p.image] || `${m[1]}_${m[2]}`;
    const f = files[key];
    return { id: key, name: p.project_name, type: p.category, cat, thumb: f.thumb, full: f.full, img: f.thumb };
  })
);
