import AboutSection from '../components/homePage/AboutSection';
import Header from '../components/homePage/Header';
import ServicesSection from '../components/homePage/ServicesSection';
import TestimonialsSection from '../components/homePage/TestimonialsSection';
import Footer from '../components/Footer';


export default function Home() {
  return (
    <div className="w-full">
      <Header />
      <AboutSection />
      <ServicesSection />
      <div className="w-full flex  justify-center">
        <hr className="w-[80%] text-gray-300" />
      </div>
      <TestimonialsSection />
      <Footer />
    </div>
  );
}
