import { useFilterStore } from "@/lib/store";

export default function UserFilter() {
  const { search, setSearch, role, setRole } = useFilterStore();

  return (
    <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search by name or email"
        className="border border-gray-300 px-4 py-2 rounded w-full sm:w-64"
      />
      <select
        value={role}
        onChange={(e) => setRole(e.target.value)}
        className="border border-gray-300 px-4 py-2 rounded"
      >
        <option value="all">All Roles</option>
        <option value="admin">Admin</option>
        <option value="customer">Customer</option>
      </select>
    </div>
  );
}
