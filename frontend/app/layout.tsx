import type { Metadata } from "next";
import { Poppins} from "next/font/google";
import "./globals.css";
import NavWrapper from "./(_components)/Navbar/NavWrapper";
import { Toaster } from "@/components/ui/sonner";

const font = Poppins({
  weight: ['100','200','300','400','500','600','700', '800', '900'],
  subsets:['latin']
})

export const metadata: Metadata = {
  title: "Company Reviews System",
  description: "Companies Review System made by B. Company. Where you can add reviews about the companies",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${font.className} antialiased`}
      >
        <NavWrapper/>
        {children}
        <Toaster position="top-center"/>
      </body>
    </html>
  );
}
