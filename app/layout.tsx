import "./globals.css";
import Navbar from "@/components/ui/navbar";
import type { ReactNode } from "react";
import { Providers } from "@/components/Providers";
import BackgroundAnimation from "@/components/ui/BackgroundAnimation";
import Chatbot from "@/components/ui/Chatbot";

export const metadata = {
  title: "Cads",
  description: "Personal portfolio website",
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-background text-foreground antialiased overflow-x-hidden">
        <Providers>
          <BackgroundAnimation />
          <Navbar />
          {children}
          <Chatbot />
        </Providers>
      </body>
    </html>
  );
}
