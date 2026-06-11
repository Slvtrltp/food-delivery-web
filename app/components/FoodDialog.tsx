"use client";
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { FoodCategoryWithFood } from "../(admin)/admin/products/page";
import { Label } from "@/components/ui/label";
import { Field } from "@/components/ui/field";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Food } from "../generated/prisma/client";

export const FoodDialog = ({
  open,
  onClose,
  categories,
  foodCategoryId,
  food,
}: {
  open: boolean;
  onClose: () => void;
  categories: FoodCategoryWithFood[];
  foodCategoryId: string;
  food?: Food | null;
}) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [ingredients, setIngredients] = useState("");
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState(foodCategoryId);

  useEffect(() => {
    if (food) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setName(food.foodName);
      setPrice(food.price);
      setIngredients(food.ingredients);
      setImage(food.image);
      setSelectedCategoryId(food.foodCategoryId); // ← нэмэх
    } else {
      setName("");
      setPrice(0);
      setIngredients("");
      setImage("");
      setSelectedCategoryId(foodCategoryId); // ← нэмэх
    }
  }, [food, foodCategoryId]);

  const handleOpenChange = (isOpen: boolean) => {
    if (!isOpen) {
      onClose();

      setName("");
      setPrice(0);
      setIngredients("");
      setImage("");
    }
  };
  const handleOnSubmit = async () => {
    setLoading(true);

    try {
      if (food) {
        await axios.put(`/api/foods/${food.id}`, {
          foodName: name,
          price,
          ingredients,
          image,
          foodCategoryId: selectedCategoryId,
        });
      } else {
        await axios.post("/api/foods", {
          foodName: name,
          price,
          ingredients,
          image,
          foodCategoryId: selectedCategoryId,
        });
      }

      onClose();
      window.location.reload();
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-10">
        <Dialog open={open} onOpenChange={handleOpenChange}>
          <DialogContent
            aria-describedby={undefined}
            className="sm:max-w-md bg-white p-6 rounded-lg max-h-[90vh] overflow-y-auto"
          >
            <DialogHeader>
              <DialogTitle className="text-xl font-bold border-b pb-2">
                {food ? "Edit Dish" : "Add Dish"}
              </DialogTitle>
            </DialogHeader>

            <div className="space-y-4 my-4">
              <div className="space-y-1">
                <Label htmlFor="name-1">Dish name</Label>
                <Input
                  id="name-1"
                  value={name}
                  name="name"
                  placeholder="Бууз..."
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                />
              </div>
              <Field>
                <Label htmlFor="category-1">Category</Label>
                <Select
                  value={selectedCategoryId}
                  onValueChange={(val) => setSelectedCategoryId(val)}
                >
                  <SelectTrigger id="category-1" className="w-full max-w-48">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Categories</SelectLabel>
                      {categories.map((cat) => (
                        <SelectItem value={cat.id} key={cat.id}>
                          {cat.categoryName}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </Field>
              <div className="space-y-1">
                <p className="text-sm font-medium text-gray-700">Ingredients</p>
                <textarea
                  name="ingredients"
                  className="w-full p-3 border rounded-md text-sm min-h-[80px] focus:outline-none focus:ring-2 focus:ring-[#448A5B]"
                  value={ingredients}
                  onChange={(e) => setIngredients(e.target.value)}
                  placeholder="Орц, найрлага..."
                />
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium text-gray-700">Price</p>
                <Input
                  type="number"
                  value={price}
                  onChange={(e) => {
                    setPrice(Number(e.target.value) || 0);
                  }}
                  placeholder="$0.00"
                />
              </div>
              <Field>
                <Label htmlFor="image-1">Image</Label>
                <input
                  type="file"
                  onChange={(e) => {
                    if (e.target.files && e.target.files.length > 0) {
                      const form = new FormData();
                      form.append("file", e.target.files[0]);
                      axios.put("/api/upload", form).then((res) => {
                        setImage(res.data.url);
                      });
                    }
                  }}
                />
                {image && (
                  <img src={image} alt={name} className="max-w-full h-auto" />
                )}
              </Field>
              <DialogFooter>
                {food && (
                  <Button
                    className="bg-red-500 text-white px-4 py-2 rounded-lg"
                    onClick={() => {
                      if (!confirm("Delete this food?")) return;
                      axios.delete(`/api/foods/${food.id}`).then(() => {
                        onClose();
                        window.location.reload();
                      });
                    }}
                  >
                    Delete
                  </Button>
                )}
                <DialogClose asChild>
                  <Button variant="outline" disabled={loading}>
                    Cancel
                  </Button>
                </DialogClose>

                <Button
                  type="submit"
                  disabled={loading}
                  onClick={handleOnSubmit}
                >
                  Save changes
                </Button>
              </DialogFooter>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};
