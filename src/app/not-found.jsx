import NotFound from "../views/NotFound";

export const metadata = { title: "Page not found", robots: { index: false, follow: false } };

export default function Page() { return <NotFound />; }
