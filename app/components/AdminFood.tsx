"use client";
import { useEffect, useState } from "react";
import { Label } from "./LabelCat";
import { FoodCard } from "./FoodCard";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { Food, Prisma } from "../generated/prisma/client";
import { ImageField } from "./ImageField";

type CategoryWithCount = Prisma.FoodCategoryGetPayload<{
  include: {
    _count: {
      select: { foods: true };
    };
  };
}>;

export const AdminFood = () => {
  const [categories, setCategories] = useState<CategoryWithCount[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);

  const [foods, setFoods] = useState<Food[]>({
  });

  const [error, setError] = useState({
    foodName: "",
    image: "",
  });

  useEffect(() => {
    axios
      .get("/api/foods/categories")
      .then((res) => {
        setCategories(res.data);
        if (res.data.length > 0) {
          setForm((prev) => ({ ...prev, foodCategoryId: res.data[0].id }));
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const handleSaveFood = async () => {
    if (!foodName || !price || !foodCategoryId) {
      alert("Заавал бөглөх талбаруудыг бөглөнө үү!");
      return;
    }

    try {
      setLoading(true);
      // Бэкэнд рүү датагаа илгээнэ (Үнэ тоо байх ёстой тул Number болгов)
      await axios.post("/api/foods", {
        foodName: form.foodName,
        price: form.price,
        ingredients: form.ingredients,
        image: form.image || "/fruit.jpg", // Зураггүй бол дефолт зураг
        foodCategoryId: form.foodCategoryId,
      });

      // Амжилттай болбол формыг цэвэрлээд хаана
      setForm({
        foodName: "",
        foodCategoryId: categories[0]?.id || "",
        ingredients: "",
        price: "",
        image: "",
      });
      setOpen(false);
      alert("Хоол амжилттай нэмэгдлээ!");
    } catch (err) {
      console.error(err);
      alert("Хоол нэмэхэд алдаа гарлаа.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <Label opacity="100" count={0} label="Appetizer" />
      </div>
      <div className="flex flex-wrap items-center gap-10">
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button
              className="w-[320px] h-[440px] border border-dashed border-[#448A5B] rounded-lg text-center cursor-pointer"
              variant="outline"
            >
              <span className="py-2.5 px-4 rounded-4xl bg-[#448A5B] text-white">
                +
              </span>
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md bg-white p-6 rounded-lg">
            <DialogHeader>
              <DialogTitle className="text-xl font-bold border-b pb-2">
                Dishes info
              </DialogTitle>
            </DialogHeader>

            <div className="space-y-4 my-4">
              {/* Dish Name */}
              <div className="space-y-1">
                <p className="text-sm font-medium text-gray-700">Dish name</p>
                <Input
                  value={form.foodName}
                  onChange={(e) =>
                    setForm({ ...form, foodName: e.target.value })
                  }
                  placeholder="Бууз..."
                />
              </div>

              {/* Dish Category (Dropdown сонголт) */}
              <div className="space-y-1">
                <p className="text-sm font-medium text-gray-700">
                  Dish category
                </p>
                <select
                  className="w-full h-10 px-3 border rounded-md bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#448A5B]"
                  value={form.foodCategoryId}
                  onChange={(e) =>
                    setForm({ ...form, foodCategoryId: e.target.value })
                  }
                >
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.categoryName}
                    </option>
                  ))}
                </select>
              </div>

              {/* Ingredients */}
              <div className="space-y-1">
                <p className="text-sm font-medium text-gray-700">Ingredients</p>
                <textarea
                  className="w-full p-3 border rounded-md text-sm min-h-[80px] focus:outline-none focus:ring-2 focus:ring-[#448A5B]"
                  value={form.ingredients}
                  onChange={(e) =>
                    setForm({ ...form, ingredients: e.target.value })
                  }
                  placeholder="Орц, найрлага..."
                />
              </div>

              {/* Price */}
              <div className="space-y-1">
                <p className="text-sm font-medium text-gray-700">Price</p>
                <Input
                  type="number"
                  value={form.price}
                  onChange={(e) => setForm({ ...form, price: e.target.value })}
                  placeholder="$0.00"
                />
              </div>

              {/* Image Upload Field */}
              <ImageField
                label="Dish image"
                required={true}
                value={form.image}
                error={error.image}
                onChange={(e) => {
                  const files = e.target.files;
                  if (files && files.length > 0) {
                    const imageValue = URL.createObjectURL(files[0]);
                    setForm({ ...form, image: imageValue });
                    setError({ ...error, image: "" });
                  }
                }}
                onCancel={() => {
                  setForm({ ...form, image: "" });
                  setError({ ...error, image: "Зургаа оруулна уу!" });
                }}
              />
            </div>

            <DialogFooter className="border-t pt-4">
              <DialogClose asChild>
                <Button variant="outline">Болих</Button>
              </DialogClose>
              <Button
                onClick={handleSaveFood}
                className="bg-[#202124] text-white hover:bg-black"
              >
                Save changes
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        <div>
          <FoodCard
            width="320px"
            height="440px"
            image={"/fruit.jpg"}
            title="Blueberry"
            description="Blueberries are small, sweet, and slightly tart perennial berries."
            price="$10"
          />
        </div>
      </div>
    </div>
  );
};
