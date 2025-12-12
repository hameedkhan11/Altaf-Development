import { MediaItem } from "@/lib/media-center/types";
import {  ChevronRight } from "lucide-react";


export const MEDIA_ITEMS: MediaItem[] = [
  {
    name: "Blogs",
    href: "/media/blogs",
    icon: ChevronRight,
  },
  {
    name: "Events",
    href: "/media/events",
    icon: ChevronRight,
  },
  {
    name: "Photo Gallery",
    href: "/media/photos",
    icon: ChevronRight,
  },
  {
    name: "Video Tours",
    href: "/media/videos",
    icon: ChevronRight,
  },
  {
    name: "Virtual Tours",
    href: "/media/virtual-tours",
    icon: ChevronRight,
  },
  // {
  //   name: "Press Releases",
  //   href: "/media/press",
  //   icon: BookOpen,
  //   description: "Latest news & updates",
  //   gradient: "from-teal-500 to-blue-500"
  // }
];