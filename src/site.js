export const site = {
  name: "Luxe Atelier",
  url: "https://luxeatelierinteriors.com",
  title: "Luxe Atelier | Interior Designers in Ernakulam, Kerala",
  description: "Luxe Atelier designs and builds complete residential interiors across Kerala, from kitchens and living spaces to bedrooms and bathrooms. Book a design consultation with our Ernakulam studio.",
  email: "luxeatelierpvtltd@gmail.com",
  phone: "+918606208962",
  social: ["https://www.instagram.com/luxeatellier", "https://www.facebook.com/people/Luxe-Atelier-Private-Limited/61558236024639/", "https://linktr.ee/luxeatelier"],
  locale: "en_IN",
};

export const abs = (path = "/") => new URL(path, site.url).toString();
