import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "Dhanush C K",
  description:
    "Builder. Designer. Engineer. 7th Semester Computer Science at JSS Academy. Specializing in high-performance digital experiences bridging human-centric UI/UX and AI/ML backends.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="bg-black">
      <body className="bg-black text-white antialiased">{children}</body>
    </html>
  );
}
