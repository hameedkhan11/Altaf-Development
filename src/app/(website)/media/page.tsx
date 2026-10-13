import { redirect } from "next/navigation";

// Preserve existing Media breadcrumbs without a 404 or an extra landing page.
export default function MediaLandingPage() {
  redirect("/media/blogs");
}
