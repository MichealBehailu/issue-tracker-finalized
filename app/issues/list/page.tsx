import { Link } from "@/app/components/index";
import { Issue, Status } from "@/generated/prisma/client";
import { prisma } from "@/prisma/client";
import { Table } from "@radix-ui/themes";
import IssueStatusBatch from "../../components/IssueStatusBatch";
import IssueAction from "./IssueAction";
import NextLink from "next/link";
import { ArrowUpIcon } from "@radix-ui/react-icons";
import Pagination from "@/app/components/Pagination";
//import { Issue, Status } from "@prisma/client";
//import delay from "delay";

interface Props {
  searchParams: Promise<{ status: Status; orderBy: keyof Issue, page:string }>;
}

async function IssuesPage({ searchParams: sp }: Props) {
  const searchParams = await sp;

  const status = Object.values(Status).includes(searchParams.status)
    ? searchParams.status
    : undefined;
  // const {status} = await searchParams
  // const status = statuses.includes((await searchParams).status)
  //   ? (await searchParams).status
  //   : undefined;
  const columns: { label: string; value: keyof Issue; className?: string }[] = [
    //this is a logic just to map the header part of the table
    { label: "Issue", value: "title" },
    { label: "Status", value: "status", className: "hidden md:table-cell" },
    { label: "Created", value: "createdAt", className: "hidden md:table-cell" },
  ];

  const orderBy = columns.map(column => column.value).includes(searchParams.orderBy)
    ? { [searchParams.orderBy]: "asc" }
    : undefined; //we check this before passing it to prisma
const where = {status}
 const page = parseInt(searchParams.page) || 1;
const pageSize = 10;
  const issues = await prisma.issue.findMany({
    where,
   orderBy,
   skip:(page - 1) * pageSize,
   take:pageSize
  });

  const issueCount = await prisma.issue.count({where});

  return (
    <div>
      <IssueAction />

      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row> 
            {columns.map((column) => (
              <Table.ColumnHeaderCell key={column.value} className={column.className}>
                <NextLink
                  href={{
                    query: { ...searchParams, orderBy: column.value },
                  }}
                >
                  {column.label}
                </NextLink>
                {column.value === searchParams.orderBy && (
                  <ArrowUpIcon className="inline" />
                )}
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
      <Pagination itemCount={issueCount} pageSize={pageSize} currentPage={page}/>
    </div>
  );
}

export const dynamic = "force-dynamic";
// 'auto' | 'force-dynamic' | 'error' | 'force-static'

export default IssuesPage;

//change db to pg
