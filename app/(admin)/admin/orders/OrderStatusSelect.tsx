import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const statusColor = (status: string) => {
  if (status === "PENDING") return "text-yellow-500 border-yellow-400";
  if (status === "DELIVERED") return "text-green-600 border-green-500";
  if (status === "CANCELED") return "text-red-500 border-red-400";
  return "";
};

export const OrderStatusSelect = ({
  status,
  onChange,
}: {
  status: string;
  onChange: (val: string) => void;
}) => {
  return (
    <Select value={status} onValueChange={onChange}>
      <SelectTrigger className={`w-36 border ${statusColor(status)}`}>
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="PENDING">Pending</SelectItem>
        <SelectItem value="DELIVERED">Delivered</SelectItem>
        <SelectItem value="CANCELED">Cancelled</SelectItem>
      </SelectContent>
    </Select>
  );
};
