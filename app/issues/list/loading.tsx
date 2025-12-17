import { Skeleton } from '@/app/components/index'
import { Table } from '@radix-ui/themes'
import IssueAction from '../../components/IssueAction'


const loading = () => {
    
    const Issues = [1,2,3,4,5] //simple just for the skeleton 

  return (
    <div>
         <IssueAction />
        <Table.Root variant="surface">
            <Table.Header>
              <Table.Row>
                <Table.ColumnHeaderCell>Issues</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell className="hidden md:table-cell">
                  Status
                </Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell className="hidden md:table-cell">
                  Created At
                </Table.ColumnHeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {Issues.map((issue) => (
                <Table.Row key={issue}>
                  <Table.Cell>
                   <Skeleton />
                    <div className="block md:hidden">
                      <Skeleton />
                    </div>
                  </Table.Cell>
                  <Table.Cell className="hidden md:table-cell">
                   <Skeleton />
                  </Table.Cell>
                  <Table.Cell className="hidden md:table-cell">
                    <Skeleton />
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table.Root>
    </div>
  )
}

export default loading