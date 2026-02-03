import { Status } from "@/generated/prisma/client";
import { prisma } from "@/prisma/client";
import IssueAction from "./IssueAction";

import Pagination from "@/app/components/Pagination";
import { Flex } from "@radix-ui/themes";
import IssueTable, { IssueQuery, columnNames } from "./IssueTable";
import { Metadata } from "next";
//import { Issue, Status } from "@prisma/client";
//import delay from "delay";

interface Props {
  searchParams: IssueQuery;
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

  const orderBy = columnNames.includes(searchParams.orderBy)
    ? { [searchParams.orderBy]: "asc" }
    : undefined; //we check this before passing it to prisma

  const where = { status };
  const page = parseInt(searchParams.page) || 1;
  const pageSize = 10;
  const issues = await prisma.issue.findMany({
    where,
    orderBy,
    skip: (page - 1) * pageSize,
    take: pageSize,
  });

  const issueCount = await prisma.issue.count({ where });

  return (
    <Flex direction="column" gap={"3"}>
      <IssueAction />
      <IssueTable searchParams={sp} issues={issues} />
      <Pagination
        itemCount={issueCount}
        pageSize={pageSize}
        currentPage={page}
      />
    </Flex>
  );
}

export const dynamic = "force-dynamic";
// 'auto' | 'force-dynamic' | 'error' | 'force-static'

export const metadata: Metadata = {
  title: "Issue Tracker - Issues List",
  description: "View all project issues",
};

export default IssuesPage;

//change db to pg
