import React from "react";
import type { TodoItemProps } from "../types/todo";
import { CheckBox } from "./CheckBox";
import Delete from '../assets/icons/delete-svgrepo-com.svg';
import Edit from '../assets/icons/edit-svgrepo-com.svg';
import { twMerge } from "tailwind-merge";

export function TodoItem({ id, title, description, done, onToggle, onDelete, onUpdate }: TodoItemProps) {
  const [expanded, setExpanded] = React.useState(false);
  const [isEditing, setIsEditing] = React.useState(false);
  const [editTitle, setEditTitle] = React.useState(title);
  const [editDescription, setEditDescription] = React.useState(description);

  return (
    <div onClick={() => setExpanded(prev => !prev)} className="flex justify-center bg-white flex-col p-4 border rounded-lg shadow-md w-full cursor-pointer transition">
      <div className="px-4 items-center flex w-full justify-between flex-row">
          <div className="flex items-center gap-4 basis-[80%] min-w-0">
             <div onClick={(e) => e.stopPropagation()}>
              <CheckBox onChange={()=> onToggle(id)} checked={done} />
          </div>
          <h2
            title={title}
            className={twMerge(
              "text-lg sm:text-2xl font-bold text-black truncate",
              done ? "line-through text-gray-500" : ""
            )}
          >{title}</h2>
        </div>
        <div className="flex flex-row gap-1 items-center shrink-0 justify-center">
          <img onClick={(e) => {
            e.stopPropagation()
            setIsEditing(true)
            }} className="w-5 h-5 cursor-pointer" src={Edit} alt="edit"/>
          <img onClick={(e) => {
            e.stopPropagation();
            onDelete(id);
            }} className="w-6 h-6 cursor-pointer" src={Delete} alt="delete"/>
        </div>
      </div>
      <p className={`px-3 text-gray-800 break-words text-justify mt-2 ${done ? 'line-through text-gray-500' : ''}  ${
          expanded ? "" : "line-clamp-2"
        }`}>{description}</p>
        {isEditing && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div
              className="bg-white p-6 rounded-lg w-full max-w-md"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-lg font-bold mb-4">Edit task</h3>

              <input
                className="w-full border p-2 mb-3 rounded"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
              />

              <textarea
                className="w-full border h-24 p-2 mb-4 rounded"
                value={editDescription}
                onChange={(e) => setEditDescription(e.target.value)}
              />

              <div className="flex justify-end gap-2">
                <button
                  className="px-3 py-1 border rounded"
                  onClick={() => setIsEditing(false)}
                >
                  Cancel
                </button>

                <button
                  className="px-3 py-1 bg-blue-500 text-white rounded"
                  onClick={() => {
                    onUpdate(id, {
                      title: editTitle,
                      description: editDescription,
                    });
                    setIsEditing(false);
                  }}
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        )}
    </div>
  )
}