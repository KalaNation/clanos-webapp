// Signed-in screens; the proxy sends signed-out visitors to sign-in. The app shell (sidebar,
// app bar, tab bar, drawer) is not built yet; it will wrap {children} here.
export default function SignedInLayout({ children }: LayoutProps<'/'>) {
  return <main className="mx-auto w-full max-w-frame px-gutter py-gutter">{children}</main>;
}
