//this is component is used to show the issue from database based on its id
import authOptions from '@/app/auth/authOptions';
import DeleteIssueButton from '@/app/components/DeleteIssueButton';
import EditIssueButton from '@/app/components/EditIssueButton';
import IssueDetails from '@/app/components/IssueDetails';
import { prisma } from "@/prisma/client";
import { Box, Flex, Grid } from "@radix-ui/themes";
import { getServerSession } from 'next-auth';
import { notFound } from "next/navigation";
import AssigneeSelect from './AssigneeSelect';
interface Props {
  params: Promise<{ id: string }>; //In recent Next.js releases, params and searchParams in server components are asynchronous, so you have to unwrap them with await params.
}

const IssueDetailPage = async ({ params }: Props) => {

  const session  = await getServerSession(authOptions) //to get session this is useful to identify if the user authniticated or not so that it can post and update issues if not we need to hide the update and delete button to secure the application

  const { id } = await params; //await the params ... You can’t directly do params.id; you must await it first.

  const issueId = parseInt(id);

  //if (isNaN(issueId)) notFound(); //this is debatable/optional but if the user wants to access to /issues/abc it cant we direct them to notFound //NaN means not a number

  const issue = await prisma.issue.findUnique({
    where: { id: issueId },
  });

  if (!issue) notFound();

  return (
    <Grid columns={{initial : '1', sm:'5'}} gap={'5'}>
      <Box className='md:col-span-3'>
        <IssueDetails issue={issue} />
      </Box>
      {session && <Box>
        <Flex direction={'column'} gap={'4'}>
        <AssigneeSelect issue={issue} />
        <EditIssueButton issueId={issue.id}/>
        <DeleteIssueButton issueId={issue.id}/>
        </Flex>
      </Box>}

    </Grid>
  );
};

export async function generateMetadata({params}:Props){
  const issue = await prisma.issue.findUnique({where:{id: parseInt((await params).id)}})
  return {
    title:issue?.title,
    description:"Details of issue "+issue?.id,
  }
}

export default IssueDetailPage;
