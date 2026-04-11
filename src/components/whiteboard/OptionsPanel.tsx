"use client"

import { options } from '@/lib/data'
import { useWhiteBoard } from '@/stores/whiteboard.store';

const OptionsPanel = () => {
  const { setShapeType } = useWhiteBoard();
  const shapeType = useWhiteBoard((state) => state.shapeType);

  return (
    <div className='flex gap-2'>
        {options.map((opt) => (
                <button
                  key={opt.id}
                  name={`${opt.type}-btn`}
                  onClick={() => setShapeType(opt.type)}
                  className={`px-2 py-2 rounded-sm cursor-pointer  ${
                    shapeType === opt.type
                      ? "bg-blue-600 text-white"
                      : "bg-zinc-100 hover:bg-blue-100"
                  }`}
                >
                  <opt.icon className="size-4" />
                </button>
              ))}
    </div>
  )
}

export default OptionsPanel