"use client";

import { useUsersQuery } from "@/lib/store";
import BasicLayout from "@/components/Templates/BasicLayout";
import UserCard from "@/components/Templates/UserCard";
import CardSkeleton from "@/components/Templates/Skeleton";
import CallToAction from "@/components/Templates/CTA";

export default function Home() {
  const { data: users = [], isLoading, refetch } = useUsersQuery();

  return (
    <BasicLayout>
      <div className="grid grid-cols-2  gap-6 w-full">
        {isLoading ? (
          <CardSkeleton count={6} />
        ) : (
          <>
            {users.map((user) => (
              <UserCard key={user.id} user={user} onSuccess={refetch} />
            ))}
          </>
        )}
      </div>

      <CallToAction />
    </BasicLayout>
  );
}
