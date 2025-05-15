"use client";

import { User } from "@/lib/api"; // Updated import
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import useUsers from "@/hooks/useUsers";

interface UserCardProps {
  user: User;
}

export default function UserCard({ user }: UserCardProps) {
  const { handleEdit, handleDelete } = useUsers();

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>{user.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center space-x-4">
          <img
            src={user.avatar}
            alt={user.name}
            width={80}
            height={80}
            className="rounded-full"
          />
          <div>
            <p className="text-sm text-muted-foreground">{user.email}</p>
            <p className="text-sm capitalize">{user.role}</p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end space-x-2">
        <Button variant="outline" onClick={() => handleEdit(user)}>
          Edit
        </Button>
        <Button variant="destructive" onClick={() => handleDelete(user.id)}>
          Delete
        </Button>
      </CardFooter>
    </Card>
  );
}
