import { ChangeEventHandler, CSSProperties } from "react";
import { Option } from "../../types/PlanetImageOptions";
import { ImageOption } from "../ImageOption/ImageOption";

interface Props {
  options: Option[];
  current: string;
  color: string;
  handleChange: ChangeEventHandler;
}

interface CSSProp extends CSSProperties {
  "--color": string;
}

export const ImageChanger = ({
  options,
  current,
  color,
  handleChange,
}: Props) => {
  return (
    <aside
      className="flex flex-col gap-4 w-full max-w-sm"
      style={
        {
          "--color": color,
        } as CSSProp
      }
    >
      {options.map((option, index) => (
        <ImageOption
          radioGroupName="img-planet-option"
          key={option.value}
          id={option.value}
          index={index + 1}
          isChecked={current === option.value}
          handleChange={handleChange}
        />
      ))}
    </aside>
  );
};
