import { prisma } from "@/prisma/client";
import { notFound } from "next/navigation";
import EditIssueForm from "../_component/EditIssueForm";

//dont forget to promise the id and await it in the where
const EditIssuePage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const issue = await prisma.issue.findUnique({
    where: { id: parseInt((await params).id) },
  });

  if (!issue) notFound();

  return <EditIssueForm issue={issue} />;
};



export default EditIssuePage;
