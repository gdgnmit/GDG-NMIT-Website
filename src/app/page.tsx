import HomePage from "@/components/HomePage";
import Domain from "@/components/Domain";
import Team from "@/components/Team";
import Projects from "@/components/Projects";
import Aboutus from "@/components/Aboutus";
import Event from "@/components/Event";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import WhatWeDo from "@/components/WhatWeDo";

export default function Home() {
  return (
    <>
      <HomePage />
      <WhatWeDo />
      <Domain />
      <Contact />
    </>
  );
}
