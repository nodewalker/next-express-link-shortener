import { LinkProvider } from "../_lib/providers/LinkProvider";
import { UserProvider } from "../_lib/providers/UserProvider";

export default function RoutesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <UserProvider>
      <LinkProvider>{children}</LinkProvider>
    </UserProvider>
  );
}
