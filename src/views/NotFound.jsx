import Link from "next/link";
import { BsArrowRight } from "react-icons/bs";

export default function NotFound() {
  return (
    <main className="page dark notfound">
      <h1>This page is not on the plan.</h1>
      <p className="lede">The page you were looking for has moved or never existed. Let us take you back to the studio.</p>
      <Link href="/" className="btn">Back to home <BsArrowRight /></Link>
    </main>
  );
}
