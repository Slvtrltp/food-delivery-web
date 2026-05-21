"use client";
import Hero from "./components/Hero";
import Footer from "./components/Footer";
import { FoodSection } from "./components/FoodSection";
import { useEffect, useState } from "react";
import { Header } from "./components/Header";

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
