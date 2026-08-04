import ConsumerHeader from "./homepage/ConsumerHeader";

export default async function ConsumerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <ConsumerHeader />
      {children}
    </>
  );
}
