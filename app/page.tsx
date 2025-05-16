"use client";

import { useMemo } from "react";
import BasicLayout from "@/components/Templates/BasicLayout";
import CardSkeleton from "@/components/Templates/Home/Skeleton";
import CallToAction from "@/components/Templates/Home/CTA";
import UserFormDialog from "@/components/Templates/Home/UserFormDialog";
import UserCard from "@/components/Templates/Home/UserCard";
import UserFilter from "@/components/Templates/Home/UserFilter";
import { Button } from "@/components/ui/button";

import {
  useUsersQuery,
  useFilterStore,
  useUserFormDialogStore,
} from "@/lib/store";

export default function Home() {
  const { data: users = [], isLoading, refetch } = useUsersQuery();
  const { search, role } = useFilterStore();
  const { onOpen } = useUserFormDialogStore();

  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const matchSearch =
        user.name.toLowerCase().includes(search.toLowerCase()) ||
        user.email.toLowerCase().includes(search.toLowerCase());

      const matchRole = role === "all" || user.role === role;

      return matchSearch && matchRole;
    });
  }, [users, search, role]);

  return (
    <BasicLayout>
      <div className="flex justify-between mb-4 space-x-4">
        <UserFilter />
        <Button
          onClick={() => onOpen()}
          className="px-8 py-8 bg-lime-400 rounded-full whitespace-nowrap"
        >
          Add New User
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
        {isLoading ? (
          <CardSkeleton count={6} />
        ) : (
          filteredUsers.map((user) => (
            <UserCard key={user.id} user={user} onSuccessAction={refetch} />
          ))
        )}
      </div>
      <UserFormDialog />

      <CallToAction />
    </BasicLayout>
  );
}
