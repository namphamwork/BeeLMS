import React from "react";
import { Classroom } from "../../../types/Classroom";

interface ClassItemProps{
  item:Classroom;
}
export const ClassItem: React.FC<ClassItemProps> = ({item}) => {
  
  return (
    <li className="mb-2 list-none">
      <a
        href="#"
        className="block px-4 py-2 rounded-md bg-gray-200 text-gray-700 hover:bg-gray-300 transition-colors duration-300"
      >
        {item.course.title} - {item.title}
      </a>
    </li>
  );
};
