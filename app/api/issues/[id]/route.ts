import authOptions from "@/app/auth/authOptions";
import {  pathcSchema } from "@/app/validationSchemas";
import { prisma } from "@/prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";


export async function PATCH (request : NextRequest, {params } : {params : Promise <{id : string}>}) {
    
 
     const session = await getServerSession(authOptions); //to get if the user is authniticated or not // using this we can protect this endpoint 
    
     if(!session) 
      return NextResponse.json({}, {status : 401}) //if there is no session then it is unauthorized to edit so we protect our API endpoint like this 

    const body  = await request.json(); //get the patch from the request body

    const {title,description,status,assignedToUserId}= body; //so instead of typing body.assignedToUserId we can destructure the body and grab title , description , status and assignedToUserId

    if(assignedToUserId){ //if there is assignedToUserId that is sent from the request //this is actually found on user table in issue-tracker database then we grab the id 
       const user =  await prisma.user.findUnique({where : {id: assignedToUserId}}) //we have to check if the user exist
       
       if(!user){
        return NextResponse.json({error: "Invalid user."},{status : 400}) //bad request
       }
    }

    const validation = pathcSchema.safeParse(body)  //validation 

    if(!validation.success) 
        return NextResponse.json(validation.error.issues, {status : 400})

   
    const issue = await prisma.issue.findUnique({
        where : {id : parseInt((await params).id) } //there is await because it is a promise
    });

    if(!issue) 
        return NextResponse.json({error : 'Invalid issue'}, {status : 404})

    const updatedIssue = await prisma.issue.update({
        where : {id : issue.id},
        data : {
            title,// title : body.title,
            description,// description : body.description,
            status,// status : body.status
            assignedToUserId //assignedToUserId : body.assignedToUserId
        }

    });

    return NextResponse.json(updatedIssue);

    

}

export async function DELETE (request : NextRequest,{params} : {params : Promise <{id:string}>}) {// The first argument is actually the request object, which doesn't have a params property, causing params to be undefined.
     const session = await getServerSession(authOptions); //to get if the user is authniticated or not // using this we can protect this endpoint 
    
     if(!session) 
      return NextResponse.json({}, {status : 401}) //if there is no session then it is unauthorized to delete so we protect our API endpoint like this 
    
    
    // i will check if there is an issue with the id provided using the prisma 
    
    const issue = await prisma.issue.findUnique({
        where : {id : parseInt((await params).id)} //we need to await it to get the id 
    })

    if(!issue)
        return NextResponse.json({error: 'Invalid issue'}, {status : 404})

    await prisma.issue.delete({   // delete from the database 
        where : {id : issue.id}
    }
    );

    return NextResponse.json({}) //return nothing after deletion
}




