import { IssueStatusBatch } from '@/app/components'
import { Issue, Status } from "@/generated/prisma/client"
import { ArrowUpIcon } from '@radix-ui/react-icons'
import { Table } from '@radix-ui/themes'
import { default as Link, default as NextLink } from 'next/link'

export type IssueQuery = Promise<{ status: Status; orderBy: keyof Issue, page:string }>

interface Props{
    searchParams : IssueQuery ;
     issues:Issue[]
}

const IssueTable = async ({searchParams:sp, issues} : Props) => {
 const searchParams = await sp;
  return (
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
  )
}

const columns: { label: string; value: keyof Issue; className?: string }[] = [
  //this is a logic just to map the header part of the table
  { label: "Issue", value: "title" },
  { label: "Status", value: "status", className: "hidden md:table-cell" },
  { label: "Created", value: "createdAt", className: "hidden md:table-cell" },
];

export const columnNames = columns.map(column => column.value) //we store the value of the column; we dont need to map all the array of the object b/c we dont want to leak the implementation details (it violates the encapsulation)

    
export default IssueTable