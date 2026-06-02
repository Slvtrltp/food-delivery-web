type Props = {
  label: string;
  opacity: string;
  count: number;
};

export const Label = ({ label, opacity, count }: Props) => {
  return (
    <div className="flex items-center gap-2">
      <span className="text-[20px] font-semibold">{label}</span>
      <div className="text-[20px] font-semibold" style={{ opacity: opacity }}>
        ({count})
      </div>
    </div>
  );
};
