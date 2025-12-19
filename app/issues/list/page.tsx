import { Link } from "@/app/components/index";
import { Issue, Status } from "@/generated/prisma/client";
import { prisma } from "@/prisma/client";
import { Table } from "@radix-ui/themes";
import IssueStatusBatch from "../../components/IssueStatusBatch";
import IssueAction from "./IssueAction";
//import { Issue, Status } from "@prisma/client";
//import delay from "delay";


interface Props {
  searchParams: Promise<{ status: Status }>;
}

async function IssuesPage ({ searchParams: sp }: Props) {
const searchParams = await sp;
   const status = Object.values(Status).includes(searchParams.status)
    ? searchParams.status
    : undefined;
  // const {status} = await searchParams
  // const status = statuses.includes((await searchParams).status)
  //   ? (await searchParams).status
  //   : undefined;


  const issues = await prisma.issue.findMany({
    where: { status: status }
  }); 
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


//change db to pg