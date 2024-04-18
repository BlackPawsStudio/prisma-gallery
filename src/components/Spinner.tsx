import Prism from "./Prism";

interface SpinnerProps {
  className?: string;
  width?: number;
  height?: number;
}

export const Spinner = ({
  className,
  width = 300,
  height = 100,
}: SpinnerProps) => (
  <div style={{ perspective: "500px" }} className={`${className} cursor-wait`}>
    <Prism
      spinR
      sideColor="white"
      sides={new Array(6).fill("Loading...")}
      height={height}
      width={width}
      border="2px solid #000"
    />
  </div>
);
