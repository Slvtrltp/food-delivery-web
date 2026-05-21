"use client";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Footer from "./components/Footer";
import { FoodSection } from "./components/FoodSection";
import { useEffect, useState } from "react";

export default function Home() {

  return (
    <div>
      <Header/>
      <Hero />
      <FoodSection label="Desserts" />
      <Footer />
    </div>
  );
}
