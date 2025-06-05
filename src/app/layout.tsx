import type { Metadata } from "next";
import "./globals.css";
import ClientLayoutWrapper from "@/components/ClientLayoutWrapper";

export const metadata: Metadata = {
  title: "Ascendion Technical Assessment",
  description: "Powered using NextJS, TailwindCSS, Typescript, ShadCN",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <ClientLayoutWrapper>{children}</ClientLayoutWrapper>
    </html>
  );
}
