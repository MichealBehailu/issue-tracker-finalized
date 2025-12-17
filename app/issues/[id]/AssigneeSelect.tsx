"use client";
import { Skeleton } from "@/app/components";
import { Issue, User } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast"; //this for warning message to display on the top center when there is error like backend problem

const AssigneeSelect = ({ issue }: { issue: Issue }) => {
  const {
    data: users,
    error,
    isLoading,
  } = useQuery<User[]>({
    queryKey: ["users"],
    queryFn: () => axios.get("/api/users").then((res) => res.data),
    staleTime: 60 * 1000, //we can make it like one day ... 
    retry: 3,
  });

  if (isLoading) return <Skeleton />;
  if (error) return null;

  const assignIssue = (value: string) => { //the value is like userId : string
    axios
      .patch("/api/issues/" + issue.id, {
        assignedToUserId: value === "unassigned" ? null : value,
      })
      .catch(() => { //call back function 
        toast.error("Changes could not be saved."); //used as a flash warning on the top (when we can't update or there is a problem on backend)
      });
  };

  return (
    <>
      <Toaster position="top-center" />
      <Select.Root
        defaultValue={issue?.assignedToUserId ?? undefined}
        onValueChange={assignIssue}
      >
        <Select.Trigger placeholder="Assign..." />
        <Select.Content>
          <Select.Group>
            <Select.Label>Suggestions</Select.Label>
            <Select.Item value="unassigned">Unassigned</Select.Item>
            {users?.map((user) => (
              <Select.Item key={user.id} value={user.id}>
                {user.name}
              </Select.Item>
            ))}
          </Select.Group>
        </Select.Content>
      </Select.Root>
    </>
  );
};

export default AssigneeSelect;
