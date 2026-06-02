import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Prisma } from "../generated/prisma/client";
import { useState } from "react";

type Props = {
  label: string;
  opacity: string;
  count: number;
  categories?: CategoryWithCount[];
  onDelete?: (id: string) => void;
  onEdit?: (id: string, name: string) => void;
};
type CategoryWithCount = Prisma.FoodCategoryGetPayload<{
  include: { _count: { select: { foods: true } } };
}>;

export const Label = ({
  label,
  opacity,
  count,
  categories = [],
  onDelete,
  onEdit,
}: Props) => {
  const [manageOpen, setManageOpen] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [editName, setEditName] = useState("");

  return (
    <div className="flex justify-between items-center">
      <div className="flex items-center gap-2">
        <span className="text-[20px] font-semibold">{label}</span>
        <div className="text-[20px] font-semibold" style={{ opacity: opacity }}>
          ({count})
        </div>
      </div>
      <Dialog open={manageOpen} onOpenChange={setManageOpen}>
        <DialogTrigger asChild>
          <button className="py-1 px-3 rounded-full bg-black text-white">
            •••
          </button>
        </DialogTrigger>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Ангиллуудыг удирдах</DialogTitle>
          </DialogHeader>

          <div className="max-h-96 overflow-y-auto space-y-2">
            {categories.map((cat) => (
              <div
                key={cat.id}
                className="flex items-center justify-between px-3 py-2 border rounded-lg"
              >
                {editId === cat.id ? (
                  <div className="flex gap-2 w-full">
                    <input
                      className="border rounded px-2 py-1 text-sm flex-1"
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                    />
                    <button
                      onClick={() => {
                        onEdit?.(cat.id, editName);
                        setEditId(null);
                      }}
                      className="text-green-500 text-sm font-bold"
                    >
                      ✓
                    </button>
                    <button
                      onClick={() => setEditId(null)}
                      className="text-zinc-400 text-sm"
                    >
                      ✕
                    </button>
                  </div>
                ) : (
                  <>
                    <span className="text-sm">{cat.categoryName}</span>
                    <div className="flex gap-3">
                      <button
                        onClick={() => {
                          setEditId(cat.id);
                          setEditName(cat.categoryName);
                        }}
                        className="text-zinc-400 hover:text-blue-500 text-sm"
                      >
                        ✎
                      </button>
                      <button
                        onClick={() => onDelete?.(cat.id)}
                        className="text-zinc-400 hover:text-red-500 text-sm"
                      >
                        🗑
                      </button>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
