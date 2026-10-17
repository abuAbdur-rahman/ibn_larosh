import Link from "next/link";
import { SearchX } from "lucide-react";
import { WhatsAppIcon } from "@/components/whatsapp-icon";
import { askLink } from "@/lib/whatsapp";

export default function NotFound() {
  return (
    <div className="page">
      <div className="empty" style={{ padding: "70px 10px" }}>
        <SearchX className="ic" aria-hidden="true" />
        <h1 style={{ fontSize: 28, color: "var(--g9)" }}>Page not found</h1>
        <p>That page doesn&apos;t exist — but the caps do.</p>
        <Link className="btn green" href="/">
          Back home
        </Link>
        <a className="btn wa" href={askLink()} target="_blank" rel="noopener noreferrer">
          <WhatsAppIcon className="ic wa" /> Ask on WhatsApp
        </a>
      </div>
    </div>
  );
}
