import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export const FactBox = ({ children }: Props) => {
  return (
    <div className="p-3 border-gray-300 border-2 border-solid rounded flex justify-between items-center">
      {children}
    </div>
  );
};
