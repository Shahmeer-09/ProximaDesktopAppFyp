"use client"

import { UseCreateFolder } from '@/hooks/UseCreateFolder'
import React from 'react'
import { Button } from '../../ui/button'
import { Folder } from 'lucide-react'

type Props = {
    worjspaceID: string
}

const CreateFolders = ({worjspaceID}: Props) => {
    const {OncreateFolder, isPending} = UseCreateFolder(worjspaceID)
  return (
      <Button disabled={isPending} onClick={OncreateFolder} variant={"default"} className=" bg-neutral-800 cursor-pointer hover:bg-neutral-800/60 text-zinc-300 flex items-center gap-2 py-6 px-4 rounded-full ">
        
        <Folder size={20} strokeWidth={4} className="text-neutral-400" />
        <span>Create Folder</span>
      </Button>
  )
}

export default CreateFolders