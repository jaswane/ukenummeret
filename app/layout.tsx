import type { Metadata, Viewport } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  metadataBase: new URL("https://ukenummeret.no"),
  title: {
    default: "Hvilken uke er det nå? Ukenummer i dag | Ukenummeret.no",
    template: "%s | Ukenummeret.no",
  },
  description:
    "Se hvilken uke det er nå, datoene for uken, neste helligdag og kalender med ukenummer for 2026 og kommende år.",
  applicationName: "Ukenummeret.no",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "nb_NO",
    siteName: "Ukenummeret.no",
    url: "https://ukenummeret.no",
    title: "Hvilken uke er det nå? Ukenummer i dag",
    description:
      "Se hvilken uke det er nå, datoene for uken, neste helligdag og kalender med ukenummer.",
  },
  twitter: {
    card: "summary",
    title: "Hvilken uke er det nå?",
    description:
      "Ukenummer i dag med datoer, helligdager og kalender for kommende år.",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#f6f2ec",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="nb" suppressHydrationWarning>
      <body className="min-h-screen bg-paper text-ink antialiased">
        <div className="flex min-h-screen flex-col">
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
