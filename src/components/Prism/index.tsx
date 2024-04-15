import { Fragment, ReactNode, useMemo } from "react";
import Side from "./Side";

interface PrismProps {
  width: number;
  height: number;
  sides: ReactNode[];
  topColor?: string;
  sideColor?: string;
  bottomColor?: string;
  border?: string;
  showTile?: number;
  spin?: boolean;
  smooth?: string;
  outer?: boolean;
}

const Prism = ({
  outer,
  width,
  height,
  sides,
  topColor,
  sideColor,
  bottomColor,
  border,
  showTile,
  smooth,
  spin,
}: PrismProps) => {
  const size = Math.round(
    outer
      ? width
      : (width * Math.sin((360 / (sides.length * 2) / 180) * Math.PI)) /
          Math.sin((90 / 180) * Math.PI)
  );

  const space = useMemo(() => {
    if (outer) {
      return Math.round(size / (2 * Math.tan(Math.PI / sides.length)));
    }
    return Math.round(
      ((width / 2) *
        Math.sin(((90 - 360 / (sides.length * 2)) / 180) * Math.PI)) /
        Math.sin((90 / 180) * Math.PI)
    );
  }, [outer, sides.length, size, width]);
  return (
    <div
      className={"relative transition-all"}
      style={{
        width: `${width}px`,
        height: `${height}px`,
        transform: `${
          outer
            ? `translateZ(${(space * (sides.length - 1)) / sides.length}px)`
            : ""
        } rotateY(${
          (360 / sides.length) * -Number(showTile) + (outer ? 180 : 0)
        }deg)`,
        transformStyle: "preserve-3d",
        ...(spin && { animation: `rotate 10s infinite linear` }),
      }}
    >
      {sides.map((el, id) => (
        <Fragment key={id}>
          <Side
            customStyle={{
              width: `${size}px`,
              height: 0,
              transition: "all .5s",
              transformOrigin: "top",
              borderBottom: `${space}px solid ${topColor || "transparent"}`,
              borderRight: `${size / 2}px solid transparent`,
              borderLeft: `${size / 2}px solid transparent`,
              borderTop: "0",
              transform: `translateX(${(width - size) / 2}px) rotateY(${
                (360 / sides.length) * id
              }deg)
              translateZ(${space}px) rotateX(90deg) translateY(-${space}px)`,
            }}
          />
          <Side
            customStyle={{
              width: `${size}px`,
              background: sideColor || "transparent",
              transition: "all .5s",
              border: border ? border : "none",
              transform: `translateX(${(width - size) / 2}px) rotateY(${
                (360 / sides.length) * id
              }deg)
              translateZ(${space}px) ${outer ? "rotateY(180deg)" : ""}`,
              overflow: "hidden",
            }}
          >
            {el}
          </Side>
          <Side
            customStyle={{
              width: `${size}px`,
              height: "0",
              bottom: 0,
              transition: "all .5s",
              transformOrigin: "bottom",
              borderTop: `${space}px solid ${bottomColor || "transparent"}`,
              borderRight: `${size / 2}px solid transparent`,
              borderLeft: `${size / 2}px solid transparent`,
              borderBottom: "0",
              transform: `translateX(${(width - size) / 2}px) rotateY(${
                (360 / sides.length) * id
              }deg)
              translateZ(${space}px) rotateX(-90deg) translateY(${space}px)`,
            }}
          />
        </Fragment>
      ))}
    </div>
  );
};

export default Prism;
