"use client";

import { Issue } from "@prisma/client";
import dynamic from "next/dynamic";
import IssueFormSkeleton from "../[id]/loading";

const IssueForm = dynamic(() => import("@/app/issues/_component/IssueForm"), {
  ssr: false,
  loading: () => <IssueFormSkeleton />,
});

const EditIssueForm = ({ issue }: { issue: Issue }) => {
  return <IssueForm issue={issue} />;
};

export default EditIssueForm;
