import RootHeader from "@/pages/RootHeader.tsx";
import {Outlet} from "react-router-dom";

export default function RootLayout() {
  return (
    <div className="w-full h-dvh flex flex-col items-center">
      <div className="w-[1280px]">
        <RootHeader/>
      </div>
      <div className="w-full h-full">
        <Outlet/>
      </div>

    </div>
  );
}