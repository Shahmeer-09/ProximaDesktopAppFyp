import { TabsContent } from '@/components/ui/tabs'
import React from 'react'

type Props = {
    transcript:string
}

const Trnascript = (props: Props) => {
  return (
     <TabsContent
     value="Transcript"
      className=" gap-y-5  p-5 rounded-xl bg-zinc-800"
     >
        <p className= ' text-neutral-300 capitalize'>

       {props.transcript}
        </p>
     </TabsContent>
  )
}

export default Trnascript