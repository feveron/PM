import React from "react";
import type { TodoItem } from "../types/todo";
import { CheckBox } from "./CheckBox";
import Delete from '../assets/icons/delete-svgrepo-com.svg';

export function TodoItem({ title, description }: TodoItem) {
  const [done, setDone] = React.useState(false);
  const [expanded, setExpanded] = React.useState(false);

  return (
    <div onClick={() => setExpanded(prev => !prev)} className="flex justify-center bg-white flex-col p-4 border rounded-lg shadow-md w-full cursor-pointer transition">
      <div className="px-4 items-center flex w-full justify-between flex-row">
        <div className="flex-row items-center justify-center gap-4 flex">
           <div onClick={(e) => e.stopPropagation()}>
              <CheckBox onChange={setDone} checked={done} />
            </div>
          <h2 title={title} className="text-2xl line-clamp-1 font-bold text-black">{title}</h2>
        </div>
          <img onClick={(e) => e.stopPropagation()} className="w-6 h-6 cursor-pointer" src={Delete} alt="delete"/>
      </div>
      <p className={`px-3 text-gray-800 text-justify mt-2 ${
          expanded ? "" : "line-clamp-2"
        }`}>{description}</p>
    </div>
  )
}