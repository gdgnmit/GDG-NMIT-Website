"use client";
import React, {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  useMemo,
} from "react";
import { gsap } from "gsap";
import axios from "axios";
import EventCard, { CardConfig, EventData } from "./EventCard";

// Base card configs cycle through Google brand palette in B → G → Y → R order
const BASE_CARD_CONFIGS: CardConfig[] = [
  {
    color: { bg: "bg-[#1A73E8]", border: "border-[#1A73E8]" },
    text: {
      heading: "text-white",
      meta: "text-white",
      body: "text-white/95",
      icon: "text-white",
    },
    pin: { image: "/blue-photoroom.png", size: 120 },
  },
  {
    color: { bg: "bg-[#0F9D58]", border: "border-[#0F9D58]" },
    text: {
      heading: "text-white",
      meta: "text-white",
      body: "text-white/95",
      icon: "text-white",
    },
    pin: { image: "/green-photoroom.png", size: 140 },
  },
  {
    color: { bg: "bg-[#F9AB00]", border: "border-[#F9AB00]" },
    text: {
      heading: "text-gray-900",
      meta: "text-gray-900",
      body: "text-gray-800",
      icon: "text-gray-800",
    },
    pin: { image: "/yellow.png", size: 150 },
  },
  {
    color: { bg: "bg-[#DB4437]", border: "border-[#DB4437]" },
    text: {
      heading: "text-white",
      meta: "text-white",
      body: "text-white/95",
      icon: "text-white",
    },
    pin: { image: "/red-photoroom.png", size: 140 },
  },
];

const BASE_POSITIONS = [
  { top: 50, left: "0%" },
  { top: 80, left: "35%" },
  { top: 20, left: "70%" },
  { top: 600, left: "15%" },
  { top: 570, left: "65%" },
] as const;

const BASE_TOP_VALUES = BASE_POSITIONS.map((pos) => pos.top);
const BASE_PATTERN_HEIGHT =
  Math.max(...BASE_TOP_VALUES) - Math.min(...BASE_TOP_VALUES);
const ROW_VERTICAL_GAP = 48;
const ROW_SPACING = BASE_PATTERN_HEIGHT + ROW_VERTICAL_GAP;
const DEFAULT_ROW_SPACING = ROW_SPACING;
const LINE_SPACING = 60;

type LayoutState = {
  offsets: number[];
  minHeight: number;
};

const Event: React.FC = () => {
  // State management
  const [events, setEvents] = useState<EventData[]>([]);
  const [loading, setLoading] = useState(true);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [shouldAnimate, setShouldAnimate] = useState(false);
  const [layoutState, setLayoutState] = useState<LayoutState>({
    offsets: [],
    minHeight: 1000,
  });

  // Fallback event data
  const fallbackEvents: EventData[] = [
    {
      _id: "1",
      title: "CodeSprint 3.0 2025",
      description:
        "GDG NMIT's annual premium coding extravaganza! Join us for a 7-hour coding event with competitive programming challenges, problem-solving, and networking opportunities.",
      date: "April 4, 2025 | 10 AM - 5 PM",
      venue: "Room 271, D Block, NMIT",
    },
    {
      _id: "2",
      title: "Winter Tech Arc 2024",
      description:
        "AI Agents: Decoded - A hands-on workshop exploring AI agents with live demonstrations, Q&A sessions, and expert insights into cutting-edge AI technologies.",
      date: "December 21, 2024 | 9 AM - 2 PM",
      venue: "Room 271, D Block, NMIT",
      speaker: "Tarun R Jain",
    },
    {
      _id: "3",
      title: "Building AI Agents With AutoGen",
      description:
        "Dive into the world of AI agents with AutoGen! Features live demonstrations, comprehensive introduction to AutoGen framework, and expert guidance on building intelligent agents.",
      date: "March 28, 2025",
      venue: "Room 271, D Block, NMIT",
      speaker: "Tezan Sahu",
    },
    {
      _id: "4",
      title: "KubeTools Day 2024",
      description:
        "A one-of-a-kind workshop in collaboration with Docker and Kubernetes! Learn container orchestration, cloud-native practices, and modern DevOps tools.",
      date: "January 20, 2024",
      venue: "Sir M.V. Auditorium, NMIT",
    },
    {
      _id: "5",
      title: "NextGen Nexus 2024",
      description:
        "5 Days. 5 GDG Speakers. 5 Mindblowing Experiences! Join our in-house GDG specialists for five amazing sessions. A unique hybrid learning experience.",
      date: "December 27, 2023 - January 3, 2024",
      venue: "Hybrid (Online + Offline)",
    },
  ];

  // Fetch events from API
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        const response = await axios.get("/api/events");
        const { pastEvents, upcomingEvents } = response.data;

        const allEvents = [...(pastEvents || []), ...(upcomingEvents || [])];
        const transformedEvents: EventData[] = allEvents.map(
          (event: EventData) => ({
            _id: event._id,
            title: event.title,
            description: event.description,
            date: event.date,
            venue: event.venue,
            speaker: event.speaker,
          })
        );

        setEvents(
          transformedEvents.length >= 5
            ? transformedEvents.slice(0, 5)
            : fallbackEvents
        );
      } catch (err) {
        console.error("Failed to fetch events:", err);
        setEvents(fallbackEvents);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Intersection Observer for animation trigger
  useEffect(() => {
    if (loading || events.length === 0) return;

    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > 0.3) {
            setShouldAnimate(true);
            observer.disconnect();
          }
        });
      },
      { threshold: [0, 0.3, 0.5, 0.75, 1] }
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, [loading, events]);

  // Pendulum animation
  useEffect(() => {
    if (!shouldAnimate || events.length === 0) return;

    const cards = cardRefs.current.filter(Boolean);
    if (cards.length === 0 || !containerRef.current) return;

    const finalRotations = [3, -2, 4, -3, 2];
    const ctx = gsap.context(() => {
      cards.forEach((card, index) => {
        if (!card) return;

        const finalRotation =
          finalRotations[index % finalRotations.length] || 0;
        gsap.set(card, {
          transformOrigin: "50% 0%",
          rotation: finalRotation + 15,
        });

        const tl = gsap.timeline({ delay: index * 0.1 });

        // Pendulum swings
        for (let i = 0; i < 8; i++) {
          const amplitude = 15 * Math.pow(0.7, i);
          if (amplitude < 0.5) break;

          const direction = i % 2 === 0 ? -1 : 1;
          tl.to(card, {
            rotation: finalRotation + amplitude * direction,
            duration: 0.3,
            ease: "sine.inOut",
          });
        }

        tl.to(card, {
          rotation: finalRotation,
          duration: 0.4,
          ease: "power3.out",
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, [shouldAnimate, events]);

  // Set card refs
  const setCardRef = (index: number) => (el: HTMLDivElement | null) => {
    cardRefs.current[index] = el;
  };

  useEffect(() => {
    cardRefs.current = cardRefs.current.slice(0, events.length);
  }, [events]);

  useLayoutEffect(() => {
    if (loading || events.length === 0) return;

    const cards = cardRefs.current.slice(0, events.length);
    if (cards.length === 0) return;

    const baseCount = BASE_POSITIONS.length;
    const totalRows = Math.ceil(events.length / baseCount);
    const offsets: number[] = [];
    let currentOffset = 0;
    let overallMaxBottom = 0;

    for (let row = 0; row < totalRows; row++) {
      offsets[row] = currentOffset;

      let rowMaxBottom = 0;
      for (let i = 0; i < baseCount; i++) {
        const cardIndex = row * baseCount + i;
        if (cardIndex >= events.length) {
          break;
        }

        const card = cards[cardIndex];
        if (!card) continue;

        const baseTop = BASE_POSITIONS[i].top;
        const height = card.offsetHeight;
        rowMaxBottom = Math.max(rowMaxBottom, currentOffset + baseTop + height);
      }

      if (rowMaxBottom === 0) {
        rowMaxBottom = currentOffset + BASE_PATTERN_HEIGHT;
      }

      overallMaxBottom = Math.max(overallMaxBottom, rowMaxBottom);
      currentOffset = rowMaxBottom + ROW_VERTICAL_GAP;
    }

    const desiredMinHeight = Math.max(1000, overallMaxBottom + 120);

    setLayoutState((prev) => {
      const offsetsChanged =
        prev.offsets.length !== offsets.length ||
        offsets.some((value, idx) => value !== prev.offsets[idx]);

      if (!offsetsChanged && prev.minHeight === desiredMinHeight) {
        return prev;
      }

      return {
        offsets,
        minHeight: desiredMinHeight,
      };
    });
  }, [events, loading]);

  // Fetch events on component mount
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        const response = await axios.get("/api/events");
        const { pastEvents, upcomingEvents } = response.data;

        const allEvents = [...(pastEvents || []), ...(upcomingEvents || [])];
        const transformedEvents: EventData[] = allEvents.map(
          (event: EventData) => ({
            _id: event._id,
            title: event.title,
            description: event.description,
            date: event.date,
            venue: event.venue,
            speaker: event.speaker,
          })
        );

        setEvents(
          transformedEvents.length >= 5
            ? transformedEvents.slice(0, 5)
            : fallbackEvents
        );
      } catch (err) {
        console.error("Failed to fetch events:", err);
        setEvents(fallbackEvents);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Memoize event card data to avoid recalculating positions on every render
  const eventCardsData = useMemo(() => {
    return events.map((event, index) => ({
      event,
      config: BASE_CARD_CONFIGS[index % BASE_CARD_CONFIGS.length],
      basePosition: BASE_POSITIONS[index % BASE_POSITIONS.length],
      row: Math.floor(index / BASE_POSITIONS.length),
    }));
  }, [events]);

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-g-almost-black flex items-center justify-center">
        <div
          className="flex flex-col items-center gap-2"
          role="status"
          aria-live="polite"
        >
          <svg
            className="animate-spin fill-neutral-400 dark:fill-neutral-500"
            xmlns="http://www.w3.org/2000/svg"
            height="56px"
            viewBox="0 -960 960 960"
            width="56px"
          >
            <path d="M480-80q-82 0-155-31.5t-127.5-86Q143-252 111.5-325T80-480q0-83 31.5-155.5t86-127Q252-817 325-848.5T480-880q17 0 28.5 11.5T520-840q0 17-11.5 28.5T480-800q-133 0-226.5 93.5T160-480q0 133 93.5 226.5T480-160q133 0 226.5-93.5T800-480q0-17 11.5-28.5T840-520q17 0 28.5 11.5T880-480q0 82-31.5 155t-86 127.5q-54.5 54.5-127 86T480-80Z" />
          </svg>
          <p className="text-center font-medium text-neutral-600 dark:text-neutral-400">
            Loading events...
          </p>
        </div>
      </div>
    );
  }

  const getRowOffset = (row: number) =>
    layoutState.offsets[row] ?? row * DEFAULT_ROW_SPACING;
  const containerMinHeight = layoutState.minHeight;
  const lineCount = Math.max(16, Math.ceil(containerMinHeight / LINE_SPACING));

  return (
    <section className="bg-white pt-16 dark:bg-g-almost-black">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-12 lg:py-16">
        {/* Page Heading - Consistent with other pages */}
        <div className="mb-12">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white">
            Events
          </h1>
          <div className="h-1 w-20 bg-gradient-to-r from-g-blue via-g-red to-g-yellow rounded-full mt-2"></div>
        </div>

        {/* Desktop: Pinboard Layout */}
        <div className="hidden lg:block">
          <div
            ref={containerRef}
            className="relative w-full min-h-[1000px]"
            style={{ minHeight: `${containerMinHeight}px` }}
          >
            {/* Background ruled lines */}
            <div
              className="absolute inset-0 pointer-events-none z-0"
              style={{ height: `${containerMinHeight}px` }}
            >
              {Array.from({ length: lineCount }).map((_, i) => (
                <div
                  key={i}
                  className="w-full border-t border-gray-200 dark:border-gray-800"
                  style={{ marginTop: i === 0 ? "0" : `${LINE_SPACING}px` }}
                />
              ))}
            </div>

            {/* Event Cards */}
            {eventCardsData.map(
              ({ event, config, basePosition, row }, index) => {
                const top = basePosition.top + getRowOffset(row);

                return (
                  <div
                    key={event._id}
                    ref={setCardRef(index)}
                    className="absolute w-[320px] will-change-transform z-10"
                    style={{ top: `${top}px`, left: basePosition.left }}
                  >
                    {/* Card Container */}
                    <EventCard
                      event={event}
                      config={config}
                      variant="desktop"
                    />
                  </div>
                );
              }
            )}
          </div>
        </div>

        {/* Mobile & Tablet: Grid Layout */}
        <div className="lg:hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 md:gap-x-8 gap-y-10 md:gap-y-14">
            {events.map((event, index) => {
              const config =
                BASE_CARD_CONFIGS[index % BASE_CARD_CONFIGS.length];

              return (
                <div key={event._id} className="mx-auto w-full max-w-[400px]">
                  {/* Card Container */}
                  <EventCard event={event} config={config} variant="mobile" />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Event;
