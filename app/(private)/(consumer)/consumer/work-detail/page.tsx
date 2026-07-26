import WorkPostDetail from "@/lib/component/WorkPostDetail";
import EmployerDetail from "./EmployerDetail";

const page = async ({
  searchParams,
}: {
  searchParams: Promise<{ workPostId: string }>;
}) => {
  const { workPostId } = await searchParams;
  return (
    <div className="mx-28 py-8 grid gap-4 grid-cols-[1.5fr_0.5fr]">
      <WorkPostDetail workPostId={workPostId} />
      <EmployerDetail workPostId={workPostId} />
    </div>
  );
};

export default page;
