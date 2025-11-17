import "./globals.css";
import { Poppins } from "next/font/google";
import { Metadata } from "next";
import { Toaster } from 'react-hot-toast';

export const metadata: Metadata = {
  title: "AgiliChat",
  description: "AgiliChat - Plataforma de atendimento e feedback para clientes",
};

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
}) 


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={poppins.className}>
      {children}
      <Toaster position="top-center" reverseOrder={false}/>


      </body>
    </html>
  );
}
