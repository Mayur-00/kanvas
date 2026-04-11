"use client"

import React from 'react'
import { useWhiteBoard } from '@/stores/whiteboard.store';
import { Trash } from 'lucide-react';

const ClearButton = () => {
      const {clearUndoRedoArr } =
        useWhiteBoard();
      const canvasRef = useWhiteBoard((state) => state.canvasRef) as React.RefObject<HTMLCanvasElement> | null;
      const undoArray = useWhiteBoard((state) => state.strokesArray) 
      const redoArray = useWhiteBoard((state) => state.redoArray)

      const clear = () => {
        if (!canvasRef) {
          return;
        }
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;
        clearUndoRedoArr();
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      };
  return (
    <button
        onClick={clear}
        disabled={undoArray.length ===0 && redoArray.length===0}
        name="clear-btn"
        className="px-2 py-2 rounded text-black hover:bg-red-60 hover:bg-red-200 cursor-pointer  disabled:cursor-not-allowed disabled:text-zinc-500"
      >
        <Trash className="size-4" />
      </button>
  )
}

export default ClearButton