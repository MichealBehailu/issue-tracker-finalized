import { Heading, Flex, Card, Text } from "@radix-ui/themes";
import React from "react";
import ReactMarkdown from "react-markdown";
import IssueStatusBatch from "./IssueStatusBatch";
import { Issue } from "@prisma/client";

const IssueDetails = ({issue} : {issue : Issue}) => {
  return (
    <>
      <Heading>{issue.title}</Heading>
      <Flex className="space-x-2 items-center" my={"2"}>
        <IssueStatusBatch status={issue.status} />
        <Text>{issue.createdAt.toDateString()}</Text>
      </Flex>
      <Card className="prose max-w-full" mt={"4"}>
        <ReactMarkdown>{issue.description}</ReactMarkdown>
      </Card>
    </>
  );
};

export default IssueDetails;
