"use client";
import { ErrorMessage, Spinner } from "@/app/components";
import { IssueSchema } from "@/app/validationSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Issue } from "@/generated/prisma/client";
import {
  Box,
  Button,
  Callout,
  DropdownMenu,
  TextField,
} from "@radix-ui/themes";
import axios from "axios";
import "easymde/dist/easymde.min.css";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form"; //this package has many purpose like submission and also display validation error in easy way
import SimpleMDE from 'react-simplemde-editor';
import { z } from "zod";

//no need to load the below code because it is already the full form is rendered dynamically
// const SimpleMDE = dynamic(() => import("react-simplemde-editor"), {
//   ssr: false,
// }); //this is lazy loading //we are disabling the server side rendering

type IssueFormData = z.infer<typeof IssueSchema>; //the type will loke like the schema (createIssueSchema)

const IssueForm = ({ issue }: { issue?: Issue }) => {
  //the parameter is optinal it is because it only used in edit path('/issues/{id}/edit') //to repopulate the fields
  //register - is used as  to register the input field //we mostly use {...register('title')} the spread opreator is telling as there are other elements we can console log it like console.log(register('title'))
  //control - we use it for the Controller form the react hook form
  //handleSubmit - will handle the submit for us
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IssueFormData>({
    resolver: zodResolver(IssueSchema),
  });

  const [isSubmitting, setSubmitting] = useState(false); //this for the spinner //true when submitting //false for submitting
  const router = useRouter(); //this will help us in like pushing the user to some kind of page after the submission success
  const [error, setError] = useState("");
 

  const onSubmit = handleSubmit(async (data) => {
    try {
      setSubmitting(true); //true when submitting
      if (issue) {
        //if there is issue we have to patch the shit //from the issue we will get the id then patch by passing the data //we dont use put because we dont want to replace the default va;ues like createdAt....
        await axios.patch("/api/issues/" + issue.id, data);
        router.push("/issues/list");
        router.refresh();
      } else {
        await axios.post("/api/issues", data); //post it to our database through our api
        router.push("/issues/list"); //after success this will push the user to the issues page
      }
    } catch (error) {
      setSubmitting(false); //if we caught error

      setError("An unexpected error occured ");
    }
  });

  return (
    <div className="max-w-xl">
      {error && (
        <Callout.Root color="red" className="mb-5">
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
      <form className="space-y-3" onSubmit={onSubmit}>
        <TextField.Root
          defaultValue={issue?.title}
          placeholder="Title"
          {...register("title")}
        />
        <ErrorMessage>{errors.title?.message}</ErrorMessage>
        <Controller
          name="description"
          control={control} //from the useForm
          defaultValue={issue?.description}
          render={({ field }) => (
            <SimpleMDE placeholder="Description" {...field} />
          )}
        />
        <ErrorMessage>{errors.description?.message}</ErrorMessage>

  
          <Controller
            name="status"
            control={control}
            defaultValue={issue?.status}
            render={({ field }) => (
              <Box>
                <DropdownMenu.Root>
                  <DropdownMenu.Trigger>
                    <Button variant="solid" size="1" color="gray">
                      {field.value || "Your current status"}
                      <DropdownMenu.TriggerIcon />
                    </Button>
                  </DropdownMenu.Trigger>

                  <DropdownMenu.Content size="1">
                    <DropdownMenu.Item onClick={() => field.onChange("OPEN")}>
                      OPEN
                    </DropdownMenu.Item>
                    <DropdownMenu.Item
                      onClick={() => field.onChange("IN_PROGRESS")}
                    >
                      IN_PROGRESS
                    </DropdownMenu.Item>
                    <DropdownMenu.Item onClick={() => field.onChange("CLOSED")}>
                      CLOSED
                    </DropdownMenu.Item>
                  </DropdownMenu.Content>
                </DropdownMenu.Root>
              </Box>
            )}
          />
       
        <Button disabled={isSubmitting}>
          {issue ? "Update issue" : "Submit New Issue"}{" "}
          {isSubmitting && <Spinner />}
        </Button>
      </form>
    </div>
  );
};

export default IssueForm;
