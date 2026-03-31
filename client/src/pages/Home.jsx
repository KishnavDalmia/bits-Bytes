import Navbar from "../components/Navbar/Navbar.jsx";
import Hero from "../components/Hero/Hero.jsx";
import AngularStatsWidget from "../components/AngularStatsWidget/AngularStatsWidget.jsx";
import HowItWorks from "../components/HowItWorks/HowItWorks.jsx";
import Features from "../components/Features/Features.jsx";
import Testimonials from "../components/Testimonials/Testimonials.jsx";
import Footer from "../components/Footer/Footer.jsx";
import "./Home.css";

export default function Home() {
  return (
    <div className="home-container">
      <Navbar />
      <Hero />
      <AngularStatsWidget />
      <HowItWorks />
      <Features />
      <Testimonials />
      <Footer />
    </div>
  );
}