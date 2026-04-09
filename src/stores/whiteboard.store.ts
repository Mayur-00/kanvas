import {create} from "zustand";
import { WhiteBoardStoreIntercface } from "./types";
import { Point } from "@/types/types";
import { createRef } from 'react';


export const useWhiteBoard = create<WhiteBoardStoreIntercface>((set) => ({
      canvasRef:createRef<HTMLCanvasElement>(),
      isDrawing:false,
      isStrokeDropdownOpen:false,
      startPoint:null,
      selectedColor:"black",
      selectedStrokeWidth:2,
      shapeType:"pen",

        setDrawingTrue: ()=>set({isDrawing:true}),
        setDrawingFalse: ()=>set({isDrawing:false}),
        setStartPoint: (point:Point | null)=>set({startPoint:point }),
        setColor: (color:string) =>set({selectedColor:color}),
        setStrokeWidth: (width:number)=>set({selectedStrokeWidth:width}),
        setShapeType: (type:string) => set({shapeType:type}),

}))