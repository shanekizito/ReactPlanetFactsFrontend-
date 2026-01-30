import { ChangeEventHandler } from "react";

interface Props {
  radioGroupName: string;
  id: string;
  index: number;
  isChecked: boolean;
  handleChange: ChangeEventHandler;
}

export const ImageOption = ({
  radioGroupName,
  id,
  index,
  isChecked,
  handleChange,
}: Props) => {
  return (
    <div className="w-full">
      <input
        type="radio"
        className="sr-only"
        name={radioGroupName}
        id={id}
        value={id}
        checked={isChecked}
        onChange={handleChange}
      />
      <label
        htmlFor={id}
        className={`btn-nasa block cursor-pointer flex items-center gap-4 ${isChecked ? "bg-white bg-opacity-20 border-opacity-100" : ""
          }`}
      >
        <span className="text-[10px] text-gray-500 font-black">0{index}</span>
        <span className="uppercase text-xs tracking-[0.2em]">{id}</span>
      </label>
    </div>
  );
};
