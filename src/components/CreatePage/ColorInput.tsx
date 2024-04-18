import { hexConverter } from "@/utils/hexConverter";
import { useEffect, useState } from "react";

interface ColorInputProps {
  title?: string;
  defaultValue: string;
  onChange: (color: string) => void;
}

export const ColorInput = ({
  title,
  defaultValue,
  onChange,
}: ColorInputProps) => {
  const [red, setRed] = useState(defaultValue.substring(1, 3));
  const [green, setGreen] = useState(defaultValue.substring(3, 5));
  const [blue, setBlue] = useState(defaultValue.substring(5, 7));
  const [alpha, setAlpha] = useState(defaultValue.substring(7, 9) || "ff");

  const [hex, setHex] = useState(defaultValue);

  useEffect(() => {
    const newColor = `#${red}${green}${blue}${alpha}`;
    setHex(newColor);
    onChange(newColor);
  }, [alpha, blue, green, red]);

  return (
    <div
      style={{
        background: hex,
      }}
      className="flex flex-col p-4 rounded-md shadow-md mix-blend-difference"
    >
      {title && <p className="mix-blend-difference">{title}</p>}
      <div className="flex gap-2">
        R
        <input
          className="w-full"
          defaultValue={parseInt(red, 16)}
          type="range"
          min="0"
          max="255"
          step="5"
          onChange={(e) => setRed(hexConverter(Number(e.target.value)))}
        />
        {red}
      </div>
      <div className="flex gap-2">
        G
        <input
          className="w-full"
          type="range"
          min="0"
          max="255"
          defaultValue={parseInt(green, 16)}
          step="5"
          onChange={(e) => setGreen(hexConverter(Number(e.target.value)))}
        />
        {green}
      </div>
      <div className="flex gap-2">
        B
        <input
          className="w-full"
          type="range"
          min="0"
          max="255"
          defaultValue={parseInt(blue, 16)}
          step="5"
          onChange={(e) => setBlue(hexConverter(Number(e.target.value)))}
        />
        {blue}
      </div>
      <div className="flex gap-2">
        A
        <input
          className="w-full"
          type="range"
          min="0"
          max="255"
          defaultValue={parseInt(alpha, 16)}
          step="5"
          onChange={(e) => setAlpha(hexConverter(Number(e.target.value)))}
        />
        {alpha}
      </div>
    </div>
  );
};
