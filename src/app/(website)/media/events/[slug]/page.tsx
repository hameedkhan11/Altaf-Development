// app/events/[slug]/page.tsx
import { Suspense } from "react";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  FiCalendar,
  FiMapPin,
  FiUsers,
  FiShare2,
  FiArrowLeft,
  FiCheckCircle,
  FiStar,
} from "react-icons/fi";
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaWhatsapp,
} from "react-icons/fa";
import {
  getEventBySlugQuery,
  getEventSlugsQuery,
  getRelatedEventsQuery,
  urlFor,
  type Event,
} from "@/lib/events/event";
import { client } from "@/lib/sanityService";
import { Hero } from "@/components/common/Hero";


interface EventDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  try {
    const slugs = await client.fetch<string[]>(getEventSlugsQuery);

    return slugs.map((slug) => ({
      slug,
    }));
  } catch (error) {
    console.error("Error generating static params:", error);
    return [];
  }
}

export async function generateMetadata({
  params,
}: EventDetailPageProps): Promise<Metadata> {
  const { slug } = await params;

  try {
    const event = await client.fetch<Event>(getEventBySlugQuery, { slug });

    if (!event) {
      return {
        title: "Event Not Found",
      };
    }

    return {
      title: event.metaTitle || event.title,
      description: event.metaDescription || event.description,
      openGraph: {
        title: event.title,
        description: event.description,
        images: [
          {
            url: urlFor(event.image).width(1920).height(1080).url(),
            width: 1920,
            height: 1080,
            alt: event.title,
          },
        ],
      },
    };
  } catch (error) {
    console.error("Error generating metadata:", error);
    return {
      title: "Event Not Found",
    };
  }
}

function EventGallery({ gallery }: { gallery: Event["gallery"] }) {
  if (!gallery || gallery.length === 0) return null;

  return (
    <section className="mb-12">
      <h4 className="text-2xl font-bold text-[rgb(140,46,71] mb-6">Event Gallery</h4>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {gallery.map((image, index) => (
          <div key={index} className="group cursor-pointer">
            <div className="relative aspect-[16/9] overflow-hidden">
              <Image
                src={urlFor(image).width(1920).height(1080).url()}
                alt={image.alt || `Gallery image ${index + 1}`}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
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
    <section className="py-12 mt-12">
      <div className="mx-auto px-4 sm:px-8 lg:px-12">
        <h2 className="text-3xl font-bold text-[rgb(140,46,71] mb-8 text-center">
          Related Events
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <Link
              key={event._id}
              href={`/events/${event.slug.current}`}
              className="group block bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300"
            >
              <div className="relative h-48">
                <Image
                  src={urlFor(event.image).width(1200).height(800).url()}
                  alt={event.title}
                  fill
                  className="object-cover"
                />
                {event.featured && (
                  <div className="absolute top-3 left-3 bg-yellow-500 text-white px-2 py-1 rounded-full text-xs font-semibold flex items-center">
                    <FiStar className="w-3 h-3 mr-1" />
                    Featured
                  </div>
                )}
              </div>
              <div className="p-4">
                <h3 className="font-semibold transition-colors mb-2">
                  {event.title}
                </h3>
                <div className="flex items-center text-sm text-gray-500">
                  <FiCalendar className="w-4 h-4 mr-2" />
                  {new Date(event.eventDate).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function ShareButtons({ event }: { event: Event }) {
  const shareUrl = typeof window !== "undefined" ? window.location.href : "";
  const shareText = `Check out this event: ${event.title}`;

  const shareLinks = [
    {
      name: "Facebook",
      icon: FaFacebookF,
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
      color: "bg-blue-600 hover:bg-blue-700",
    },
    {
      name: "Twitter",
      icon: FaTwitter,
      url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`,
      color: "bg-blue-400 hover:bg-blue-500",
    },
    {
      name: "LinkedIn",
      icon: FaLinkedinIn,
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
      color: "bg-blue-800 hover:bg-blue-900",
    },
    {
      name: "WhatsApp",
      icon: FaWhatsapp,
      url: `https://wa.me/?text=${encodeURIComponent(`${shareText} ${shareUrl}`)}`,
      color: "bg-green-500 hover:bg-green-600",
    },
  ];

  return (
    <div>
      <h4 className="font-medium text-gray-900 mb-3 flex items-center">
        <FiShare2 className="w-4 h-4 mr-2" />
        Share this event
      </h4>
      <div className="grid grid-cols-2 gap-2">
        {shareLinks.map((link) => (
          <a
            key={link.name}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`${link.color} text-white py-2 px-3 rounded text-sm font-medium transition-colors flex items-center justify-center`}
          >
            <link.icon className="w-4 h-4 mr-2" />
            {link.name}
          </a>
        ))}
      </div>
    </div>
  );
}

function EventDetailSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="h-96rounded-lg mb-8"></div>
      <div className="mx-auto px-4 sm:px-6 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <div className="h-8 bg-gray-300 rounded mb-4"></div>
            <div className="h-4 bg-gray-300 rounded mb-2"></div>
            <div className="h-4 bg-gray-300 rounded mb-8 w-3/4"></div>
            <div className="space-y-2">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="h-4 bg-gray-300 rounded"></div>
              ))}
            </div>
          </div>
          <div>
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="h-6 bg-gray-300 rounded mb-4"></div>
              <div className="space-y-4">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="h-16 bg-gray-300 rounded"></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

async function EventDetail({ slug }: { slug: string }) {
  let event: Event | null = null;
  let relatedEvents: Event[] = [];

  try {
    event = await client.fetch<Event>(getEventBySlugQuery, { slug });

    if (!event) {
      notFound();
    }

    // Get related events
    const eventDate = new Date(event.eventDate);
    const startDate = new Date(
      eventDate.getFullYear(),
      eventDate.getMonth(),
      1
    ).toISOString();
    const endDate = new Date(
      eventDate.getFullYear(),
      eventDate.getMonth() + 1,
      0
    ).toISOString();

    relatedEvents = await client.fetch<Event[]>(getRelatedEventsQuery, {
      eventId: event._id,
      startDate,
      endDate,
    });
  } catch (error) {
    console.error("Error fetching event:", error);
    notFound();
  }

  const eventDate = new Date(event.eventDate);
  const isUpcoming = eventDate > new Date();

  return (
    <>
      {/* Event Content */}
      <Hero 
      backgroundSrc="Booking1_rg1bhs"
      backgroundType="image"
      overlay="medium"

      />
      <div className="mx-auto px-4 sm:px-6 lg:px-16 py-8 sm:py-12 md:py-16 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-24">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="prose prose-lg max-w-none">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-normal text-[rgb(140,46,71)] mb-4">
                {event.title}
              </h2>
              <p className="leading-relaxed">
                {event.description}
              </p>
            </div>

          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg p-6 shadow-sm border sticky top-8">
              <h4 className="text-xl font-bold text-[rgb(140,46,71] mb-6">
                Event Details
              </h4>

              <div className="space-y-6">
                {/* Date & Time */}
                <div className="flex items-start">
                  <FiCalendar className="w-5 h-5 text-[rgb(140,46,71)] mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-[rgb(140,46,71)]">Date & Time</p>
                    <p className="">
                      {eventDate.toLocaleDateString("en-US", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                    <p className="">
                      {eventDate.toLocaleTimeString("en-US", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                </div>

                {/* Location */}
                <div className="flex items-start">
                  <FiMapPin className="w-5 h-5 text-[rgb(140,46,71)] mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-[rgb(140,46,71)]">Location</p>
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
                    <button className="w-full bg-[rgb(140,46,71)] text-white py-3 px-6 rounded-lg font-semibold hover:bg-transparent hover:text-[rgb(140,46,71)] border border-[rgb(140,46,71)] transition-colors flex items-center justify-center">
                      <FiUsers className="w-5 h-5 mr-2" />
                      Register for Event
                    </button>
                    <p className="text-xs mt-2 text-center">
                      Click to register or get more information
                    </p>
                  </div>
                )}

                {/* Share Section */}
                <div className="pt-4 border-t">
                  <ShareButtons event={event} />
                </div>
              </div>
            </div>
          </div>
        </div>
                <EventGallery gallery={event.gallery} />
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
      <Suspense fallback={<EventDetailSkeleton />}>
        <EventDetail slug={slug} />
      </Suspense>

      {/* Back to Events */}
      <div className="bg-white border-t">
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
