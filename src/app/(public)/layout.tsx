// Open to anyone with the link, signed in or not: invitations (D12–D17).
export default function PublicLayout({ children }: LayoutProps<'/'>) {
  return (
    <main className="mx-auto flex min-h-dvh w-full max-w-md flex-col justify-center gap-section px-gutter py-gutter">
      {children}
    </main>
  );
}
