import { Point } from "@/types/types";
import { Socket } from "socket.io-client";
import { createRef, Ref } from 'react';
export interface WhiteBoardStoreIntercface {
  canvasRef:Ref<HTMLCanvasElement> | null
  isDrawing:boolean;
  isStrokeDropdownOpen:boolean;
  startPoint:Point | null;
  selectedColor:string;
  selectedStrokeWidth:number;
  shapeType:string;


  setDrawingTrue: ()=>void
  setDrawingFalse: ()=>void
  setStartPoint: (point:Point | null)=>void,
  setColor: (color:string) =>void,
  setStrokeWidth: (width:number)=>void,
  setShapeType: (type:string) => void


};