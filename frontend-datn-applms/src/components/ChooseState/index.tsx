import React from "react";
import { urlImage } from "../../constant/config";

interface ChooseStateProps {
  title?: string;
  subTitle?: string;
}

export const ChooseState: React.FC<ChooseStateProps> = ({
  title = "",
  subTitle = "",
}) => {
  return (
    <div className="flex flex-col items-center justify-center ">
      <img
        src={`${urlImage}/chooseOption.gif`}
        alt="Empty State"
        width={500}
        height={500}
      />
      <h2 className="text-2xl font-bold mb-2">{title}</h2>
      <p className="text-gray-600">{subTitle}</p>
    </div>
  );
};
