'use client'

//this is very important, we need to wrap the layout.tsx body with this component and also this very useful to setup ReactQuery

import {QueryClient,QueryClientProvider as ReactQueryClientProvide} from '@tanstack/react-query' 
import { PropsWithChildren } from 'react';

const queryClient = new QueryClient();

const QueryClientProvider = ({children} : PropsWithChildren) => {
  return (
    <ReactQueryClientProvide client={queryClient}>
        {children}
    </ReactQueryClientProvide>
  )
}

export default QueryClientProvider