import type { Event } from "@/lib/events/event";

/** Short, consistent labels for event listings and headings. */
export function eventDisplayName(event: Event): string {
  const name = `${event.slug?.current ?? ""} ${event.title ?? ""}`.toLowerCase();
  if (/faisalabad|faislabad/.test(name)) return "Faisalabad Event";
  if (/quetta/.test(name)) return "Quetta Event";
  if (/peshawar/.test(name)) return "Peshawar Event";
  if (/ground[ -]?break|groundbreaking/.test(name)) return "Ground Breaking Ceremony";
  if (/noc|no[ -]?objection[ -]?certificate/.test(name)) return "NOC Approval Event";
  return event.title;
}
