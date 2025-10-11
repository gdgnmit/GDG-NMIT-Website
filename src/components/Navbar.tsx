'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'

const Navbar = () => {
  const pathname = usePathname()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  
  const navItems = [
    { name: 'ABOUT US', href: '/about' },
    { name: 'DOMAINS', href: '/domains' },
    { name: 'EVENTS', href: '/events' },
    { name: 'PROJECTS', href: '/projects' },
    { name: 'TEAM', href: '/team' },
    { name: 'CONTACT US', href: '/contact' }
  ]

  return (
    <header className="w-full bg-white py-3 md:py-5 relative">
      <div className="flex items-center justify-between w-full px-4">
        {/* Complete Left - Logo and Text */}
        <div className="flex items-center gap-2 md:gap-4">
          <Image 
            src="/google-logo.jpg" 
            alt="GDG Logo" 
            width={80} 
            height={55}
            className="object-contain bg-transparent md:w-[129px] md:h-[85px]"
          />
          <div>
            <h1 className="text-[18px] md:text-[30px] font-medium text-black leading-tight md:leading-[33.45px]" 
                style={{ fontFamily: 'Montserrat', letterSpacing: '-5%' }}>
              Google Developer Groups
            </h1>
            <p className="text-[12px] md:text-[16px] font-normal text-[#4588F3] leading-tight md:leading-[33.45px] max-w-[300px] md:max-w-[422px]" 
               style={{ fontFamily: 'Poppins', letterSpacing: '1%' }}>
              Nitte Meenakshi Institute of Technology
            </p>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex w-[765px] h-[55px] bg-[#d9d9d9] rounded-[30px] shadow-md items-center justify-center mr-4">
          <div className="flex gap-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`text-[17px] font-medium transition-colors ${
                  pathname === item.href 
                    ? 'text-[#1a73e8]' 
                    : 'text-black hover:text-[#1a73e8]'
                }`}
                style={{ fontFamily: 'Inter' }}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </nav>

        {/* Mobile Hamburger Button */}
        <button 
          className="lg:hidden flex flex-col gap-1 p-2"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <span className={`w-6 h-0.5 bg-black transition-transform ${isMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`}></span>
          <span className={`w-6 h-0.5 bg-black transition-opacity ${isMenuOpen ? 'opacity-0' : ''}`}></span>
          <span className={`w-6 h-0.5 bg-black transition-transform ${isMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></span>
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-white shadow-lg z-50">
          <nav className="flex flex-col py-4">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`px-6 py-3 text-[16px] font-medium transition-colors border-b border-gray-100 ${
                  pathname === item.href 
                    ? 'text-[#1a73e8] bg-blue-50' 
                    : 'text-black hover:text-[#1a73e8] hover:bg-gray-50'
                }`}
                style={{ fontFamily: 'Inter' }}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  )
}

export default Navbar