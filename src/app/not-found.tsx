import { SearchX } from "lucide-react";
import { WhatsAppIcon } from "@/components/whatsapp-icon";
import { ButtonAnchor, ButtonLink } from "@/components/ui-kit/button";
import { Page } from "@/components/ui-kit/layout";
import { askLink } from "@/lib/whatsapp";

export default function NotFound() {
  return (
    <Page>
      <div className="grid justify-items-center gap-4 px-2.5 py-[70px] text-center text-mut">
        <SearchX className="ic" aria-hidden="true" />
        <h1 className="text-[28px] text-g9">Page not found</h1>
        <p>That page doesn&apos;t exist — but the caps do.</p>
        <ButtonLink variant="green" href="/">
          Back home
        </ButtonLink>
        <ButtonAnchor variant="wa" href={askLink()} target="_blank" rel="noopener noreferrer">
          <WhatsAppIcon className="ic wa" /> Ask on WhatsApp
        </ButtonAnchor>
      </div>
    </Page>
  );
}
