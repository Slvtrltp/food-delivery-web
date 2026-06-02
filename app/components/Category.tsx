"use client";
import { useEffect, useState } from "react";
import { CategoryButton } from "./CategoryButton";
import { Prisma } from "../generated/prisma/client";
import axios, { all } from "axios";
import { DialogDemo } from "./Add";
import { Label } from "./LabelCat";

type Props = {
  onCreate: () => void;
  onClick: (id: string) => void;
};

type CategoryWithCount = Prisma.FoodCategoryGetPayload<{
  include: {
    _count: {
      select: {
        foods: true;
      };
    };
  };
}>;
export const Category = ({ onClick, onCreate }: Props) => {
  const [isActive, setIsActive] = useState("all");
  const [categories, setCategories] = useState<CategoryWithCount[]>([]);
  const [name, setName] = useState(""); // ← энд хадгална
  const [open, setOpen] = useState(false);
  const fetchCategories = () => {
    axios.get("/api/foods/categories").then((res) => setCategories(res.data));
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleSave = async () => {
    if (!name) return;
    await axios.post("/api/foods/categories", { categoryName: name });
    setName("");
    setOpen(false);
    fetchCategories();
  };
  const handleDelete = async (id: string) => {
    await axios.delete(`/api/foods/categories/${id}`);
    fetchCategories();
  };

  const handleEdit = async (id: string, newName: string) => {
    await axios.put(`/api/foods/categories/${id}`, { categoryName: newName });
    fetchCategories();
  };
  const allCount = categories.reduce((prev, next) => {
    return prev + next._count.foods;
  }, 0);
  return (
    <div className="py-6 px-6 space-y-4 ">
      <Label
        opacity="0"
        num={0}
        label="Dishes Category"
        categories={categories}
        onDelete={handleDelete}
        onEdit={handleEdit}
      />
      <div className="flex flex-wrap gap-2 items-center">
        <CategoryButton
          isActive={isActive === "all"}
          count={allCount}
          category="All dishes"
          onClick={() => {
            setIsActive("all");
            onClick("all");
          }}
        />{" "}
        {categories.map((cat) => (
          <CategoryButton
            key={cat.id}
            isActive={isActive === cat.id}
            count={cat._count.foods}
            category={cat.categoryName}
            onClick={() => {
              setIsActive(cat.id);
              onClick(cat.id);
            }}
          />
        ))}
        <DialogDemo
          name={name}
          open={open}
          onOpenChange={setOpen}
          onNameChange={setName}
          onSave={handleSave}
        />
      </div>
    </div>
  );
};
