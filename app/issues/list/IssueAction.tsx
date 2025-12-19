"use client";
import { Status } from "@prisma/client";
import { Button, Flex, Link, Select } from "@radix-ui/themes";
import React from "react";
import IssueStatusFilter from "./IssueStatusFilter";


const IssueAction = () => {
  return (
    <Flex className="mb-5" justify={"between"}>
      <IssueStatusFilter />
      <Button>
        <Link href="/issues/new">New Issue</Link>{" "}
      </Button>
    </Flex>
  );
};

export default IssueAction;
