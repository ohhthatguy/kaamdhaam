const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;

  return <div>{`profile page of ID: ${id}`}</div>;
};

export default page;
