import Image from "next/image";
import Link from "next/link";
import { CATEGORIES } from "@/lib/site";
import type { Cap } from "@/lib/types";
import { ConfirmSubmit } from "./confirm-submit";
import { deleteCapAction, toggleCapAction } from "@/app/admin/(dashboard)/caps/actions";

const TD = "border-b border-line px-3.5 py-3 align-middle";
const ACTION =
  "inline-flex min-h-9 items-center rounded-full px-2.5 text-[12.5px] font-semibold whitespace-nowrap";

function priceLabel(price?: number): string {
  return price === undefined ? "On request" : `₦${price.toLocaleString("en-NG")}`;
}

interface CapRowProps {
  cap: Cap;
}

/** One admin table row: photo, details, status badges, and row actions. */
export function AdminCapRow({ cap }: CapRowProps) {
  return (
    <tr>
      <td className={TD}>
        <div className="flex items-center gap-3">
          <Image
            src={cap.images[0]}
            alt=""
            width={52}
            height={52}
            className="size-13 flex-none rounded-[10px] bg-[#efe4bd] object-cover"
          />
          <div>
            <b className="block font-semibold text-g9">{cap.name}</b>
            <span className="text-xs text-mut">{cap.colors.join(" · ") || "No colours"}</span>
          </div>
        </div>
      </td>
      <td className={TD}>{CATEGORIES[cap.category].label}</td>
      <td className={TD}>{cap.sizes.join(", ")}</td>
      <td className={TD}>{priceLabel(cap.price)}</td>
      <td className={TD}>
        <span
          className={`mr-1 inline-block rounded-full px-2.25 py-0.75 text-[10.5px] font-bold tracking-[0.05em] whitespace-nowrap uppercase ${
            cap.available ? "bg-g7/12 text-g7" : "bg-mut/14 text-mut"
          }`}
        >
          {cap.available ? "Available" : "Hidden"}
        </span>
        {cap.featured ? (
          <span className="inline-block rounded-full bg-gold/16 px-2.25 py-0.75 text-[10.5px] font-bold tracking-[0.05em] whitespace-nowrap text-[#7a5a12] uppercase">
            Featured
          </span>
        ) : null}
      </td>
      <td className={TD}>
        <div className="flex flex-wrap justify-end gap-1">
          <Link className={`${ACTION} text-g7 hover:bg-g9/[0.07]`} href={`/admin/caps/${cap.id}/edit`}>
            Edit
          </Link>
          <form action={toggleCapAction}>
            <input type="hidden" name="id" value={cap.id} />
            <input type="hidden" name="field" value="available" />
            <button className={`${ACTION} text-g7 hover:bg-g9/[0.07]`} type="submit">
              {cap.available ? "Hide" : "Show"}
            </button>
          </form>
          <form action={toggleCapAction}>
            <input type="hidden" name="id" value={cap.id} />
            <input type="hidden" name="field" value="featured" />
            <button className={`${ACTION} text-g7 hover:bg-g9/[0.07]`} type="submit">
              {cap.featured ? "Unfeature" : "Feature"}
            </button>
          </form>
          <form action={deleteCapAction}>
            <input type="hidden" name="id" value={cap.id} />
            <ConfirmSubmit
              className={`${ACTION} text-[#b3261e] hover:bg-[#b3261e]/8`}
              message={`Delete "${cap.name}"? This cannot be undone.`}
            >
              Delete
            </ConfirmSubmit>
          </form>
        </div>
      </td>
    </tr>
  );
}
