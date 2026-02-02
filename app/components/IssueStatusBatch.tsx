import { Status } from "@/generated/prisma/client"
import { Badge } from '@radix-ui/themes'
import React from 'react'

//Record is very useful for like key value pair

const IssueMaper : Record<Status , {label : string, color : 'red' | 'violet' | 'green'}> = { //the key is Status and the value is object with {label : string, color : 'red'....}
    OPEN : {label : 'OPEN' , color : 'red'}, 
    IN_PROGRESS : {label : 'IN_PROGRESS' , color : 'violet'},
    CLOSED : {label : 'CLOSED' , color : 'green'}
}

const IssueStatusBatch = ({status} : {status : Status}) => { //making it inline the props we can make it explicit
  return (
    <Badge color={IssueMaper[status].color}>{IssueMaper[status].label}</Badge>
  )
}

export default IssueStatusBatch