"use client";
import React, { useState, useEffect } from "react";


import Event from '@/components/Event';
import axios from "axios";
import type { EventData } from '@/components/EventCard';

export default function EventPage() {
  const [events, setEvents] = useState<EventData[]>([]);
  const [dataReady, setDataReady] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchEvents() {
      try {
        const response = await axios.get("/api/events");
        const { pastEvents, upcomingEvents } = response.data;
        const combined = [...(pastEvents || []), ...(upcomingEvents || [])];

        const parseDate = (d: string) => {
          if (!d) return 0;
          const parts = d.split("/").map(Number);
          if (parts.length !== 3) return 0;
          const [day, month, year] = parts;
          return new Date(year, (month || 1) - 1, day || 1).getTime();
        };

        const sortedEvents = combined.sort((a, b) => {
          return parseDate(b.date) - parseDate(a.date); // Stack order: newest on top, oldest on the bottom
        });

        setEvents(sortedEvents);
      } catch (err) {
        setError("Failed to fetch events");
        setEvents([]);
      } finally {
        setDataReady(true);
      }
    }
    fetchEvents();
  }, []);

  const isReady = dataReady;

  if (!isReady) {
    return <div className="min-h-screen" />;
  }
  if (error) {
    return <div className="min-h-screen flex items-center justify-center text-red-600">{error}</div>;
  }
  return <Event events={events} />;
}
