import { z } from "zod";

export const IssueSchema = z.object({  //we used this schema on the Post route (api/issues)
  title: z.string().min(1,{message : 'Title is required'}).max(255),
  description: z.string().min(1,{message:'Description is required'}).max(65535),
 status: z
  .enum(["OPEN", "IN_PROGRESS", "CLOSED"])
  .default("OPEN")
  .optional(),
});

export const pathcSchema = z.object({ //this is used for patch route (api/issues/[id])
  title: z.string().min(1,{message : 'Title is required'}).max(255).optional(),
  description: z.string().min(1,{message:'Description is required'}).max(65535).optional(),
 status: z
  .enum(["OPEN", "IN_PROGRESS", "CLOSED"])
  .default("OPEN")
  .optional(),
  assignedUserId : z.string().min(1,"AssignedToUser is required.").max(255).optional().nullable() //we can explicitly make this null(to unassign)
});
