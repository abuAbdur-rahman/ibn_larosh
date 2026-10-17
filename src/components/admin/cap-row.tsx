import Image from "next/image";
import Link from "next/link";
import { CATEGORIES } from "@/lib/site";
import type { Cap } from "@/lib/types";
import { ConfirmSubmit } from "./confirm-submit";
import { deleteCapAction, toggleCapAction } from "@/app/admin/(dashboard)/caps/actions";

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
      <td>
        <div className="admin-cap">
          <Image
            src={cap.images[0]}
            alt=""
            width={52}
            height={52}
            className="admin-thumb"
          />
          <div>
            <b>{cap.name}</b>
            <span>{cap.colors.join(" · ") || "No colours"}</span>
          </div>
        </div>
      </td>
      <td>{CATEGORIES[cap.category].label}</td>
      <td>{cap.sizes.join(", ")}</td>
      <td>{priceLabel(cap.price)}</td>
      <td>
        <span className={`admin-badge ${cap.available ? "on" : "off"}`}>
          {cap.available ? "Available" : "Hidden"}
        </span>
        {cap.featured ? <span className="admin-badge gold">Featured</span> : null}
      </td>
      <td>
        <div className="admin-actions">
          <Link className="admin-action" href={`/admin/caps/${cap.id}/edit`}>
            Edit
          </Link>
          <form action={toggleCapAction}>
            <input type="hidden" name="id" value={cap.id} />
            <input type="hidden" name="field" value="available" />
            <button className="admin-action" type="submit">
              {cap.available ? "Hide" : "Show"}
            </button>
          </form>
          <form action={toggleCapAction}>
            <input type="hidden" name="id" value={cap.id} />
            <input type="hidden" name="field" value="featured" />
            <button className="admin-action" type="submit">
              {cap.featured ? "Unfeature" : "Feature"}
            </button>
          </form>
          <form action={deleteCapAction}>
            <input type="hidden" name="id" value={cap.id} />
            <ConfirmSubmit
              className="admin-action danger"
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
