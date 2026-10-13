import { redirect } from "next/navigation";

// Apartment-category breadcrumbs previously led to a missing page.
export default function ApartmentCategoriesPage() {
  redirect("/properties");
}
