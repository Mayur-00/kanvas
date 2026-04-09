"use client";
import { colors, strokeWidth } from "@/lib/data";
import { useWhiteBoard } from "@/stores/whiteboard.store";
import React, { useState } from "react";

const NavBar = () => {
  const [strokeDropdown, setStrokeDropdown] = useState(false);

  const {
    setDrawingTrue,
    setDrawingFalse,
    setColor,
    setStrokeWidth,
    setShapeType,
    setStartPoint,
  } = useWhiteBoard();
  const shapeType = useWhiteBoard((state) => state.shapeType);
  const drawing = useWhiteBoard((state) => state.isDrawing);
  const selectedStrokeWidth = useWhiteBoard(
    (state) => state.selectedStrokeWidth,
  );
  const startPoint = useWhiteBoard((state) => state.startPoint);
  const selectedColor = useWhiteBoard((state) => state.selectedColor);
   const canvasRef = useWhiteBoard((state) => state.canvasRef) as React.RefObject<HTMLCanvasElement> | null;

   const clear = () => {
      if(!canvasRef){
      return;
    }
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  return (
    <div className="flex gap-2 p-2 items-center ">
      <button
        onClick={() => setShapeType("pen")}
        className={`px-4 py-2 rounded ${
          shapeType === "pen"
            ? "bg-blue-600 text-white"
            : "bg-gray-200 hover:bg-gray-300"
        }`}
      >
        ✏️ Pen
      </button>
      <button
        onClick={() => setShapeType("line")}
        className={`px-4 py-2 rounded ${
          shapeType === "line"
            ? "bg-blue-600 text-white"
            : "bg-gray-200 hover:bg-gray-300"
        }`}
      >
        📏 Line
      </button>
      <button
        onClick={() => setShapeType("rectangle")}
        className={`px-4 py-2 rounded ${
          shapeType === "rectangle"
            ? "bg-blue-600 text-white"
            : "bg-gray-200 hover:bg-gray-300"
        }`}
      >
        ▭ Rectangle
      </button>
      <button
        onClick={() => setShapeType("circle")}
        className={`px-4 py-2 rounded ${
          shapeType === "circle"
            ? "bg-blue-600 text-white"
            : "bg-gray-200 hover:bg-gray-300"
        }`}
      >
        ⭕ Circle
      </button>
      <button
        onClick={clear}
        className="px-4 py-2 rounded bg-red-500 hover:bg-red-600 text-white"
      >
        🗑️ Clear
      </button>

      <div className="h-15 w-50 border border-zinc-300 rounded p-2 grid grid-cols-8 overflow-y-scroll">
        {colors.map((color) => (
          <button
            key={color}
            onClick={() => setColor(color)}
            style={{ backgroundColor: color }}
            className={`h-5 w-5 rounded cursor-pointer ${selectedColor === color ? "outline-2" : "outline-0"} outline-gray-200`}
          ></button>
        ))}
      </div>
      <div
        className="h-10 w-10 border border-zinc-200 flex items-center justify-center relative"
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
          className={`w-10 h-auto bg-gray-500  z-50 ${strokeDropdown ? "absolute -right-15 -bottom-30" : "hidden"} `}
        >
          <div className="h-full w-full flex flex-col items-center justify-center">
            {strokeWidth.map((width) => (
              <div
                className="h-8 w-full bg-white flex items-center justify-center border border-zinc-200 "
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
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
