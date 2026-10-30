import Link from "next/link";
import { FaInstagram, FaFacebookF, FaWhatsapp } from "react-icons/fa";
import { BsArrowUpRight } from "react-icons/bs";
import Img from "./Img";
import BackToTop from "./BackToTop";
import logoWhite from "../images/logo/luxelogowhite.png";
import { site } from "../site";

// Navigation lives in the header, so the footer carries only what you cannot find there.
export default function Footer() {
  return (
    <footer className="ftr">
      <div className="ftr-arches" aria-hidden="true"><i /><i /><i /></div>

      <Link href="/contact" className="ftr-big">
        <span>Let us design your next home.</span>
        <b aria-hidden="true"><BsArrowUpRight /></b>
      </Link>

      <div className="ftr-cols">
        <div className="ftr-brand">
          <Img src={logoWhite} alt="Luxe Atelier" sizes="220px" />
          <p>Bespoke interiors, designed and built in Kerala.</p>
        </div>
        <address>
          <p className="ftr-h">Studio</p>
          <p>Ernakulam, Kerala, India</p>
          <p><a href={`mailto:${site.email}`}>{site.email}</a></p>
          <p><a href="tel:+918606208962">+91 86062 08962</a></p>
        </address>
        <div>
          <p className="ftr-h">Follow</p>
          <ul className="ftr-social">
            <li><a href={site.social[0]} aria-label="Instagram"><FaInstagram /></a></li>
            <li><a href={site.social[1]} aria-label="Facebook"><FaFacebookF /></a></li>
            <li><a href="https://wa.me/918606208962" aria-label="WhatsApp"><FaWhatsapp /></a></li>
          </ul>
        </div>
      </div>

      <div className="ftr-mark" aria-hidden="true">Luxe Atelier</div>

      <div className="ftr-base">
        <span>© {new Date().getFullYear()} Luxe Atelier Private Limited</span>
        <ul>
          <li><Link href="/legal/terms">Terms</Link></li>
          <li><Link href="/legal/privacy">Privacy</Link></li>
          <li><Link href="/legal/cookies">Cookies</Link></li>
        </ul>
        <BackToTop />
      </div>
    </footer>
  );
}
