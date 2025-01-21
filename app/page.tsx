
'use client'

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import AuthButtons from "@/components/auth-buttons";

const Volunteer = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div>
      {/* Navbar */}
      <header className="bg-white shadow-md">
        <nav className="flex mx-auto flex-row items-center justify-between p-4">
          {/* Logo */}
          <div className="flex flex-row w-full">
          <div className="flex items-center space-x-4">
            <Image
              src="/profile.png" // Replace this with your logo file
              alt="Save the Children Logo"
              width={30}
              height={30}
            />
          </div>

          {/* Desktop Menu */}
          <ul className="hidden space-x-6 lg:flex w-full p-4">
            <li><a href="#Volunter1" className="text-gray-700 hover:text-red-600">Who We Are</a></li>
            <li><a href="#what-we-do" className="text-gray-700 hover:text-red-600">What We Do</a></li>
            <li><a href="#" className="text-gray-700 hover:text-red-600">Where We Are</a></li>
            {/* <li><Link href="/dashboard" className="text-gray-700 hover:text-red-600">Dashboard</Link></li>		
            <li><Link href="/sign-up" className="text-gray-700 hover:text-red-600">Register</Link></li>		 */}
          </ul>
          </div>

          {/* Mobile Menu Button */}
          <div>
          <button
            className="lg:hidden text-gray-700"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle navigation"
          >
            <svg
              className="w-6 h-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
          <div className="hidden space-x-6 lg:flex w-full p-4">
          <AuthButtons />

          </div>

          </div>
        </nav>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden bg-white shadow-md">
            <ul className="space-y-4 p-4">
			<nav className="flex flex-row justify-between w-full items-center p-2 bg-slate-50">
			
			<AuthButtons />
		</nav>
            </ul>
          </div>
        )}
      </header>

      {/* Hero Section */}
	  <section id="Volunter1" className="py-16 bg-white">

      <div className="bg-gradient-to-br from-slate-200  py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">Volunteer 1</h1>
          <p className="text-lg">
            Our volunteers are amazing people who give their time to support our
            programs and events in the Philippines.
          </p>
        </div>
      </div>
	  </section>

	
      {/* Who Can Volunteer Section */}
      <section id="what-we-do" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-center mb-6">What We Do</h2>
          <p className="text-center">
            Learn about our programs, initiatives, and how we are making a difference in the lives of children and communities across the Philippines.
			Learn about our programs, initiatives, and how we are making a difference in the lives of children and communities across the Philippines.
            Learn about our programs, initiatives, and how we are making a difference in the lives of children and communities across the Philippines.
            Learn about our programs, initiatives, and how we are making a difference in the lives of children and communities across the Philippines.
            Learn about our programs, initiatives, and how we are making a difference in the lives of children and communities across the Philippines.
            Learn about our programs, initiatives, and how we are making a difference in the lives of children and communities across the Philippines.
            Learn about our programs, initiatives, and how we are making a difference in the lives of children and communities across the Philippines.
            Learn about our programs, initiatives, and how we are making a difference in the lives of children and communities across the Philippines.
            Learn about our programs, initiatives, and how we are making a difference in the lives of children and communities across the Philippines.
            Learn about our programs, initiatives, and how we are making a difference in the lives of children and communities across the Philippines.
            Learn about our programs, initiatives, and how we are making a difference in the lives of children and communities across the Philippines.
            Learn about our programs, initiatives, and how we are making a difference in the lives of children and communities across the Philippines.
            Learn about our programs, initiatives, and how we are making a difference in the lives of children and communities across the Philippines.

		  </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-gray-400 text-sm py-4">
        <div className="container mx-auto px-4 text-center flex justify-between items-center">
          {/* Add footer content here */}
        </div>
      </footer>
    </div>
  );
};

export default Volunteer;
