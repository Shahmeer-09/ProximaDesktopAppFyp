import { Card,  CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import React from 'react'

type Props = {
    title:string,
    description:string
    children?:React.ReactNode,
    footer?:React.ReactNode
}

const GlobalCard = ({ title,children, description , footer }: Props) => {
  return (
    <Card className= ' bg-transparent py-2 gap-4 ' >
        <CardHeader className='p-4' >
           <CardTitle className='  text-lg  text-zinc-300 ' >{title}</CardTitle>
           <CardDescription className='text-zinc-400'>{description}</CardDescription>
        </CardHeader>
      
            {footer && <div className='p-4' >{footer}</div> }
            {children && <CardFooter className='p-4' >{children}</CardFooter> }
      
    </Card>
  )
}

export default GlobalCard