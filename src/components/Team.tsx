"use client";
import React, { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import axios from "axios";

interface Member {
  _id: string;
  name: string;
  role: string;
  domain: string;
  tier: string;
  photoUrl?: string;
  teamId: string;
  linkedinUrl?: string;
  githubUrl?: string;
  twitterUrl?: string;
}

interface DomainMembers {
  [tier: string]: Member[] | { past?: Member[]; recruit?: Member[] };
}

interface TeamData {
  team: {
    _id: string;
    year: string;
    name: string;
    members: Record<string, string[]>;
  };
  members: Record<string, DomainMembers>;
  year: string;
}

const primaryColors = [
  "bg-[#4285F4]",
  "bg-[#EA4335]",
  "bg-[#FBBC04]",
  "bg-[#34A853]",
];

const secondaryColors = [
  "bg-[#669DF6]",
  "bg-[#F28B82]",
  "bg-[#FDD663]",
  "bg-[#81C995]",
];

// SVG path data with stroke for "inside stroke" effect
const maskPaths = [
  "M20 2H380C389.941 2 398 10.0589 398 20V380C398 389.941 389.941 398 380 398H20C10.0589 398 2 389.941 2 380V20C2 10.0589 10.0589 2 20 2Z",
  "M20 2H380C389.941 2.00002 398 10.0589 398 20V380C398 389.941 389.941 398 380 398H150.512C140.571 398 132.512 389.941 132.512 380V333.924C132.512 321.774 122.662 311.924 110.512 311.924H20C10.0589 311.924 2 303.865 2 293.924V20C2.00001 10.0589 10.0589 2 20 2Z",
  "M20 2H380C389.941 2 398 10.0589 398 20V380C398 389.941 389.941 398 380 398H20C10.0589 398 2 389.941 2 380V290.524C2 280.583 10.0589 272.524 20 272.524H47.3115C59.4617 272.524 69.3115 262.675 69.3115 250.524V173.346C69.3115 161.195 59.4617 151.346 47.3115 151.346H20C10.059 151.346 2.00017 143.287 2 133.346V20C2.00001 10.0589 10.0589 2 20 2Z",
  "M20 2H380C389.941 2 398 10.0589 398 20V168.8C398 178.741 389.941 186.8 380 186.8H356.06C343.909 186.8 334.06 196.65 334.06 208.8V212.32C334.06 224.47 343.909 234.32 356.06 234.32H380C389.941 234.32 398 242.379 398 252.32V380C398 389.941 389.941 398 380 398H20C10.0589 398 2 389.941 2 380V20C2 10.0589 10.0589 2 20 2Z",
  "M20 2H380C389.941 2 398 10.0589 398 20V140.181C398 150.122 389.941 158.181 380 158.181H336.63C324.48 158.181 314.63 168.031 314.63 180.181V249.684C314.63 261.834 324.48 271.684 336.63 271.684H380C389.941 271.684 398 279.742 398 289.684V380C398 389.941 389.941 398 380 398H20C10.0589 398 2 389.941 2 380V332.217C2.00023 322.276 10.059 314.217 20 314.217H68.6914C80.8417 314.217 90.6914 304.367 90.6914 292.217V265.249C90.6914 253.099 80.8417 243.249 68.6914 243.249H20C10.0589 243.249 2.00008 235.19 2 225.249V20C2 10.0589 10.0589 2 20 2Z",
  "M20 2H380C389.941 2.00001 398 10.0589 398 20V380C398 389.941 389.941 398 380 398H167.583C157.642 398 149.583 389.941 149.583 380V363.564C149.583 351.414 139.733 341.565 127.583 341.564H72.9258C60.7757 341.565 50.9258 351.414 50.9258 363.564V380C50.9258 389.941 42.8669 398 32.9258 398H20C10.0589 398 2 389.941 2 380V20C2 10.0589 10.0589 2 20 2Z",
  "M2 380L2 20C2 10.0589 10.0589 2 20 2H380C389.941 2 398 10.0589 398 20V296.5C398 306.441 389.941 314.5 380 314.5H254.5C242.35 314.5 232.5 324.35 232.5 336.5V380C232.5 389.941 224.441 398 214.5 398H20C10.0589 398 2 389.941 2 380Z",
];

// Generate mask and stroke data URIs at module load (zero HTTP requests)
const masks = maskPaths.map((pathData) => {
  // For mask: path with both fill and stroke black (creates inside stroke effect)
  const maskSvg = `<svg width="400" height="400" viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="${pathData}" fill="black" stroke="black" stroke-width="4"/></svg>`;

  // For visible stroke: store the path data to render as inline SVG (allows currentColor to work)
  return {
    mask: `data:image/svg+xml;base64,${btoa(maskSvg)}`,
    strokePath: pathData,
  };
});

const tierRank: Record<string, number> = {
  "faculty advisor": 12,
  lead: 11,
  "co-lead": 10,
  "student-advisor": 9,
  mentor: 8,
  core: 7,
  // domain specific members
  tech: 6,
  "pr & marketing": 5,
  operations: 4,
  design: 3,
  "social media": 2,
  "content and documentation": 1,
  // generic tiers
  member: -2,
  past: -3,
  recruit: -4,
};

const Team = () => {
  const [teamData, setTeamData] = useState<TeamData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTeamData = async () => {
      try {
        setLoading(true);

        const teamsResponse = await axios.get("/api/teams");
        const teams = teamsResponse.data?.teams || [];

        if (teams.length === 0) {
          setError("No teams found");
          return;
        }

        const latestTeam = teams[0];
        setTeamData(latestTeam);
        setError(null);
      } catch (err) {
        console.error("Failed to fetch team data:", err);
        setError("Failed to load team members");
      } finally {
        setLoading(false);
      }
    };

    fetchTeamData();
  }, []);

  const groupedMembers = useMemo(() => {
    if (!teamData) return {};

    const grouped: Record<string, Member[]> = {};

    Object.entries(teamData.members).forEach(([domain, tiers]) => {
      grouped[domain] = [];

      Object.entries(tiers).forEach(([tier, members]) => {
        if (
          tier === "member" &&
          typeof members === "object" &&
          !Array.isArray(members)
        ) {
          if (members.past) {
            grouped[domain].push(...members.past);
          }
          if (members.recruit) {
            grouped[domain].push(...members.recruit);
          }
        } else if (Array.isArray(members)) {
          grouped[domain].push(...members);
        }
      });

      grouped[domain].sort((a, b) => {
        const rankA = tierRank[a.tier] || 0;
        const rankB = tierRank[b.tier] || 0;
        if (rankB !== rankA) return rankB - rankA;
        return 0;
      });
    });

    return grouped;
  }, [teamData]);

  const domainNames: Record<string, string> = {
    club: "Club Ops",
    tech: "Technical Team",
    design: "Design Team",
    "content and documentation": "Content & Documentation",
    "pr & marketing": "PR & Marketing",
    "social media": "Social Media",
    operations: "Operations",
  };

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
            Loading team members...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <p className="text-lg text-red-600">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-g-almost-black pt-16">
      <div className="pt-12 px-6 max-w-7xl mx-auto pb-16">
        <div className="mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white capitalize">
            Meet Our Team Members
          </h2>
        </div>

        {Object.keys(groupedMembers).map((domain) => {
          const domainMembers = groupedMembers[domain] || [];

          if (domainMembers.length === 0) return null;

          return (
            <div key={domain} className="mb-16">
              <div className="mb-8">
                <h3 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-gray-200 capitalize">
                  {domainNames[domain] || domain}
                </h3>
                <div className="h-1 w-16 bg-gradient-to-r from-g-blue via-g-red to-g-yellow rounded-full mt-2"></div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 justify-items-center">
                {domainMembers.map((member, index) => {
                  const colorIndex = index % 4;
                  const maskIndex = index % masks.length;

                  return (
                    <div
                      key={member._id}
                      className="w-full max-w-[80%] sm:max-w-[220px] mx-auto"
                    >
                      {member.photoUrl && (
                        <div className="mb-4 relative group">
                          <div className="relative w-full aspect-square">
                            <div
                              className={`relative w-full aspect-square ${secondaryColors[colorIndex]} transition-all duration-300`}
                              style={{
                                WebkitMaskImage: `url(${masks[maskIndex].mask})`,
                                maskImage: `url(${masks[maskIndex].mask})`,
                                WebkitMaskSize: "100%",
                                maskSize: "100%",
                                WebkitMaskRepeat: "no-repeat",
                                maskRepeat: "no-repeat",
                                WebkitMaskPosition: "center",
                                maskPosition: "center",
                              }}
                            >
                              <Image
                                src={member.photoUrl}
                                alt={member.name}
                                fill
                                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 220px"
                                className="object-cover md:grayscale-[90%] md:group-hover:grayscale-0 transition-all duration-300"
                              />
                            </div>

                            <svg
                              className="absolute inset-0 w-full h-full text-black dark:text-white pointer-events-none z-10"
                              viewBox="0 0 400 400"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d={masks[maskIndex].strokePath}
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="4"
                              />
                            </svg>
                          </div>
                        </div>
                      )}

                      <div
                        className={`z-5 w-full ${primaryColors[colorIndex]} rounded-full border-3 border-black dark:border-white py-2 px-4`}
                      >
                        <p className="text-center text-sm font-semibold text-black truncate">
                          {member.role}
                        </p>
                      </div>

                      <div
                        className={`transform -translate-y-[2px] w-full ${secondaryColors[colorIndex]} rounded-full border-3 border-black dark:border-white py-4 px-4`}
                      >
                        <p className="text-center text-lg font-bold text-black">
                          {member.name}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Team;
