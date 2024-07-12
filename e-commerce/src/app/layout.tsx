import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";

const montserrat = Montserrat({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MasterFarma",
  description: "A melhor farmácia do Brasil",
  icons: {
    icon: '/favicon.ico',
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body className={montserrat.className}>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
