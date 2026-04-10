import {create} from "zustand";
import { WhiteBoardStoreIntercface } from "./types";
import { Point, StrokeElemType } from "@/types/types";
import { createRef } from 'react';


export const useWhiteBoard = create<WhiteBoardStoreIntercface>((set, get) => ({
      canvasRef:createRef<HTMLCanvasElement>(),
      isDrawing:false,
      isStrokeDropdownOpen:false,
      startPoint:null,
      selectedColor:"black",
      selectedStrokeWidth:2,
      shapeType:"pen",
      strokesArray:[],
      redoArray:[],

        setDrawingTrue: ()=>set({isDrawing:true}),
        setDrawingFalse: ()=>set({isDrawing:false}),
        setStartPoint: (point:Point | null)=>set({startPoint:point }),
        setColor: (color:string) =>set({selectedColor:color}),
        setStrokeWidth: (width:number)=>set({selectedStrokeWidth:width}),
        setShapeType: (type:string) => set({shapeType:type}),
        pushStrokesInArray : (stroke:StrokeElemType) =>{
         const {strokesArray} = get();

         strokesArray.push(stroke);
        },
        pullStrokesOutOfArray : () =>{
           const {strokesArray,redoArray} = get();
         
           redoArray.push(strokesArray.pop()!)
        },
        redoStrokesArray : () =>{
           const {strokesArray,redoArray} = get();
         
           strokesArray.push(redoArray.pop()!)
        },

}))