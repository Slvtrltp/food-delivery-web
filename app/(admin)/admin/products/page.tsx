"use client";

import { Category } from "@/app/components/Category";
import { useState } from "react";

export default function AdminProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");

  return (
    <div>
      <Category
        onClick={(id) => setSelectedCategory(id)}
        onCreate={() => console.log("create")}
      />
    </div>
  );
}
