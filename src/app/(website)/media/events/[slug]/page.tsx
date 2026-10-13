// app/events/[slug]/page.tsx
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  FiCalendar,
  FiMapPin,
  FiUsers,
  FiArrowLeft,
  FiCheckCircle,
} from "react-icons/fi";

import {
  getEventBySlugQuery,
  getEventSlugsQuery,
  getRelatedEventsQuery,
  urlFor,
  eventImageUrl,
  eventDateValue,
  type Event,
} from "@/lib/events/event";
import { client } from "@/lib/sanityService";
import { getLocalEvent, localEvents, mergeEvents } from "@/data/events";
import { Hero } from "@/components/common/Hero";

interface EventDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  // These local routes work even when the external CMS cannot be reached during the build.
  let cmsSlugs: string[] = [];
  try {
    cmsSlugs = await client.fetch<string[]>(getEventSlugsQuery);
  } catch (error) {
    console.error("Error generating Sanity event routes:", error);
  }
  return [...new Set([...localEvents.map((event) => event.slug.current), ...cmsSlugs])]
    .map((slug) => ({ slug }));
}

async function loadEvent(slug: string): Promise<Event | null> {
  const local = getLocalEvent(slug);
  if (local) return local;
  try {
    return await client.fetch<Event | null>(getEventBySlugQuery, { slug });
  } catch (error) {
    console.error("Error fetching event:", error);
    return null;
  }
}

export async function generateMetadata({ params }: EventDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const event = await loadEvent(slug);
  if (!event) return { title: "Event Not Found" };
  return {
    title: event.metaTitle || event.title,
    description: event.metaDescription || event.description,
    openGraph: {
      title: event.title,
      description: event.metaDescription || event.description,
      images: [{
        url: eventImageUrl(event, 1920, 1080),
        width: 1920,
        height: 1080,
        alt: event.title,
      }],
    },
  };
}

function EventGallery({ event }: { event: Event }) {
  const gallery = [
    ...(event.localGallery ?? []).map((image) => ({
      url: image.src,
      alt: image.alt,
      fit: image.fit ?? "cover",
    })),
    ...(event.gallery ?? []).filter((image) => image.asset).map((image, index) => ({
      url: urlFor(image).width(1920).height(1080).url(),
      alt: image.alt || `Gallery image ${index + 1}`,
      fit: "cover" as const,
    })),
  ];
  if (!gallery.length) return null;

  return (
    <section className="mb-12">
      <h4 className="text-2xl font-bold text-[rgb(140,46,71)] mb-6">
        Event Gallery
      </h4>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {gallery.map((image, index) => (
          <div key={`${image.url}-${index}`} className="group">
            <div className="relative aspect-[16/9] overflow-hidden bg-gray-100">
              <Image
                src={image.url}
                alt={image.alt}
                fill
                className={image.fit === "contain"
                  ? "object-contain"
                  : "object-cover transition-transform duration-300 group-hover:scale-105"}
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function RelatedEvents({ events }: { events: Event[] }) {
  if (!events || events.length === 0) return null;

  return (
    <section className="px-4 sm:px-6 lg:px-16 py-16">
      <div className="mx-auto">
        <h2 className="text-3xl md:text-4xl mb-12 text-center">
          Related Events
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
          {events.map((event) => (
            <article
              key={event._id}
              className="group cursor-pointer h-full flex flex-col w-full"
            >
              <Link
                href={`/media/events/${event.slug.current}`}
                className="block w-full max-w-[480px] mx-auto"
              >
                <div className="relative aspect-[23/22] w-full overflow-hidden mb-2 xs:mb-3 sm:mb-4 shadow-sm hover:shadow-md transition-shadow duration-300">
                  <Image
                    src={eventImageUrl(event, 1800, 1600)}
                    alt={event.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300 overflow-hidden"
                    sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                  />

                  {/* Featured Badge */}
                  {event.featured && (
                    <div className="absolute top-2 sm:top-3 md:top-4 right-2 sm:right-3 md:right-4 bg-[rgb(140,46,71)] text-white px-2 sm:px-3 py-1 rounded text-xs sm:text-sm font-medium shadow-sm">
                      Featured
                    </div>
                  )}

                  {/* Date overlay in top-left corner */}
                  <div className="absolute top-2 sm:top-3 md:top-4 left-2 sm:left-3 md:left-4 bg-white text-gray-800 px-2 sm:px-3 py-1 rounded text-xs sm:text-sm font-medium shadow-sm">
                    {eventDateValue(event).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </div>
                </div>

                <div className="px-1 flex-grow flex flex-col justify-start">
                  <h3 className="text-sm sm:text-base md:text-lg lg:text-xl mt-2 sm:mt-3 md:mt-4 text-black leading-tight group-hover:text-[rgb(140,46,71)] transition-colors duration-200 line-clamp-2">
                    {event.title}
                  </h3>
                </div>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

async function EventDetail({ slug }: { slug: string }) {
  const event = await loadEvent(slug);
  if (!event) notFound();

  let relatedCmsEvents: Event[] = [];
  const eventDate = eventDateValue(event);
  const isUpcoming = eventDate > new Date();
  try {
    const startDate = new Date(eventDate.getFullYear(), eventDate.getMonth(), 1).toISOString();
    const endDate = new Date(eventDate.getFullYear(), eventDate.getMonth() + 1, 0).toISOString();
    relatedCmsEvents = await client.fetch<Event[]>(getRelatedEventsQuery, {
      eventId: event._id, startDate, endDate,
    });
  } catch (error) {
    console.error("Error fetching related events:", error);
  }
  const relatedEvents = mergeEvents(relatedCmsEvents)
    .filter((other) => other._id !== event._id &&
      eventDateValue(other).getFullYear() === eventDate.getFullYear() &&
      eventDateValue(other).getMonth() === eventDate.getMonth())
    .slice(0, 3);

  return (
    <>
      {/* Event Content */}
      <Hero
        backgroundSrc="Booking1_rg1bhs_1_krrcq5"
        backgroundType="image"
        overlay="medium"
       breadcrumbs={[
          { label: "Media", href: "/media" },
          { label: "Events", href: "/media/events" },
          { label: event.title, href: `/media/events/${event.slug.current}` },
        ]}
      />
      <div className="mx-auto px-4 sm:px-6 lg:px-16 py-8 sm:py-12 md:py-16 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-24">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="prose prose-lg max-w-none">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-normal text-[rgb(140,46,71)] mb-4">
                {event.title}
              </h2>
              {event.description
                .split(/\n\s*\n/)
                .filter((para) => para.trim())
                .map((para, i) => (
                  <p key={i} className="leading-relaxed">
                    {para}
                  </p>
                ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg p-6 shadow-sm border sticky top-8">
              <h4 className="text-xl font-bold text-[rgb(140,46,71)] mb-6">
                Event Details
              </h4>

              <div className="space-y-6">
                {/* Date is shown without an invented start time for locally supplied events. */}
                <div className="flex items-start">
                  <FiCalendar className="w-5 h-5 text-[rgb(140,46,71)] mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-[rgb(140,46,71)]">
                      {event.eventDate.includes("T") ? "Date & Time" : "Event Date"}
                    </p>
                    <p className="">
                      {eventDate.toLocaleDateString("en-US", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                    {event.eventDate.includes("T") && (
                      <p className="">
                        {eventDate.toLocaleTimeString("en-US", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    )}
                  </div>
                </div>

                {/* Location */}
                <div className="flex items-start">
                  <FiMapPin className="w-5 h-5 text-[rgb(140,46,71)] mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-[rgb(140,46,71)]">
                      Location
                    </p>
                    <p>{event.location}</p>
                  </div>
                </div>

                {/* Status */}
                <div className="flex items-start">
                  <FiCheckCircle className="w-5 h-5 text-[rgb(140,46,71)] mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-[rgb(140,46,71)]">Status</p>
                    <span
                      className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                        isUpcoming
                          ? "bg-green-100 text-green-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {isUpcoming ? "Upcoming" : "Past Event"}
                    </span>
                  </div>
                </div>

                {/* Registration Button */}
                {isUpcoming && (
                  <div className="pt-4 border-t">
                    <Link href="/contact" className="w-full bg-[rgb(140,46,71)] text-white py-3 px-6 rounded-lg font-semibold hover:bg-transparent hover:text-[rgb(140,46,71)] border border-[rgb(140,46,71)] transition-colors flex items-center justify-center">
                      <FiUsers className="w-5 h-5 mr-2" />
                      Register for Event
                    </Link>
                    <p className="text-xs mt-2 text-center">
                      Contact our team for event information
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <EventGallery event={event} />
      </div>

      <RelatedEvents events={relatedEvents} />
    </>
  );
}

export default async function EventDetailPage({
  params,
}: EventDetailPageProps) {
  const { slug } = await params;

  return (
    <div className="min-h-screen relative">
        <EventDetail slug={slug} />
      <div className="border-t">
        <div className="mx-auto px-4 sm:px-6 lg:px-16 py-6">
          <Link
            href="/media/events"
            className="inline-flex items-center text-[rgb(140,46,71)] font-medium transition-colors"
          >
            <FiArrowLeft className="w-4 h-4 mr-2" />
            Back to all events
          </Link>
        </div>
      </div>
    </div>
  );
}