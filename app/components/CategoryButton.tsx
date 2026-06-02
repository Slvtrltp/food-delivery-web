type Props = {
  category: string;
  isActive: boolean;
  count: number;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
};
export const CategoryButton = ({
  category,
  isActive,
  count,
  onClick,
}: Props) => {
  return (
    <button
      onClick={onClick}
      className={`flex gap-2 w-fit items-center justify-center py-2 px-4 border rounded-3xl ${isActive ? "border-[#448A5B]" : "border-[#E4E4E7]"}`}
    >
      <div className="text-[14px]">{category}</div>
      <div className="bg-black text-white rounded-2xl text-center text-[12px] py-[2px] px-[10px]">
        {count}
      </div>
    </button>
  );
};
