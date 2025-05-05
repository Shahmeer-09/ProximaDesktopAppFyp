import { Button } from '@/components/ui/button'
import React from 'react'
import Loader from './Loader'
import { useSubscription } from '@/hooks/UseSubscription'

const Paymentbutton = () => {
    const { OnSubscribe, isProcessing } = useSubscription()
  return (
    <Button onClick={OnSubscribe} className=' text-sm w-full bg-white text-zinc-700 '>
        <Loader  state={isProcessing}>
           Upgrade
        </Loader>
    </Button>
  )
}

export default Paymentbutton