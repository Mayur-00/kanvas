import { Point } from "@/types/types";


export const calculateCursorCord = (clientCord:Point, canvas:HTMLCanvasElement ) => {
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

   return {
      x: (clientCord.x - rect.left) * scaleX,
      y: (clientCord.y- rect.top) * scaleY,
    };
};