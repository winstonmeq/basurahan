import { Button } from "@/components/ui/button";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { useState, useEffect } from "react";
import { User } from "@prisma/client";

interface UserData {
  user_data: User[];
  totalRecords: number;
}

export default function UsersTable() {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [page, setPage] = useState(1);
  const [totalRecords, setTotalRecords] = useState(0);

  const handleNextPage = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handlePreviousPage = () => {
    setPage((prevPage) => Math.max(1, prevPage - 1));
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`/api/users?page=${page}&limit=5`);

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data: UserData = await response.json();

        if (data && data.user_data) {
          setUsers(data.user_data);
          setTotalRecords(data.totalRecords);
        } else {
          throw new Error("Invalid data format received from the API");
        }
      } catch (err) {
        setError(
          err instanceof Error ? err : new Error("Failed to fetch users")
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, [page]);

  if (isLoading) {
    return (
      <div className="flex justify-center p-4">
        <span>Loading users...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center p-4">
        <span className="text-red-500">Error: {error.message}</span>
      </div>
    );
  }

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Verified</TableHead>
            <TableHead>Premium</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Joined</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.role}</TableCell>
              <TableCell>{user.emailVerified ? "Yes" : "No"}</TableCell>
              <TableCell>{user.premium ? "Yes" : "No"}</TableCell>
              <TableCell>
                {user.role == "Banned" ? (
                  <span className="text-red-500">Banned</span>
                ) : (
                  <span className="text-green-500">Active</span>
                )}
              </TableCell>
              <TableCell>{new Date(user.createdAt).toLocaleDateString()}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div className="flex items-center justify-between space-x-2 py-2">
        <Button
          variant="outline"
          size="sm"
          onClick={handlePreviousPage}
          disabled={page === 1}
        >
          Previous
        </Button>
        <span className="text-sm text-muted-foreground">
          Page {page} of {Math.ceil(totalRecords / 5)}
        </span>
        <Button
          variant="outline"
          size="sm"
          onClick={handleNextPage}
          disabled={users.length < 5}
        >
          Next
        </Button>
      </div>
      <p className="text-sm text-muted-foreground">Total users: {totalRecords}</p>
    </div>
  );
}