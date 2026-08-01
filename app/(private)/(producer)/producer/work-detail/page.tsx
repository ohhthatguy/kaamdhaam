import WorkPostDetail from "@/lib/component/WorkPostDetail";
import IntrestedWorker from "./IntrestedWorker";

const page = async ({
  searchParams,
}: {
  searchParams: Promise<{ workPostId: string }>;
}) => {
  const { workPostId } = await searchParams;
  return (
    <div className="mx-28 py-8 grid gap-4 grid-cols-[1.35fr_0.65fr] bg-surface">
      <WorkPostDetail workPostId={workPostId} />
      <IntrestedWorker workPostId={workPostId} />
    </div>
  );
};

export default page;
