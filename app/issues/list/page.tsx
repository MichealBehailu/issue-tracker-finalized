import { Link } from "@/app/components/index";
import { prisma } from "@/prisma/client";
import { Button, Table } from "@radix-ui/themes";
import IssueStatusBatch from "../../components/IssueStatusBatch";
import IssueAction from "./IssueAction";
//import { Issue, Status } from "@prisma/client";
//import delay from "delay";

import { Status, Issue } from "@prisma/client";

interface Props {
  searchParams: Promise<{ status: Status }>;
}

const IssuesPage = async ({ searchParams }: Props) => {
  const statuses = Object.values(Status); //when all comes here we know that all is not in status enum so the prisma will make it undefined and get all status
  const status = statuses.includes((await searchParams).status)
    ? (await searchParams).status
    : undefined;

  const issues = await prisma.issue.findMany({
    //if the status is set undefined from the above condition then prisma will do nothing it fecth all status
    where: { status: status }, //can be set to undefined then get all status means all issues
  }); //getting the issues from the database
  // await delay(2000); //2 second //just to check the loading skeleton working or not

  const columns: { label: string; value: keyof Issue; className?: string }[] = [
    //this is a logic just to map the header part of the table
    { label: "Issue", value: "title" },
    { label: "Issue", value: "status", className: "hidden md:table-cell" },
    { label: "Issue", value: "createdAt", className: "hidden md:table-cell" },
  ];

  return (
    <div>
      <IssueAction />

      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            {columns.map((column) => (
              <Table.ColumnHeaderCell key={column.value}>
                {column.label}
              </Table.ColumnHeaderCell>
            ))}
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {issues.map((issue) => (
            <Table.Row key={issue.id}>
              <Table.Cell>
                <Link href={`/issues/${issue.id}`} children={issue.title} />
                <div className="block md:hidden">
                  <IssueStatusBatch status={issue.status} />
                </div>
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                <IssueStatusBatch status={issue.status} />
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                {issue.createdAt.toDateString()}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </div>
  );
};

export const dynamic = "force-dynamic";
// 'auto' | 'force-dynamic' | 'error' | 'force-static'

export default IssuesPage;
