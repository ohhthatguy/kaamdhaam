"use client";
import dynamic from "next/dynamic";

const RenderedMap = dynamic(() => import("./map"), {
  ssr: false,
  loading: () => (
    <div className="h-screen flex  justify-center items-center">
      Map is being LOADED
    </div>
  ),
});

export default RenderedMap;
