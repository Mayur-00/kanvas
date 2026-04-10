"use client"

import { useWhiteBoard } from '@/stores/whiteboard.store'
import { Undo2, Redo2 } from 'lucide-react'
import React from 'react'

const RedoButton = () => {

  const {redoArray, redoStrokesArray, canvasRef} = useWhiteBoard();
   const redo = ()=> {
     console.log("redo cliecked");

    if (!canvasRef) {
      return;
    }
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    redoStrokesArray();

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawStoredElems();
  }

  return (
      <button
       
        className="px-2 py-2 rounded text-black hover:bg-red-60 hover:bg-blue-200"
      >
        <Redo2 className="size-4" />
      </button>
  )
}

export default RedoButton