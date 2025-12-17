'use client' //added this onmyown
import dynamic from 'next/dynamic'
import IssueFormSkeleton from './loading'

const IssueForm = dynamic( //importing the full form dynamically  
  ()=>import('@/app/issues/_component/IssueForm'),
  {
    ssr : false,
    loading : ()=><IssueFormSkeleton/>
  }
)

const NewIssuePage = () => {
  return (
    <IssueForm />
  )
}

export default NewIssuePage