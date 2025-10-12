'use client'
import React, { useState } from 'react'
import Image from 'next/image'

const Team = () => {
  const teamMembers = [
    { name: 'Venkatnarayanan B', role: 'Lead', bgColor: 'bg-yellow-400' },
    { name: 'Tanmay Kadambala', role: 'Co-Lead', bgColor: 'bg-green-400' },
    { name: 'Krishna Shrivastav', role: 'Tech Lead', bgColor: 'bg-blue-400' },
    { name: 'Khushi R', role: 'Pr Lead', bgColor: 'bg-purple-400' },
    { name: 'Isha Sahay', role: 'Content Co-Lead', bgColor: 'bg-red-400' }
  ]

  const profileMembers = [
    {
      name: 'Venkatnarayanan B',
      role: 'Lead',
      bgColor: '#FFD700',
      image: '/venkat_lead-removebg-preview.png',
      quote: "Hey, I'm Venkatnarayanan B, the Lead for our GDG chapter. For me, leadership has always been about empathy and creating a sense of welcome. My main goal here is to ensure that every interaction you have with our community—from visiting our website to seeing a presentation slide—feels intuitive, accessible, and thoughtfully crafted."
    },
    {
      name: 'Tanmay Kadambala',
      role: 'Co-Lead',
      bgColor: '#4ADE80',
      image: '/tanmay_colead-removebg-preview.png',
      quote: "Hi, I'm Tanmay Kadambala, the Co-Lead of our GDG chapter. I believe in collaborative leadership and fostering innovation within our community. My focus is on creating opportunities for members to learn, grow, and connect with like-minded developers."
    },
    {
      name: 'Krishna Shrivastav',
      role: 'Tech Lead',
      bgColor: '#60A5FA',
      image: '/krishna_tech-removebg-preview.png',
      quote: "Hello, I'm Krishna Shrivastav, the Tech Lead for our GDG chapter. I'm passionate about cutting-edge technologies and helping our community stay at the forefront of innovation. My role involves guiding technical discussions and organizing workshops."
    },
    {
      name: 'Khushi R',
      role: 'Pr Lead',
      bgColor: '#A78BFA',
      image: '/khushi_pr-removebg-preview.png',
      quote: "Hey there, I'm Khushi R, the PR Lead for our GDG chapter. I'm all about building connections and spreading the word about our amazing community. My mission is to showcase the incredible work our members do."
    },
    {
      name: 'Isha Sahay',
      role: 'Content Co-Lead',
      bgColor: '#F87171',
      image: '/isha_content_colead-removebg-preview.png',
      quote: "Hi, I'm Isha Sahay, the Content Co-Lead of our GDG chapter. I'm passionate about creating valuable content that educates and inspires our community. From technical blogs to workshop materials, I work to ensure our members have access to high-quality resources."
    }
  ]

  const [currentProfile, setCurrentProfile] = useState(0)

  const nextProfile = () => {
    setCurrentProfile((prev) => (prev + 1) % profileMembers.length)
  }

  const prevProfile = () => {
    setCurrentProfile((prev) => (prev - 1 + profileMembers.length) % profileMembers.length)
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header Section with generous top spacing */}
      <div className="pt-[15px] sm:pt-[20px] md:pt-[50px] pb-[10px] sm:pb-[15px] md:pb-[40px] w-full max-w-7xl mx-auto">
        <div className="flex flex-col items-center px-2 sm:px-4 md:px-8 gap-2 sm:gap-3 md:gap-0 lg:flex-row lg:justify-between lg:items-center">
          {/* Main Heading */}
          <h1 className="text-[16px] xs:text-[18px] sm:text-[22px] md:text-[35px] lg:text-[50px] font-normal text-black text-center lg:text-left lg:ml-[-120px] leading-tight" style={{fontFamily: 'sans-serif', letterSpacing: '0%'}}>
            Meet Our Team Members
          </h1>
          
          {/* All Members Box with layered shadows */}
          <div className="relative lg:mr-[-120px] flex-shrink-0">
            <div className="absolute w-[80px] sm:w-[100px] md:w-[140px] lg:w-[160px] h-[30px] sm:h-[35px] md:h-[45px] lg:h-[50px] bg-[#FF0A0A] rounded-lg" style={{left: '4px', top: '4px'}}></div>
            <div className="absolute w-[80px] sm:w-[100px] md:w-[140px] lg:w-[160px] h-[30px] sm:h-[35px] md:h-[45px] lg:h-[50px] bg-[#4285F4] rounded-lg" style={{left: '3px', top: '3px'}}></div>
            <div className="absolute w-[80px] sm:w-[100px] md:w-[140px] lg:w-[160px] h-[30px] sm:h-[35px] md:h-[45px] lg:h-[50px] bg-[#F9AB00] rounded-lg" style={{left: '2px', top: '2px'}}></div>
            <div className="w-[80px] sm:w-[100px] md:w-[140px] lg:w-[160px] h-[30px] sm:h-[35px] md:h-[45px] lg:h-[50px] bg-white border-2 border-black rounded-lg flex items-center justify-center relative z-10">
              <span className="text-[10px] sm:text-[12px] md:text-[16px] lg:text-[18px] font-bold text-black" style={{fontFamily: 'Product Sans'}}>All Members</span>
            </div>
          </div>
        </div>
      </div>

      {/* Team Cards Section */}
      <div className="px-4 md:px-8 max-w-7xl mx-auto mb-[30px] md:mb-[50px]">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-[8px] sm:gap-[12px] md:gap-[25px] lg:gap-[40px] xl:gap-[70px] justify-items-center">
          {teamMembers.map((member, index) => (
            <div key={index} className="relative mb-6">
              {/* Custom SVG Card Shape */}
              <div className="relative" style={{width: '220px', height: '200px'}}>
                <svg width="220" height="200" viewBox="0 0 201 185" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute inset-0" style={{transform: 'scale(1.1)'}}>
                  <mask id={`path-1-inside-1_4971_513_${index}`} fill="white">
                    <path d="M201 117.143C201 125.427 194.284 132.143 186 132.143H172C163.716 132.143 157 138.858 157 147.143V170C157 178.284 150.284 185 142 185H15C6.71573 185 0 178.284 0 170V131.957C0 125.053 5.59644 119.457 12.5 119.457C19.4036 119.457 25 113.861 25 106.957V15C25 6.71573 31.7157 0 40 0H186C194.284 0 201 6.71573 201 15V117.143Z"/>
                  </mask>
                  <path d="M201 117.143C201 125.427 194.284 132.143 186 132.143H172C163.716 132.143 157 138.858 157 147.143V170C157 178.284 150.284 185 142 185H15C6.71573 185 0 178.284 0 170V131.957C0 125.053 5.59644 119.457 12.5 119.457C19.4036 119.457 25 113.861 25 106.957V15C25 6.71573 31.7157 0 40 0H186C194.284 0 201 6.71573 201 15V117.143Z" fill="white"/>
                  <path d="M186 132.143V131.143H172V132.143V133.143H186V132.143ZM157 147.143H156V170H157H158V147.143H157ZM142 185V184H15V185V186H142V185ZM0 170H1V131.957H0H-1V170H0ZM25 106.957H26V15H25H24V106.957H25ZM40 0V1H186V0V-1H40V0ZM201 15H200V117.143H201H202V15H201ZM186 0V1C193.732 1 200 7.26801 200 15H201H202C202 6.16344 194.837 -1 186 -1V0ZM25 15H26C26 7.26801 32.268 1 40 1V0V-1C31.1634 -1 24 6.16344 24 15H25ZM12.5 119.457V120.457C19.9558 120.457 26 114.413 26 106.957H25H24C24 113.308 18.8513 118.457 12.5 118.457V119.457ZM0 131.957H1C1 125.606 6.14873 120.457 12.5 120.457V119.457V118.457C5.04416 118.457 -1 124.501 -1 131.957H0ZM15 185V184C7.26802 184 1 177.732 1 170H0H-1C-1 178.837 6.16345 186 15 186V185ZM157 170H156C156 177.732 149.732 184 142 184V185V186C150.837 186 158 178.837 158 170H157ZM172 132.143V131.143C163.163 131.143 156 138.306 156 147.143H157H158C158 139.411 164.268 133.143 172 133.143V132.143ZM186 132.143V133.143C194.837 133.143 202 125.979 202 117.143H201H200C200 124.875 193.732 131.143 186 131.143V132.143Z" fill="black" mask={`url(#path-1-inside-1_4971_513_${index})`}/>
                </svg>
                
                {/* Colored background positioned at top right */}
                <div className="absolute top-[5px] right-[5px] w-[180px] h-[130px] rounded-lg overflow-hidden" 
                     style={{backgroundColor: member.bgColor.includes('yellow') ? '#FFD700' : 
                                            member.bgColor.includes('green') ? '#4ADE80' : 
                                            member.bgColor.includes('blue') ? '#60A5FA' : 
                                            member.bgColor.includes('purple') ? '#A78BFA' : '#F87171'}}>
                  <Image 
                    src={index === 0 ? '/venkat_lead-removebg-preview.png' : 
                         index === 1 ? '/tanmay_colead-removebg-preview.png' : 
                         index === 2 ? '/krishna_tech-removebg-preview.png' : 
                         index === 3 ? '/khushi_pr-removebg-preview.png' : 
                         '/isha_content_colead-removebg-preview.png'}
                    alt={member.name}
                    width={180}
                    height={130}
                    className="object-contain w-full h-full"
                  />
                </div>
                
                {/* Text section - kept in left bottom position */}
                <div className="text-left absolute bottom-[10px] md:bottom-[15px] left-[10px] md:left-[15px]">
                  <h3 className="text-[14px] md:text-[16px] font-bold text-black leading-tight mb-1" style={{fontFamily: 'Inter'}}>
                    {member.name}
                  </h3>
                  <p className="text-[12px] md:text-[14px] font-normal text-black" style={{fontFamily: 'Inter'}}>
                    {member.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Google Colors Divider */}
      <div className="px-4 md:px-8 max-w-7xl mx-auto mb-[30px] md:mb-[50px]">
        <div className="relative h-[6px] md:h-[8px] w-full max-w-[600px] md:max-w-[800px] mx-auto md:-ml-20">
          <div className="absolute w-full h-[1.5px] md:h-[2px] bg-black top-0"></div>
          <div className="absolute w-full h-[1.5px] md:h-[2px] bg-[#EA4335] top-[1.5px] md:top-[2px]"></div>
          <div className="absolute w-full h-[1.5px] md:h-[2px] bg-[#4285F4] top-[3px] md:top-[4px]"></div>
          <div className="absolute w-full h-[1.5px] md:h-[2px] bg-[#FBBC04] top-[4.5px] md:top-[6px]"></div>
        </div>
      </div>

      {/* Profile Carousel Section */}
      <div className="px-8 max-w-[1400px] mx-auto pb-[100px] relative">
        <div className="flex items-start gap-[30px] max-w-none">
          {/* Left Side - Profile and Quote */}
          <div className="flex-[3] overflow-hidden">
            <div className="flex transition-transform duration-500 ease-in-out" style={{transform: `translateX(-${currentProfile * 100}%)`}}>
              {profileMembers.map((member, index) => (
                <div key={index} className="flex gap-12 min-w-full">
                  {/* Profile Photo and Info */}
                  <div className="flex-shrink-0">
                    <div className="w-[150px] h-[150px] rounded-2xl flex items-center justify-center mb-4" style={{backgroundColor: member.bgColor}}>
                      <Image 
                        src={member.image}
                        alt={member.name}
                        width={150}
                        height={150}
                        className="rounded-2xl object-contain"
                      />
                    </div>
                    <div className="text-left">
                      <h3 className="text-[18px] font-bold text-black mb-1" style={{fontFamily: 'Inter'}}>{member.name}</h3>
                      <p className="text-[16px] text-black" style={{fontFamily: 'Inter'}}>{member.role}</p>
                    </div>
                  </div>
                  
                  {/* Quote Text */}
                  <div className="flex-1 pt-4 pr-8">
                    <p className="text-[16px] text-black leading-[1.6]" style={{fontFamily: 'Inter'}}>
                      {member.quote}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Right Side - Team Illustration */}
          <div className="flex-[2] -mt-16">
            <Image 
              src="/team-illustration.jpg" 
              alt="Team Illustration" 
              width={700} 
              height={525}
              className="object-contain"
            />
          </div>
        </div>
        
        {/* Navigation Arrows */}
        <div className="flex justify-center gap-8 mt-8">
          {/* Left Arrow */}
          <button 
            onClick={prevProfile}
            className="w-12 h-12 bg-white border-2 border-black rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors duration-200"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15 18L9 12L15 6" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          
          {/* Right Arrow */}
          <button 
            onClick={nextProfile}
            className="w-12 h-12 bg-white border-2 border-black rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors duration-200"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 18L15 12L9 6" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}

export default Team