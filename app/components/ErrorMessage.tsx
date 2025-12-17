//this component is useful for the Form component like to display Title is required typeshit

import { Text } from '@radix-ui/themes'
import { PropsWithChildren } from 'react'

const ErrorMessage = ({children} : PropsWithChildren) => {
  if(!children) return null
    return (
    <Text color='red' as='p'>{children}</Text>
  )
}

export default ErrorMessage