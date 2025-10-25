"use client";
import React, { useState, useEffect } from "react";
import Team from '@/components/Team';
import Loader from "@/components/Loader";
import axios from "axios";

export default function TeamPage() {
  const [timerDone, setTimerDone] = useState(false);
  const [teamData, setTeamData] = useState<any>(null);
  const [dataReady, setDataReady] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => setTimerDone(true), 3500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    async function fetchTeamData() {
      try {
        const teamsResponse = await axios.get("/api/teams");
        const teams = teamsResponse.data?.teams || [];
        if (teams.length === 0) {
          setError("No teams found");
          setTeamData(null);
        } else {
          setTeamData(teams[0]);
          setError(null);
        }
      } catch (err) {
        setError("Failed to load team members");
        setTeamData(null);
      } finally {
        setDataReady(true);
      }
    }
    fetchTeamData();
  }, []);

  const isReady = timerDone && dataReady;

  if (!isReady) {
    return <Loader className="fixed inset-0 z-[9999] bg-white dark:bg-g-almost-black" />;
  }
  if (error) {
    return <div className="min-h-screen flex items-center justify-center text-red-600">{error}</div>;
  }
  return <Team teamData={teamData} />;
}