"use client";
import React, { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { gsap } from 'gsap'
import axios from 'axios'

interface EventCard {
  _id: string;
  title: string;
  description: string;
  date: string;
  venue?: string;
  speaker?: string; 
}
const Event: React.FC = () => {
  // Fallback data with proper structure
  const fallbackEvents: EventCard[] = [
    {
      _id: "1",
      title: " CodeSprint 3.0 2025", // CARD 1: TOP LEFT BLUE CARD
      description: " GDG NMIT annual premium coding extravaganza!  CodeSprint 3.0 is the annual 7-hour coding event conducted by GDG NMIT under GeekMayhem (Anaadyanta).🗓️April 4 2025 | 10 A.M. to 5 P.M.📍Room 271, D Block, NMIT  ",
      date: "04/04/2025",
      venue: "Room 271, D Block, NMIT"
    },
    {
      _id: "2",
      title: "Winter Tech Arc 2024 ", // CARD 2: TOP RIGHT GREEN CARD
      description: " AI Agents : Decoded with hands-on workshop conducted by AI&ML specialist, Tarun R Jain. Includes live demonstrations, Q&A Session and expert insights. 🗓️December 21 2024 | 9 A.M. to 2 P.M. 📍Room 271, D Block, NMIT 🎙️Speaker: Tarun R Jain",
      date: "21/12/2024",
      venue: "Room 271, D Block, NMIT",
      speaker: "Tarun R Jain"
    },
    {
      _id: "3",
      title: "Building AI Agents With AutoGen 2025", // CARD 3: BOTTOM LEFT YELLOW CARD
      description: "AI Agents Workshop using AutoGen and powerpacked sessions! Hands-on workshop using AutoGen conducted by AI & Data Science specialist, Tezan Sahu. Includes live demonstrations, introduction to AutoGen, Q&A Session and expert insights.🗓️March 28 2025 |📍Room 271, D Block, NMIT 🎙️Speaker: Tezan Sahu",
      date: "28/03/2025",
      venue: "Room 271, D Block, NMIT",
      speaker: "Tezan Sahu"
    },
    {
      _id: "4", 
      title: " KubeTools Day 2024", // CARD 4: BOTTOM RIGHT RED CARD
      description: "One-of-a-kind workshop in collaboration with Docker and Kubernetes! Hands-on workshop conducted by industry experts, in collaboration with Docker and Kubernetes. Includes live demonstrations, introductions to Docker and Kubernetes Tools,CloudNative practice and Q&A Session.🗓️January 20 2024 |📍Sir M.V. Auditorium, NMIT ",
      date: "20/01/2024",
      venue: "Sir M.V. Auditorium, NMIT"
    },
    {
      _id: "5",
      title: "NextGen Nexus 2024", // CARD 5: BOTTOM CENTER BLUE CARD
      description: " 5 Days. 5 GDG Speakers. 5 Mindblowing Experiences! five amazing sessions conducted by our in-house GDG specialists over the course of five days. A hybrid experience to learn in a new way.🗓️December 27 2023 - January 03 2024📍Hybrid (Online + Offline)",
      date: "27/12/2023",
      venue: "Hybrid (Online + Offline)"
    }
  ];

  // Refs for each event card to control GSAP animations
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  // Container ref for GSAP context scope
  const containerRef = useRef<HTMLDivElement | null>(null);
  // State to control when animations should start
  const [shouldAnimate, setShouldAnimate] = useState(false);
  
  // State for dynamic events
  const [events, setEvents] = useState<EventCard[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Set refs for each card
  const setCardRef = (index: number) => (el: HTMLDivElement | null) => {
    cardRefs.current[index] = el;
  };

  // Intersection Observer to detect when page comes into view
  useEffect(() => {
    // Only set up observer when data is ready and component is fully rendered
    if (loading || events.length === 0) return;
    
    const container = containerRef.current;
    if (!container) return;

    console.log('Setting up intersection observer');

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          console.log('Intersection ratio:', entry.intersectionRatio);
          // Trigger animations when 60% of card container is visible
          if (entry.isIntersecting && entry.intersectionRatio > 0.6) {
            console.log('Triggering animation');
            setShouldAnimate(true);
            // Stop observing once animation is triggered (one-time trigger)
            observer.disconnect();
          }
        });
      },
      {
        threshold: [0, 0.25, 0.5, 0.75, 1], // Multiple thresholds for reliable detection
        rootMargin: '0px' // No additional margin
      }
    );

    observer.observe(container);

    // Cleanup observer on component unmount
    return () => {
      observer.disconnect();
    };
  }, [loading, events]); // Depend on loading and events being ready

  // GSAP Pendulum Animation Function - Now triggered by scroll AND when events are loaded
  useEffect(() => {
    console.log('Animation effect triggered:', { shouldAnimate, eventsLength: events.length });
    
    // Only run animations when shouldAnimate becomes true AND events are available
    if (!shouldAnimate || events.length === 0) {
      console.log('Animation conditions not met');
      return;
    }
    
    const cards = cardRefs.current.filter(Boolean);
    console.log('Cards found:', cards.length);
    
    if (cards.length === 0 || !containerRef.current) {
      console.log('No cards or container ref');
      return;
    }
    
    console.log('Starting GSAP animations');
    
    const finalRotations = [6.5, -13, -15, 18, -12];  // Final resting rotations for each card (their natural tilted positions)
    
    // Animation parameters - easily customizable
    const animationConfig = {
      startAngle: 14,        // Initial swing angle in degrees (reduced from 20)
      totalDuration: 4,      // Total time to settle (seconds)
      swingFrequency: 2.5,   // Swings per second
      dampingFactor: 0.75,   // How much energy is lost each swing (0.8-0.95)
      cardDelay: 0        // Delay between each card starting (seconds)
    };
    //  GSAP context for proper cleanup and React 18 compatibility
    const ctx = gsap.context(() => {
      cards.forEach((card, index) => {
        if (!card) return;
        // Get the final rotation for this card
        const finalRotation = finalRotations[index] || 0;
        gsap.set(card, { 
          transformOrigin: "50% 0%", 
          rotation: finalRotation + animationConfig.startAngle 
        });
         
        const tl = gsap.timeline({ delay: index * animationConfig.cardDelay });     

        const swingCount = Math.floor(animationConfig.totalDuration * animationConfig.swingFrequency);  
        const swingDuration = 1 / animationConfig.swingFrequency;   

        // to Create natural pendulum swinging motion
        for (let i = 0; i < swingCount; i++) {
          // Calculate decreasing amplitude for each swing (natural damping)
          const amplitude = animationConfig.startAngle * Math.pow(animationConfig.dampingFactor, i);  
          if (amplitude < 0.5) break;
          
          const direction = i % 2 === 0 ? -1 : 1; // Alternate direction for each swing
          const targetAngle = finalRotation + (amplitude * direction);

          tl.to(card, {
            rotation: targetAngle,
            duration: swingDuration,
            ease: "sine.inOut", // Natural pendulum motion
          });
        }
        //  micro-oscillations for the final few swings (very natural settling)
        const microSwings = 3;
        for (let j = 0; j < microSwings; j++) {
          const microAmplitude = 0.5 * Math.pow(0.6, j); // Very small swings
          const microDirection = j % 2 === 0 ? 1 : -1;
          
          tl.to(card, {
            rotation: finalRotation + (microAmplitude * microDirection),
            duration: swingDuration * 0.6, // Faster micro swings
            ease: "sine.inOut"
          });
        }

        // Final settling to the card's natural tilted position
        tl.to(card, {
          rotation: finalRotation,
          duration: swingDuration * 1.5, // Smooth final settle
          ease: "power3.out" // Very smooth final settling
        });
      });
    }, containerRef); // Scope context to container ref

    
    return () => {
      ctx.revert(); // This cleans up ALL animations and sets within this context
    };
  }, [shouldAnimate, events]); // Now depends on both shouldAnimate state AND events being loaded 


  

  // Function to fetch events from API
  const fetchEvents = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await axios.get('/api/events');
      const { pastEvents, upcomingEvents } = response.data;
      
      // Combine past and upcoming events
      const allEvents = [...(pastEvents || []), ...(upcomingEvents || [])];
      
      // Transform events to match our interface
      const transformedEvents: EventCard[] = allEvents.map((event: any) => ({
        _id: event._id,
        title: event.title,
        description: event.description,
        date: event.date,
        venue: event.venue,
        speaker: event.speaker
      }));
      
      // Use API data if we have enough events, otherwise fallback
      setEvents(transformedEvents.length >= 5 ? transformedEvents.slice(0, 5) : fallbackEvents);
    } catch (err) {
      console.error('Failed to fetch events:', err);
      setError('Failed to load events from server');
      // Use fallback data on error
      setEvents(fallbackEvents);
    } finally {
      setLoading(false);
    }
  };

  // Fetch events on component mount
  useEffect(() => {
    fetchEvents();
  }, []);

  // Show professional loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center antialiased">
        <div className="text-center">
          {/* Animated loading spinner */}
          <div className="relative mb-8">
            <div className="animate-spin rounded-full h-20 w-20 border-4 border-gray-200 border-t-blue-500 mx-auto"></div>
            <div className="absolute inset-0 rounded-full h-20 w-20 border-4 border-transparent border-r-green-500 animate-ping mx-auto"></div>
          </div>
          
          {/* Loading text with typing animation */}
          <div className="space-y-3">
            <h2 className="text-2xl font-semibold text-gray-800">Loading Events</h2>
            <div className="flex items-center justify-center space-x-1">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
              <div className="w-2 h-2 bg-yellow-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
              <div className="w-2 h-2 bg-red-500 rounded-full animate-bounce" style={{animationDelay: '0.3s'}}></div>
            </div>
            <p className="text-gray-600">Fetching the latest events from our servers...</p>
          </div>
        </div>
      </div>
    );
  }

  

  return (
    <div 
      className="min-h-screen bg-white antialiased"
      style={{
        MozOsxFontSmoothing: 'grayscale' // No Tailwind equivalent, keeping this one
      }}
    >
      {/* ========== MAIN PAGE CONTAINER ========== */}
      
      {/* ========== PAGE TITLE SECTION ========== */}
      <div className="pt-[5.6px] px-[11.2px] sm:pt-[5.6px] sm:px-[16.8px] lg:pt-[5.6px] lg:px-[21px] ">
        <h1 
          className="text-black text-[42px] sm:text-[56px] lg:text-[70px] xl:text-[84px] font-normal leading-tight"
        >
          Events
        </h1>
      </div>

      {/* ========== CARDS CONTAINER SECTION ========== */}
      <div className="pt-[8.4px] px-[5.6px] sm:px-[8.4px] lg:px-[11.2px]">
        <div 
          ref={containerRef}
          className="relative mx-auto w-full max-w-[1792px] h-[537.6px] md:h-[700px]"
        >
          
          {/* ===== BACKGROUND GRID LINES ===== */}
          <div className="absolute inset-0 space-y-[50px] md:space-y-[50px] pt-[20px]">
            {Array(13).fill(null).map((_, index) => (
              <div 
                key={index}
                className="w-full border-t border-gray-400"
              />
            ))}
          </div>

          {/* ===== ALL EVENT CARDS CONTAINER ===== */}
          <div className="absolute inset-0">
                      
            {/* CARD 1: TOP LEFT BLUE CARD (CodeSprint 3.0) */}
            
            <div 
              ref={setCardRef(0)}
              className="absolute -top-[85px] left-[290px] w-[294px] h-[345px] opacity-100 will-change-transform"
            >
              {/* CARD 1: Outer White Border Container */}
              <div 
                className="w-full h-full bg-white rounded-[49px] relative shadow-lg border border-[#4588F3]"
              >
                {/* CARD 1: Blue Pin Image */}
                <div 
                  className="absolute z-10 -top-[70px] left-1/2 -translate-x-1/2 w-[140px] h-[140px]"
                >
                  <Image 
                    src="/blue-photoroom.png" 
                    alt="Blue Pin" 
                    width={140}
                    height={140}
                    className="w-full h-full object-contain drop-shadow-[0_2px_4px_rgba(0,0,0,0.2)]"
                    priority
                  />
                </div>

                {/* CARD 1: Blue Content Container */}
                <div 
                  className="absolute bg-blue-400 rounded-[35px] p-[16px] top-[56px] left-[21px] right-[21px] bottom-[21px]"
                >
                  {/* CARD 1: Title */}
                  <h3 
                    className="text-black font-bold text-[19.6px] mb-[2.8px] leading-tight"
                  >
                    {events[0].title}
                  </h3>
                  {/* CARD 1: Description */}
                  <p 
                    className="text-white/90 text-[16.8px] leading-snug"
                  >
                    {events[0].description}
                  </p>
                </div>
              </div>
            </div>
 
            {/* CARD 2: TOP RIGHT GREEN CARD  */}
            
            <div 
              ref={setCardRef(1)}
              className="absolute -top-[72px] left-[800px] w-[308px] h-[355px] opacity-100 will-change-transform"
            >
              {/* CARD 2: Outer White Border Container */}
              <div 
                className="w-full h-full bg-white rounded-[49px] relative shadow-lg border border-[#34A853]"
              >
                {/* CARD 2: Green Pin Image */}
                <div 
                  className="absolute z-10 -top-[84px] left-1/2 -translate-x-1/2 w-[182px] h-[182px]"
                >
                  <Image 
                    src="/green-photoroom.png" 
                    alt="Green Pin" 
                    width={182}
                    height={182}
                    className="w-full h-full object-contain drop-shadow-[0_2px_4px_rgba(0,0,0,0.2)]"
                  />
                </div>

                {/* CARD 2: Green Content Container */}
                <div 
                  className="absolute rounded-[35px] p-[16px] top-[56px] left-[21px] right-[21px] bottom-[21px] bg-[#34A853]"
                >
                  {/* CARD 2: Title */}
                  <h3 
                    className="text-black font-bold text-[19.6px] mb-[2.8px] leading-tight"
                  >
                    {events[1].title}
                  </h3>
                  {/* CARD 2: Description */}
                  <p 
                    className="text-white/90 text-[16.8px] leading-snug"
                  >
                    {events[1].description}
                  </p>
                </div>
              </div>
            </div>

            {/* CARD 3: BOTTOM LEFT YELLOW CARD (AutoGen Workshop) */}
           
            <div 
              ref={setCardRef(2)}
              className="absolute top-[300px] -left-[6px] w-[330px] h-[402px] opacity-100 will-change-transform"
            >
              {/* CARD 3: Outer White Border Container */}
              <div 
                className="w-full h-full bg-white rounded-[49px] relative shadow-lg border border-[#F3C016]"
              >
                {/* CARD 3: Yellow Pin Image */}
                <div 
                  className="absolute z-10 -top-[105px] left-1/2 -translate-x-1/2 w-[196px] h-[196px]"
                >
                  <Image 
                    src="/yellow.png" 
                    alt="Yellow Pin" 
                    width={196}
                    height={196}
                    className="w-full h-full object-contain drop-shadow-[0_2px_4px_rgba(0,0,0,0.2)]"
                  />
                </div>

                {/* CARD 3: Yellow Content Container */}
                <div 
                  className="absolute rounded-[35px] p-[16px] top-[56px] left-[21px] right-[21px] bottom-[21px] bg-[#FBBC05]"
                >
                  {/* CARD 3: Title */}
                  <h3 
                    className="text-black font-bold text-[19.6px] mb-[2.8px] leading-tight"
                  >
                    {events[2].title}
                  </h3>
                  {/* CARD 3: Description */}
                  <p 
                    className="text-white/90 text-[16.8px] leading-snug"
                  >
                    {events[2].description}
                  </p>
                </div>
              </div>
            </div>

            {/* CARD 4: BOTTOM RIGHT RED CARD */}
            <div 
              ref={setCardRef(3)}
              className="absolute top-[300px] left-[1100px] w-[330px] h-[390px] opacity-100 will-change-transform"
            >
              {/* CARD 4: Outer White Border Container */}
              <div 
                className="w-full h-full bg-white rounded-[49px] relative shadow-lg border border-[#FF0A0A]"
              >
                {/* CARD 4: Red Pin Image */}
                <div 
                  className="absolute z-10 -top-[84px] left-1/2 -translate-x-1/2 w-[154px] h-[154px]"
                >
                  <Image 
                    src="/red-photoroom.png" 
                    alt="Red Pin" 
                    width={154}
                    height={154}
                    className="w-full h-full object-contain drop-shadow-[0_2px_4px_rgba(0,0,0,0.2)]"
                  />
                </div>

                {/* CARD 4: Red Content Container */}
                <div 
                  className="absolute rounded-[35px] p-[16px] top-[56px] left-[21px] right-[21px] bottom-[21px] bg-[#EA4335]"
                >
                  {/* CARD 4: Title */}
                  <h3 
                    className="text-black font-bold text-[19.6px] mb-[2.8px] leading-tight"
                  >
                    {events[3].title}
                  </h3>
                  {/* CARD 4: Description */}
                  <p 
                    className="text-white/90 text-[16.8px] leading-snug"
                  >
                    {events[3].description}
                  </p>
                </div>
              </div>
            </div>

           
            {/* CARD 5: BOTTOM CENTER BLUE CARD  */}
          
            <div 
              ref={setCardRef(4)}
              className="absolute top-[252px] left-[506px] w-[300px] h-[360px] opacity-100 will-change-transform"
            >
              {/* CARD 5: Outer White Border Container */}
              <div 
                className="w-full h-full bg-white rounded-[49px] relative shadow-lg border border-[#4588F3]"
              >
                {/* CARD 5: Blue Pin Image */}
                <div 
                  className="absolute z-10 -top-[77px] left-1/2 -translate-x-1/2 w-[140px] h-[140px]"
                >
                  <Image 
                    src="/blue-photoroom.png" 
                    alt="Blue Pin" 
                    width={140}
                    height={140}
                    className="w-full h-full object-contain drop-shadow-[0_2px_4px_rgba(0,0,0,0.2)]"
                  />
                </div>

                {/* CARD 5: Blue Content Container */}
                <div 
                  className="absolute bg-blue-400 rounded-[35px] p-[16px] top-[56px] left-[21px] right-[21px] bottom-[21px]"
                >
                  {/* CARD 5: Title */}
                  <h3 
                    className="text-black font-bold text-[19.6px] mb-[2.8px] leading-tight"
                  >
                    {events[4].title}
                  </h3>
                  {/* CARD 5: Description */}
                  <p 
                    className="text-white/90 text-[16.8px] leading-snug"
                  >
                    {events[4].description}
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
      
    </div>
  )
}
export default Event

