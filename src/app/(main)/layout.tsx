export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <header></header>
      <aside></aside>
      <main>{children}</main>
    </>
  );
}