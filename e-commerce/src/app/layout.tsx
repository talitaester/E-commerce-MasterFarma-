import type { Metadata, ResolvingMetadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import { createClient } from "@/prismicio";

const montserrat = Montserrat({ subsets: ["latin"] });
 
type Props = {
  params: { id: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

 
export async function generateMetadata(): Promise<Metadata> {
  const client = createClient();

  const page = await client.getSingle("settings")

  return {
    title: page.data.site_title || "MasterFarma Fallback",
    description: page.data.meta_description || "MasterFarma é a melhor farmácia.",
    openGraph: {
      images: [page.data.og_image.url || "/logo-grande.svg"],
    },
  }
}

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
