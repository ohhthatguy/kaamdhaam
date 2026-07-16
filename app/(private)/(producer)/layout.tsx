export default async function ProducerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  //   const user = await getCurrentUser();

  //   if (!user) {
  //     redirect("/login");
  //   }

  //   if (user.role !== "PRODUCER") {
  //     redirect("/consumer/dashboard");
  //   }

  return <>{children}</>;
}
