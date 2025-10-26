"use client";
import React, { useState, useEffect } from "react";


import Event from '@/components/Event';
import Loader from "@/components/Loader";
import axios from "axios";
import type { EventData } from '@/components/EventCard';

export default function EventPage() {
  const [timerDone, setTimerDone] = useState(false);
  const [events, setEvents] = useState<EventData[]>([]);
  const [dataReady, setDataReady] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => setTimerDone(true), 3500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    async function fetchEvents() {
      try {
        const response = await axios.get("/api/events");
        const { pastEvents, upcomingEvents } = response.data;
        const allEvents = [...(pastEvents || []), ...(upcomingEvents || [])];
        setEvents(allEvents);
      } catch (err) {
        setError("Failed to fetch events");
        setEvents([]);
      } finally {
        setDataReady(true);
      }
    }
    fetchEvents();
  }, []);

  const isReady = timerDone && dataReady;

  if (!isReady) {
    return <Loader className="fixed inset-0 z-[9999] bg-white dark:bg-g-almost-black" />;
  }
  if (error) {
    return <div className="min-h-screen flex items-center justify-center text-red-600">{error}</div>;
  }
  return <Event events={events} />;
}