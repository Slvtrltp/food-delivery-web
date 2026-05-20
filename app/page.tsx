import Header from "./components/Header";
import Hero from "./components/Hero";

import Footer from "./components/Footer";
import { FoodCard } from "./components/FoodCard";
import { FoodSection } from "./components/FoodSection";

export default function Home() {
  return (
    <div>
      <Header />
      <Hero />
      <FoodSection label="Desserts" />
      <Footer />
    </div>
  );
}
