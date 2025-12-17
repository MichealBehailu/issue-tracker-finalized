import { prisma } from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

//this is an endpoint to get the users that can be easily used by component (AssigneeSelect.tsx)
export async function GET(request : NextRequest){ //if we removed request : NextRequest it will be cached so that we dont want cache
    const users = await prisma.user.findMany({orderBy : {name : 'asc'}}); //when featched from backend it will be ordered by the name asendingly

    return NextResponse.json(users)

}