"use client"

import { colors } from '@/lib/data'
import { useWhiteBoard } from '@/stores/whiteboard.store'
import React, { useState } from 'react'

const ColorSelectorPanel = () => {
    const [colorDropdown, setColorDropDown] = useState(false)
    const {setColor} = useWhiteBoard();
    const selectedColor = useWhiteBoard((state)=> state.selectedColor);
  return (
    <button className='h-7 w-7 rounded-md border-2 border-zinc-300 cursor-pointer relative ' style={{backgroundColor:selectedColor}} onClick={()=>setColorDropDown(!colorDropdown)} >
        <div className={`h-auto w-30 border border-zinc-300 rounded p-2 grid grid-cols-5  gap-1 bg-white ${colorDropdown?"absolute -bottom-25 -left-10 z-10 ":"hidden"} `}>
        {colors.map((color) => (
          <div
            key={color}
            onClick={() => {setColor(color), setColorDropDown(false)}}
            style={{ backgroundColor: color }}
            className={`h-5 w-5 rounded border border-zinc-500 cursor-pointer ${selectedColor === color ? "outline-2" : "outline-0"} outline-blue-300`}
          ></div>
        ))}
      </div>
    </button>
  )
}

export default ColorSelectorPanel