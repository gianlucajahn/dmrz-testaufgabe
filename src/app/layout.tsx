import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import css from "./layout.module.scss";
import Sidebar from "./features/sidebar/SideBar";
import MaskWrapper from "./features/masks/MaskWrapper";
import { FormDataProvider } from "./context/FormDataContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DMRZ Testaufgabe",
  description: "Bearbeitet von Gianluca Jahn",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${css.layout}`}
      >
        <FormDataProvider>
          <Sidebar />
          <MaskWrapper />
        </FormDataProvider>
      </body>
    </html>
  );
}
