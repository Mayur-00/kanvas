"use client";

import {options } from "@/lib/data";
import { useWhiteBoard } from "@/stores/whiteboard.store";
import UndoButton from "./UndoButton";
import RedoButton from "./RedoButton";
import ColorSelectorPanel from "./ColorSelectorPanel";
import StrokeSelectorPanel from "./StrokeSelectorPanel";
import ClearButton from "./ClearButton";
import OptionsPanel from "./OptionsPanel";

const NavBar = () => {
  const { setShapeType } = useWhiteBoard();
  const shapeType = useWhiteBoard((state) => state.shapeType);


  return (
    <div className="flex gap-2 px-2 items-center h-15 w-auto bg-zinc-100 rounded-md border border-zinc-500 ">
      <OptionsPanel/>

     <ClearButton/>
      <UndoButton />
      <RedoButton />
      <ColorSelectorPanel />
      <StrokeSelectorPanel/>
    </div>
  );
};

export default NavBar;
