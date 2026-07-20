"use client";
import dynamic from "next/dynamic";

const RenderedOnlyShowLocationMap = dynamic(
  () => import("./OnlyShowLocationMap"),
  {
    ssr: false,
    loading: () => (
      <div className="h-screen flex  justify-center items-center">
        Map is being LOADED
      </div>
    ),
  },
);

export default RenderedOnlyShowLocationMap;
