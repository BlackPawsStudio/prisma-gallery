import { IColors } from "@/utils/types";
import { ColorInput } from "./ColorInput";

interface EditColorsFormProps {
  colors: IColors;
  setColors: (colors: IColors) => void;
  className?: string;
}

export const EditColorsForm = ({
  colors,
  setColors,
  className,
}: EditColorsFormProps) => {
  return (
    <div className={`${className} flex flex-col gap-2`}>
      <ColorInput
        title={"Main Color"}
        defaultValue={colors.mainColor}
        onChange={(color: string) => setColors({ ...colors, mainColor: color })}
      />
      <ColorInput
        title={"Main Second Color"}
        defaultValue={colors.mainDarkerColor || "#000000ff"}
        onChange={(color: string) =>
          setColors({ ...colors, mainDarkerColor: color })
        }
      />
      <ColorInput
        title={"Light Color"}
        defaultValue={colors.lightColor || "#000000ff"}
        onChange={(color: string) =>
          setColors({ ...colors, lightColor: color })
        }
      />
      <ColorInput
        title={"Text Color"}
        defaultValue={colors.textColor}
        onChange={(color: string) => setColors({ ...colors, textColor: color })}
      />
      <ColorInput
        title={"Top Color"}
        defaultValue={colors.topColor || "#000000ff"}
        onChange={(color: string) => setColors({ ...colors, topColor: color })}
      />
      <ColorInput
        title={"Side Main Color"}
        defaultValue={colors.cardColor || "#000000ff"}
        onChange={(color: string) => setColors({ ...colors, cardColor: color })}
      />
      <ColorInput
        title={"Side Second Color"}
        defaultValue={colors.cardDarkerColor || "#000000ff"}
        onChange={(color: string) =>
          setColors({ ...colors, cardDarkerColor: color })
        }
      />
      <ColorInput
        title={"Bottom Color"}
        defaultValue={colors.bottomColor || "#000000ff"}
        onChange={(color: string) =>
          setColors({ ...colors, bottomColor: color })
        }
      />
    </div>
  );
};
