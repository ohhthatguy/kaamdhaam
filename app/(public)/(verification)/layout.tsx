export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="h-screen  grid grid-rows-[0.5fr_4fr_1fr]">
      <header className=" text-2xl flex items-center">KaamDhaam</header>
      <section>{children}</section>
      <section className="bg-tertiary">Footer</section>
    </main>
  );
}
