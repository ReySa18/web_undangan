import HeroSection from "@/components/HeroSection";
import StoryTimeline from "@/components/StoryTimeline";
import EventDetails from "@/components/EventDetails";
import MapSection from "@/components/MapSection";
import InteractiveGallery from "@/components/InteractiveGallery";
import GiftSection from "@/components/GiftSection";
import RsvpForm from "@/components/RsvpForm";
import Footer from "@/components/Footer";
import FabRsvp from "@/components/FabRsvp";
import SectionScroller from "@/components/SectionScroller";

export default function Home() {
  return (
    <SectionScroller>
      <main className="min-h-screen">
        <HeroSection />
        <StoryTimeline />
        <EventDetails />
        <MapSection />
        <InteractiveGallery />
        <GiftSection />
        <RsvpForm />
        <Footer />
        <FabRsvp />
      </main>
    </SectionScroller>
  );
}
