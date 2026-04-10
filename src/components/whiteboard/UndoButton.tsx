"use client"

import { Undo2 } from 'lucide-react'
import React from 'react'

const UndoButton = () => {
  return (
      <button
       
        className="px-2 py-2 rounded text-black hover:bg-red-60 hover:bg-blue-200"
      >
        <Undo2 className="size-4"/>
      </button>
  )
}

export default UndoButton