"use client";
import { useAppSelector } from "@/lib/hooks/redux-hooks";

const Page = () => {
  const dataFromRedux = useAppSelector((state) => state.afterLoginSlice);
  console.log(dataFromRedux);
  return <div>producer dashboard</div>;
};

export default Page;
