import { strokeWidth } from "@/lib/data";
import { useWhiteBoard } from "@/stores/whiteboard.store";
import React, { useState } from "react";

const StrokeSelectorPanel = () => {

  const [strokeDropdown, setStrokeDropdown] = useState(false);

  const selectedStrokeWidth = useWhiteBoard((state) => state.selectedStrokeWidth);
  const selectedColor = useWhiteBoard((state) => state.selectedColor);
  const { setStrokeWidth } = useWhiteBoard();

  return (
    <div
      tabIndex={0}
      className="h-7 w-7 border rounded-md border-zinc-200 flex items-center justify-center relative bg-white cursor-pointer hover:bg-zinc-100"
      onClick={() => setStrokeDropdown(!strokeDropdown)}
    >
      <div
        style={{
          height: `${selectedStrokeWidth}px`,
          width: `${selectedStrokeWidth}px`,
          backgroundColor: selectedColor,
        }}
        className={` rounded-full outline-2 outline-gray-300  `}
      ></div>
      <div
        className={`w-10 h-auto border bg-zinc-100  border-zinc-500  z-50 transition-discrete duration-75 ease-in-out  ${strokeDropdown ? "absolute   -bottom-30" : "hidden"} `}
      >
        <div className="h-full w-full flex flex-col items-center justify-center">
          {strokeWidth.map((width) => (
            <button
              name="stroke-opt-btn"
              className="h-8 w-full  flex items-center justify-center t hover:bg-zinc-300 cursor-pointer"
              key={width}
              onClick={() => {
                (setStrokeWidth(width), setStrokeDropdown(false));
              }}
            >
              <div
                style={{
                  height: `${width}px`,
                  width: `${width}px`,
                  backgroundColor: selectedColor,
                }}
                className={` rounded-full outline-2 outline-gray-300  `}
              ></div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StrokeSelectorPanel;
