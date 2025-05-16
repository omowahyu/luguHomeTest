"use client";

import BasicLayout from "@/components/Templates/BasicLayout";
import CardSkeleton from "@/components/Templates/Home/Skeleton";
import CallToAction from "@/components/Templates/Home/CTA";

import UserCard from "@/components/Templates/Home/UserCard";
import UserFilter from "@/components/Templates/Home/UserFilter";
import { Button } from "@/components/ui/button";

import {
  useUsersQuery,
  useFilterStore,
  useUserFormDialogStore,
} from "@/lib/store";

export default function Home() {
  const { search, role } = useFilterStore();
  const { onOpen } = useUserFormDialogStore(); // ✅ Fix here
  const { data: users = [], isLoading, refetch } = useUsersQuery();

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase());

    const matchesRole = role === "all" ? true : user.role === role;

    return matchesSearch && matchesRole;
  });

  return (
    <BasicLayout>
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6">
        <UserFilter />
        <Button
          className="bg-[#D1EE6E] text-black hover:text-white"
          onClick={() => onOpen()}
        >
          Add New User
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
        {isLoading ? (
          <CardSkeleton count={6} />
        ) : (
          filteredUsers.map((user) => (
            <UserCard key={user.id} user={user} onSuccess={refetch} />
          ))
        )}
      </div>

      <CallToAction />
    </BasicLayout>
  );
}
