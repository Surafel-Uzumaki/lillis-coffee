import Hero from "@/components/Hero";
import AboutUs from "@/pages/aboutus";
import Contactus from "@/pages/contactus";
import Products from "@/pages/products";
import "./globals.css";
import MenuPage from "@/pages/menu";
export default function Home() {
  return (
    <main>
      <Hero />
      <AboutUs />
      <Products />
      <Contactus />
      <MenuPage/>
      {/* Other sections... */}
    </main>
  );
}
