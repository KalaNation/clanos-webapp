// Signed-out flows (D01–D08). Desktop adds a brand panel beside the form when it is built.
export default function AuthLayout({ children }: LayoutProps<'/'>) {
  return (
    <main className="mx-auto flex min-h-dvh w-full max-w-md flex-col justify-center gap-section px-gutter py-gutter">
      {children}
    </main>
  );
}
