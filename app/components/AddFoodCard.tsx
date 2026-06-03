import { Button } from "@/components/ui/button";

export const AddFoodCard = ({ onClick }: { onClick: () => void }) => {
  return (
    <Button
      onClick={onClick}
      className="w-[320px] h-[440px] border border-dashed border-[#448A5B] rounded-lg text-center cursor-pointer"
      variant="outline"
    >
      <span className="py-2.5 px-4 rounded-4xl bg-[#448A5B] text-white">+</span>
    </Button>
  );
};
