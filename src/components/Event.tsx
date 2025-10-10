"use client";
import React, { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { gsap } from 'gsap'

interface EventCard {
  id: number;
  title: string;
  description: string;
}
const Event: React.FC = () => {
  // Refs for each event card to control GSAP animations
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  // Container ref for GSAP context scope
  const containerRef = useRef<HTMLDivElement | null>(null);
  // State to control when animations should start
  const [shouldAnimate, setShouldAnimate] = useState(false);
  
  // Set refs for each card
  const setCardRef = (index: number) => (el: HTMLDivElement | null) => {
    cardRefs.current[index] = el;
  };

  // Intersection Observer to detect when page comes into view
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // Trigger animations when 82% of container is visible
          if (entry.isIntersecting && entry.intersectionRatio > 0.82) {
            setShouldAnimate(true);
            // Stop observing once animation is triggered (one-time trigger)
            observer.disconnect();
          }
        });
      },
      {
        threshold: 0.82, // Trigger when 82% visible
        rootMargin: '0px' // No additional margin
      }
    );

    observer.observe(container);

    // Cleanup observer on component unmount
    return () => {
      observer.disconnect();
    };
  }, []);

  // GSAP Pendulum Animation Function - Now triggered by scroll
  useEffect(() => {
    // Only run animations when shouldAnimate becomes true
    if (!shouldAnimate) return;
    
    const cards = cardRefs.current.filter(Boolean);
    if (cards.length === 0 || !containerRef.current) return;
    const finalRotations = [6.5, -13, -15, 18, -12];  // Final resting rotations for each card (their natural tilted positions)
    
    // Animation parameters - easily customizable
    const animationConfig = {
      startAngle: 14,        // Initial swing angle in degrees (reduced from 20)
      totalDuration: 4,      // Total time to settle (seconds)
      swingFrequency: 2.0,   // Swings per second
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
          transformOrigin: "50% 0%", // Set transform origin to the pin point (top center where pin is attached)
          rotation: finalRotation + animationConfig.startAngle // Start from final position + swing offset
        });
         
        const tl = gsap.timeline({ delay: index * animationConfig.cardDelay });     

        const swingCount = Math.floor(animationConfig.totalDuration * animationConfig.swingFrequency);  
        const swingDuration = 1 / animationConfig.swingFrequency;   

        // to Create natural pendulum swinging motion
        for (let i = 0; i < swingCount; i++) {
          // Calculate decreasing amplitude for each swing (natural damping)
          const amplitude = animationConfig.startAngle * Math.pow(animationConfig.dampingFactor, i);
          
          // Stop creating swings when amplitude becomes very small (natural cutoff)
          if (amplitude < 0.5) break;
          
          // Alternate direction for each swing
          const direction = i % 2 === 0 ? -1 : 1;
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
  }, [shouldAnimate]); // Now depends on shouldAnimate state 


  // EVENT DATA ARRAY - Contains all 5 event cards information
  const events: EventCard[] = [
    {
      id: 1,
      title: " CodeSprint 3.0 2025", // CARD 1: TOP LEFT BLUE CARD
      description: " CodeSprint 3.0 is the annual 7-hour coding event conducted by GDG NMIT under GeekMayhem (Anaadyanta).🗓️April 4 2025 | 10 A.M. to 5 P.M.📍Room 271, D Block, NMIT  "
    },
    {
      id: 2,
      title: "Winter Tech Arc 2024 ", // CARD 2: TOP RIGHT GREEN CARD
      description: "Hands-on workshop conducted by AI&ML specialist, Tarun R Jain. Includes live demonstrations, Q&A Session and expert insights. 🗓️December 21 2024 | 📍Room 271, D Block, NMIT 🎙️Speaker: Tarun R Jain"
    },
    {
      id: 3,
      title: "Building AI Agents With AutoGen 2025", // CARD 3: BOTTOM LEFT YELLOW CARD
      description: "Hands-on workshop using AutoGen conducted by AI & Data Science specialist, Tezan Sahu. Includes live demonstrations, introduction to AutoGen, Q&A Session and expert insights.🗓️March 28 2025 |📍Room 271, D Block, NMIT 🎙️Speaker: Tezan Sahu"
    },
    {
      id: 4, 
      title: " KubeTools Day 2024", // CARD 4: BOTTOM RIGHT RED CARD
      description: "Hands-on workshop conducted by industry experts, in collaboration with Docker and Kubernetes. Includes live demonstrations, introductions to Docker and Kubernetes Tools,CloudNative practice and Q&A Session.🗓️January 20 2024 |📍Sir M.V. Auditorium, NMIT "
    },
    {
      id: 5,
      title: "NextGen Nexus 2024", // CARD 5: BOTTOM CENTER BLUE CARD
      description: "5 amazing sessions conducted by our in-house GDG specialists over the course of five days. A hybrid experience to learn in a new way.🗓️December 27 2023 - January 03 2024📍Hybrid (Online + Offline)"
    }
  ];

  return (
    <div ref={containerRef} className="min-h-screen bg-white">
      {/* ========== MAIN PAGE CONTAINER ========== */}
      
      {/* ========== PAGE TITLE SECTION ========== */}
      <div className="pt-4 px-8 sm:pt-4 sm:px-12 lg:pt-4   lg:px-15 ">
        <h1 
          className="text-black text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-normal leading-tight"
        >
          Events
        </h1>
      </div>

      {/* ========== CARDS CONTAINER SECTION ========== */}
      <div className="pt-6 px-4 sm:px-6 lg:px-8">
        <div className="relative mx-auto w-full max-w-7xl h-96 md:h-[500px]">
          
          {/* ===== BACKGROUND GRID LINES ===== */}
          <div className="absolute inset-0 space-y-8 md:space-y-8 pt-4">
            {Array(12).fill(null).map((_, index) => (
              <div 
                key={index}
                className="w-full border-t border-gray-300"
              />
            ))}
          </div>

          {/* ===== ALL EVENT CARDS CONTAINER ===== */}
          <div className="absolute inset-0">
                      
            {/* CARD 1: TOP LEFT BLUE CARD (CodeSprint 3.0) */}
            
            <div 
              ref={setCardRef(0)}
              className="absolute -top-[74px] left-[200px] w-[210px] h-[230px] opacity-100"
            >
              {/* CARD 1: Outer White Border Container */}
              <div 
                className="w-full h-full bg-white rounded-[35px] relative shadow-lg border border-[#4588F3]"
              >
                {/* CARD 1: Blue Pin Image */}
                <div 
                  className="absolute z-10 -top-[50px] left-1/2 -translate-x-1/2 w-[100px] h-[100px]"
                >
                  <Image 
                    src="/blue-photoroom.png" 
                    alt="Blue Pin" 
                    width={100}
                    height={100}
                    className="w-full h-full object-contain drop-shadow-[0_2px_4px_rgba(0,0,0,0.2)]"
                  />
                </div>

                {/* CARD 1: Blue Content Container */}
                <div 
                  className="absolute bg-blue-400 rounded-[25px] p-4 top-[40px] left-[15px] right-[15px] bottom-[15px]"
                >
                  {/* CARD 1: Title */}
                  <h3 
                    className="text-black font-bold text-sm mb-2 leading-tight"
                  >
                    {events[0].title}
                  </h3>
                  {/* CARD 1: Description */}
                  <p 
                    className="text-white/90 text-xs leading-snug"
                  >
                    {events[0].description}
                  </p>
                </div>
              </div>
            </div>
 
            {/* CARD 2: TOP RIGHT GREEN CARD  */}
            
            <div 
              ref={setCardRef(1)}
              className="absolute -top-[70px] left-[510px] w-[220px] h-[249px] opacity-100"
            >
              {/* CARD 2: Outer White Border Container */}
              <div 
                className="w-full h-full bg-white rounded-[35px] relative shadow-lg border border-[#34A853]"
              >
                {/* CARD 2: Green Pin Image */}
                <div 
                  className="absolute z-10 -top-[60px] left-1/2 -translate-x-1/2 w-[130px] h-[130px]"
                >
                  <Image 
                    src="/green-photoroom.png" 
                    alt="Green Pin" 
                    width={130}
                    height={130}
                    className="w-full h-full object-contain drop-shadow-[0_2px_4px_rgba(0,0,0,0.2)]"
                  />
                </div>

                {/* CARD 2: Green Content Container */}
                <div 
                  className="absolute rounded-[25px] p-4 top-[40px] left-[15px] right-[15px] bottom-[15px] bg-[#34A853]"
                >
                  {/* CARD 2: Title */}
                  <h3 
                    className="text-black font-bold text-sm mb-2 leading-tight"
                  >
                    {events[1].title}
                  </h3>
                  {/* CARD 2: Description */}
                  <p 
                    className="text-white/90 text-xs leading-snug"
                  >
                    {events[1].description}
                  </p>
                </div>
              </div>
            </div>

            {/* CARD 3: BOTTOM LEFT YELLOW CARD (AutoGen Workshop) */}
           
            <div 
              ref={setCardRef(2)}
              className="absolute top-[180px] -left-[20px] w-[230px] h-[264px] opacity-100"
            >
              {/* CARD 3: Outer White Border Container */}
              <div 
                className="w-full h-full bg-white rounded-[35px] relative shadow-lg border border-[#F3C016]"
              >
                {/* CARD 3: Yellow Pin Image */}
                <div 
                  className="absolute z-10 -top-[75px] left-1/2 -translate-x-1/2 w-[140px] h-[140px]"
                >
                  <Image 
                    src="/yellow.png" 
                    alt="Yellow Pin" 
                    width={140}
                    height={140}
                    className="w-full h-full object-contain drop-shadow-[0_2px_4px_rgba(0,0,0,0.2)]"
                  />
                </div>

                {/* CARD 3: Yellow Content Container */}
                <div 
                  className="absolute rounded-[25px] p-4 top-[40px] left-[15px] right-[15px] bottom-[15px] bg-[#FFD700]"
                >
                  {/* CARD 3: Title */}
                  <h3 
                    className="text-black font-bold text-sm mb-2 leading-tight"
                  >
                    {events[2].title}
                  </h3>
                  {/* CARD 3: Description */}
                  <p 
                    className="text-black/80 text-xs leading-snug"
                  >
                    {events[2].description}
                  </p>
                </div>
              </div>
            </div>

            {/* CARD 4: BOTTOM RIGHT RED CARD */}
            <div 
              ref={setCardRef(3)}
              className="absolute top-[200px] left-[700px] w-[225px] h-[264px] opacity-100"
            >
              {/* CARD 4: Outer White Border Container */}
              <div 
                className="w-full h-full bg-white rounded-[35px] relative shadow-lg border border-[#FF0A0A]"
              >
                {/* CARD 4: Red Pin Image */}
                <div 
                  className="absolute z-10 -top-[60px] left-1/2 -translate-x-1/2 w-[110px] h-[110px]"
                >
                  <Image 
                    src="/red-photoroom.png" 
                    alt="Red Pin" 
                    width={110}
                    height={110}
                    className="w-full h-full object-contain drop-shadow-[0_2px_4px_rgba(0,0,0,0.2)]"
                  />
                </div>

                {/* CARD 4: Red Content Container */}
                <div 
                  className="absolute rounded-[25px] p-4 top-[40px] left-[15px] right-[15px] bottom-[15px] bg-[#EA4335]"
                >
                  {/* CARD 4: Title */}
                  <h3 
                    className="text-white font-bold text-sm mb-2 leading-tight"
                  >
                    {events[3].title}
                  </h3>
                  {/* CARD 4: Description */}
                  <p 
                    className="text-white/90 text-xs leading-snug"
                  >
                    {events[3].description}
                  </p>
                </div>
              </div>
            </div>

           
            {/* CARD 5: BOTTOM CENTER BLUE CARD  */}
          
            <div 
              ref={setCardRef(4)}
              className="absolute top-[180px] left-[310px] w-[210px] h-[235px] opacity-100"
            >
              {/* CARD 5: Outer White Border Container */}
              <div 
                className="w-full h-full bg-white rounded-[35px] relative shadow-lg border border-[#4588F3]"
              >
                {/* CARD 5: Blue Pin Image */}
                <div 
                  className="absolute z-10 -top-[55px] left-1/2 -translate-x-1/2 w-[100px] h-[100px]"
                >
                  <Image 
                    src="/blue-photoroom.png" 
                    alt="Blue Pin" 
                    width={100}
                    height={100}
                    className="w-full h-full object-contain drop-shadow-[0_2px_4px_rgba(0,0,0,0.2)]"
                  />
                </div>

                {/* CARD 5: Blue Content Container */}
                <div 
                  className="absolute bg-blue-400 rounded-[25px] p-4 top-[40px] left-[15px] right-[15px] bottom-[15px]"
                >
                  {/* CARD 5: Title */}
                  <h3 
                    className="text-black font-bold text-sm mb-2 leading-tight"
                  >
                    {events[4].title}
                  </h3>
                  {/* CARD 5: Description */}
                  <p 
                    className="text-white/90 text-xs leading-snug"
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