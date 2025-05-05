import { Loader2 } from 'lucide-react'

const Loader = () => {
  return (
    <div className=" flex  justify-center items-center min-h-screen w-full ">
    <Loader2 className=" text-3xl text-white animate-spin " />
  </div>
  )
}

export default Loader