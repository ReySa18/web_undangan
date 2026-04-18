import HeroSection from "@/components/HeroSection";
import StoryTimeline from "@/components/StoryTimeline";
import { BrideProfileSection, GroomProfileSection } from "@/components/CoupleProfiles";
import EventDetails from "@/components/EventDetails";
import MapSection from "@/components/MapSection";
import InteractiveGallery from "@/components/InteractiveGallery";
import GiftSection from "@/components/GiftSection";
import RsvpForm from "@/components/RsvpForm";
import Footer from "@/components/Footer";
import FabRsvp from "@/components/FabRsvp";
import SectionScroller from "@/components/SectionScroller";
import MusicPlayer from "@/components/MusicPlayer";

export default function Home() {
  return (
    <SectionScroller>
      <main className="min-h-screen">
        <HeroSection />
        <GroomProfileSection />
        <BrideProfileSection />
        <StoryTimeline />
        <EventDetails />
        <MapSection />
        <InteractiveGallery />
        <GiftSection />
        <RsvpForm />
        <Footer />
        <FabRsvp />
        <MusicPlayer />
      </main>
    </SectionScroller>
  );
}
