"use client"

import { getFolderInfo } from '@/actions/workspace'
import { useQueryData } from '@/hooks/userQueryData'
import { folderInfoI } from '@/types/index.types'
import React from 'react'

const FolderInfo = ({folderid}:{folderid:string}) => {
    const {data} = useQueryData(() => getFolderInfo(folderid),["folder-info", folderid], true)
     const folderinfo = data as folderInfoI 
  return (
    <h2 className=' text-2xl '>{folderinfo.data.name}</h2>
  )
}

export default FolderInfo