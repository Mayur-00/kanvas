"use client";
import { useWhiteBoard } from "@/stores/whiteboard.store";
import { Point } from "@/types/types";
import { useRef, useEffect, useState } from "react";
import { io } from "socket.io-client";
import NavBar from "./whiteboard/NavBar";






export default function Whiteboard() {
  // const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const canvasImageRef = useRef<ImageData | null>(null);
  // const socketRef = useRef(io("http://localhost:5000"));

  // const lastRemotePointRef = useRef<Point | null>(null);

  const roomId = "1";
  const {setDrawingTrue, setDrawingFalse, setStartPoint} = useWhiteBoard();
  const shapeType = useWhiteBoard((state)=>state.shapeType);
  const drawing = useWhiteBoard((state)=>state.isDrawing);
  const selectedStrokeWidth = useWhiteBoard((state)=>state.selectedStrokeWidth);
  const startPoint = useWhiteBoard((state)=>state.startPoint);
  const selectedColor = useWhiteBoard((state)=>state.selectedColor);
  const canvasRef = useWhiteBoard((state) => state.canvasRef) as React.RefObject<HTMLCanvasElement> | null

  



  useEffect(() => {
    if(!canvasRef){
      return;
    }
    console.log(canvasRef)
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // const socket = socketRef.current;

    ctx.lineCap = "round";
    ctx.lineWidth = selectedStrokeWidth;
    ctx.strokeStyle = selectedColor;

//     socket.on("start-drawing", (currentPoint:Point, color:string) => {
//       ctx.beginPath();
//       ctx.strokeStyle = color;
//       ctx.moveTo(currentPoint.x, currentPoint.y);

//       lastRemotePointRef.current = currentPoint;
//     })

//     socket.on("draw", ({currentPoint, color}) => {
//       console.log("draw event received", currentPoint);

//       const lastPoint = lastRemotePointRef.current;
//       ctx.strokeStyle =color
//       if (!lastPoint) {
//         // Start a new path
//         ctx.beginPath();
//         ctx.moveTo(currentPoint.x, currentPoint.y);
//       } else {
//         // Continue from last point
//         ctx.lineTo(currentPoint.x, currentPoint.y);
//         ctx.stroke();
       
//       }
//       lastRemotePointRef.current = currentPoint;
//     });

//     socket.on("stop-drawing", () => {
//       ctx.strokeStyle = selectedColor;
//   lastRemotePointRef.current = null;
// });

//     socket.on("user-joined", (socketId: string) => {
//       console.log("user joined", socketId);
//     });

//     socket.on("connected", () => {
//       console.log("connected to server");
//       socket.emit("join-room", roomId);
//     });

//     return () => {
//       socket.off("draw");
//       socket.off("connected");
//       socket.off('stop-drawing');
//     };
  // }, [selectedColor, selectedStrokeWidth]);
  }, [selectedColor, selectedStrokeWidth]);

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
      if(!canvasRef){
      return;
    }
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.strokeStyle = selectedColor;

    // Save current canvas state for shape preview
    canvasImageRef.current = ctx.getImageData(
      0,
      0,
      canvas.width,
      canvas.height,
    );

    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    const point = {
      x: (e.nativeEvent.clientX - rect.left) * scaleX,
      y: (e.nativeEvent.clientY - rect.top) * scaleY,
    };

    setStartPoint(point);

    if (shapeType === "pen") {
      ctx.beginPath();
      ctx.moveTo(point.x, point.y);
    }
    //  socketRef.current.emit("start-drawing", { roomId, point, color:selectedColor });

    setDrawingTrue()
  };

  const stopDrawing = () => {
    setDrawingFalse();
    setStartPoint(null);
    // socketRef.current.emit("stop-drawing", roomId)
    // lastRemotePointRef.current = null;
  };

    const paintRectangle = (
    canvas: HTMLCanvasElement,
    currentPoint: Point,
    startPoint: Point,
  ) => {
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const width = currentPoint.x - startPoint.x;
    const height = currentPoint.y - startPoint.y;
    ctx.rect(startPoint.x, startPoint.y, width, height);
  };

  const paintPen = (canvas: HTMLCanvasElement, currentPoint: Point) => {
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.lineTo(currentPoint.x, currentPoint.y);
    ctx.stroke();

  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!drawing) return;

      if(!canvasRef){
      return;
    }
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    const currentPoint = {
      x: (e.nativeEvent.clientX - rect.left) * scaleX,
      y: (e.nativeEvent.clientY - rect.top) * scaleY,
    };

    console.log(`x: ${currentPoint.x}, y:${currentPoint.y}`);

    if (shapeType === "pen") {
      paintPen(canvas, currentPoint);
      // socketRef.current.emit("draw", { roomId, currentPoint, color:selectedColor });
    } else if (startPoint) {
      // For shapes, restore canvas and redraw
      if (canvasImageRef.current) {
        ctx.putImageData(canvasImageRef.current, 0, 0);
      }

      ctx.beginPath();

      if (shapeType === "rectangle") {
        paintRectangle(canvas, currentPoint, startPoint);
      } else if (shapeType === "circle") {
        const radius = Math.sqrt(
          Math.pow(currentPoint.x - startPoint.x, 2) +
            Math.pow(currentPoint.y - startPoint.y, 2),
        );
        ctx.arc(startPoint.x, startPoint.y, radius, 0, 2 * Math.PI);
      } else if (shapeType === "line") {
        ctx.moveTo(startPoint.x, startPoint.y);
        ctx.lineTo(currentPoint.x, currentPoint.y);
      }

      ctx.stroke();
    }
  };

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
    <div className="flex flex-col gap-4 items-center ">
     <NavBar/>
      <canvas
        ref={canvasRef}
        width={800}
        height={500}
        className="border-2 border-gray-400 bg-white cursor-crosshair"
        onMouseDown={startDrawing}
        onMouseUp={stopDrawing}
        onMouseMove={draw}
        onMouseLeave={stopDrawing}
        onClick={(e)=>console.log(e)}
      />
    </div>
  );
}
