"use client";

import { Button, Flex, Link } from "@radix-ui/themes";
import IssueStatusFilter from "./IssueStatusFilter";


const IssueAction = () => {
  return (
    <Flex  justify={"between"}>
      <IssueStatusFilter />
      <Button>
        <Link href="/issues/new">New Issue</Link>{" "}
      </Button>
    </Flex>
  );
};

export default IssueAction;
