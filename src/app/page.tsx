"use client";
import Prism from "@/components/Prism";
import "./globals.css";

const HomePage = () => {
  return (
    <div
      className="absolute w-screen h-screen flex items-center justify-center"
      style={{
        perspective: "500px",
      }}
    >
      <Prism
        spin
        sides={new Array(30).fill("").map((_, id) => (
          <div
            className="bg-white w-full h-full flex items-center justify-center"
            key={id}
          >
            {id}
          </div>
        ))}
        height={200}
        width={600}
        border="2px solid #000"
      />
    </div>
  );
};

export default HomePage;
