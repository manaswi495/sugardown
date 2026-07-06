import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sugar Down",
  description: "Sugar Down website migrated to Next.js",
  icons: {
    icon: "/favicon.png",
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
