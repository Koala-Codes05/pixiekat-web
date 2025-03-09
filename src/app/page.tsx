/**
 * Homepage component that serves as the landing page.
 * Currently includes:
 * - Hero section
 * - Will be expanded to include featured products, categories, and other homepage elements
 */

import HeroSection from "@/components/Homepage/HeroSection";
import TrendyGamesSection from "@/components/Homepage/TrendyGamesSection";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <TrendyGamesSection />
    </main>
  );
}
