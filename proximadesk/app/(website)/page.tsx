import * as React from "react";
import {CTABanner} from "@/components/customcomps/CTABanner";
import Footer from "@/components/customcomps/Footer";
import { HeroSectionOne } from "./_components/LandingHero";
import { FeatureSection } from "./_components/FeatueSection";
import { GlobeDemo } from "./_components/Globe";
import PricingPlans from "./_components/Plans";
import { Testimonials } from "./_components/Testimonial";

async function Home() {
  return (
    <main className="flex overflow-hidden flex-col items-start">
      <HeroSectionOne />
      <FeatureSection />
      <GlobeDemo/>
      <PricingPlans/>
      <Testimonials />
      <CTABanner />
      <Footer /> 
    </main>
  );
}

export default Home;
