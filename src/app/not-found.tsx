import { SearchX } from "lucide-react";
import { WhatsAppIcon } from "@/components/whatsapp-icon";
import { ButtonAnchor, ButtonLink } from "@/components/ui-kit/button";
import { askLink } from "@/lib/whatsapp";

export default function NotFound() {
  return (
    <div className="page">
      <div className="empty" style={{ padding: "70px 10px" }}>
        <SearchX className="ic" aria-hidden="true" />
        <h1 style={{ fontSize: 28, color: "var(--g9)" }}>Page not found</h1>
        <p>That page doesn&apos;t exist — but the caps do.</p>
        <ButtonLink variant="green" href="/">
          Back home
        </ButtonLink>
        <ButtonAnchor variant="wa" href={askLink()} target="_blank" rel="noopener noreferrer">
          <WhatsAppIcon className="ic wa" /> Ask on WhatsApp
        </ButtonAnchor>
      </div>
    </div>
  );
}
