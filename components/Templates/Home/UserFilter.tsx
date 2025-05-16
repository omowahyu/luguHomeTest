import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useFilterStore } from "@/lib/store";

export default function UserFilter() {
  const { search, role, setSearch, setRole } = useFilterStore();

  return (
    <div className="flex flex-row gap-4 items-start sm:items-center rounded-full w-full border border-gray-300 px-4 ">
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search by name or email"
        className="w-full py-4 outline-0"
      />
      <Select value={role} onValueChange={(value) => setRole(value)}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select role" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Roles</SelectItem>
          <SelectItem value="admin">Admin</SelectItem>
          <SelectItem value="customer">Customer</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
