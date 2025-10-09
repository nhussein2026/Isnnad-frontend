import AboutSection from "../components/homePage/ِAboutSection";
import Header from "../components/homePage/Header";
import ServicesSection from "../components/homePage/ServicesSection";



export default function Home() {
  return (
    <div className="w-full">
      <Header />
      <AboutSection />
      <ServicesSection />
      
    </div>
  );
}
