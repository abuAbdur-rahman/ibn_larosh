import type { Metadata } from "next";
import { CustomOrderForm } from "@/components/custom-order-form";

export const metadata: Metadata = {
  title: "Custom order",
  description:
    "Order a custom woven Hausa cap — choose the type, size, colours and pattern. We weave any design you like and confirm on WhatsApp.",
};

export default function CustomPage() {
  return (
    <div className="page">
      <div className="ttl">
        <h1>Custom order</h1>
        <p>
          We weave any cap design of your choice. Fill this in and we&apos;ll continue on
          WhatsApp.
        </p>
      </div>

      <div className="panel">
        <CustomOrderForm />
      </div>

      <section className="sec">
        <div className="note">
          Tip: after WhatsApp opens, attach a photo of the design you want.
        </div>
      </section>
    </div>
  );
}
