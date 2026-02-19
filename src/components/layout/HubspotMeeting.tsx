"use client";

import { useEffect, useRef } from "react";

interface HubSpotMeetingsProps {
  meetingUrl: string;
}

const HubSpotMeetings = ({ meetingUrl }: HubSpotMeetingsProps) => {
  const scriptLoaded = useRef(false);

  useEffect(() => {
    if (scriptLoaded.current) return;
    scriptLoaded.current = true;

    const script = document.createElement("script");
    script.src =
      "https://static.hsappstatic.net/MeetingsEmbed/ex/MeetingsEmbedCode.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  return (
    <div
      className="meetings-iframe-container w-full min-h-[700px]"
      data-src={`${meetingUrl}?embed=true`}
    />
  );
};

export default HubSpotMeetings;