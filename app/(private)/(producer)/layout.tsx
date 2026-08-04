import Header from "./producer/dashboard/Header";

export default async function ProducerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header /> {children}
    </>
  );
}
