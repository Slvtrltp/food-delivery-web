"use client";
import { useState } from "react";
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

export const FoodDialog = ({
  open,
  onClose,
  categories,
  foodCategoryId,
}: {
  open: boolean;
  onClose: () => void;
  categories: FoodCategoryWithFood[];
  foodCategoryId: string;
}) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [ingredients, setIngredients] = useState("");
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleOnSubmit = () => {
    setLoading(true);
    axios
      .post("api/foods", {
        name,
        price,
        ingredients,
        image,
        foodCategoryId,
      })
      .then((res) => {
        alert("Food added");
        setLoading(false);
        onClose();
        window.location.reload();
      })
      .catch(({ response }) => {
        alert("Aldaa");
      });
  };
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-10">
        <Dialog open={open} onOpenChange={onClose}>
          <DialogContent className="sm:max-w-md bg-white p-6 rounded-lg">
            <DialogHeader>
              <DialogTitle className="text-xl font-bold border-b pb-2">
                Dishes info
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
                <Select defaultValue={foodCategoryId} value={foodCategoryId}>
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
                  type="price"
                  value={price}
                  onChange={(e) => {
                    if (Number(e.target.value)) {
                      setPrice(Number(e.target.value));
                    }
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
