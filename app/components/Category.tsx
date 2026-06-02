"use client";
import { useCallback, useEffect, useState } from "react";
import { CategoryButton } from "./CategoryButton";
import { Prisma } from "../generated/prisma/client";
import axios, { all } from "axios";
import { DialogDemo } from "./Add";
import { Label } from "./LabelCat";
import { AdminFood } from "./AdminFood";

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
  const [name, setName] = useState("");
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("/api/foods/categories")
      .then((res) => {
        setCategories(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);
  const handleSave = async () => {
    if (!name) return;
    setLoading(true);
    try {
      await axios.post("/api/foods/categories", { categoryName: name });
      setName("");
      setOpen(false);

      const res = await axios.get("/api/foods/categories");
      setCategories(res.data);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };
  const handleDelete = async (id: string) => {
    setLoading(true);
    try {
      await axios.delete(`/api/foods/categories/${id}`);

      const res = await axios.get("/api/foods/categories");
      setCategories(res.data);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };
  const handleEdit = async (id: string, newName: string) => {
    setLoading(true);
    try {
      await axios.put(`/api/foods/categories/${id}`, { categoryName: newName });
      const res = await axios.get("/api/foods/categories");
      setCategories(res.data);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  const allCount = categories.reduce((prev, next) => {
    return prev + next._count.foods;
  }, 0);
  return (
    <div className="py-6 px-6 space-y-4 ">
      <Label
        opacity="0"
        count={0}
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
      <AdminFood />
    </div>
  );
};
