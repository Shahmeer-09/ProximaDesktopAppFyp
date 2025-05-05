import { Button } from '@/components/ui/button';
import { Link } from 'lucide-react';
import React from 'react'
import { toast } from 'sonner';

type Props = {
    className?: string;
    variants?:VariantType;
    videoId: string;
}
type VariantType = "default" |"destructive"| "link"|"outline"|"ghost"|"secondary"
const CopyLink = (props: Props) => {
    const copyToClipboard = () => {
        navigator.clipboard.writeText(`${process.env.NEXT_PUBLIC_HOST_LINK}/preview/${props.videoId}`)
        toast("Copied", {
            description: "The link has been copied to your clipboard.",
        })
    }
  return (
    <Button onClick={copyToClipboard} variant={props.variants} className={props.className} >
        <Link size={15}  className='text-zinc-300 hover:text-zinc-200 '  />
    </Button>
  )
}

export default CopyLink