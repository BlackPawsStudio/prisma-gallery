import { CSSProperties, ReactNode } from "react";

interface SideProps {
  customStyle?: CSSProperties;
  children?: ReactNode | ReactNode[];
}

const Side = ({ customStyle, children }: SideProps) => {
  return (
    <div
      className={"absolute h-full flex items-center justify-center text-2xl"}
      style={customStyle}
    >
      {children}
    </div>
  );
};

export default Side;
