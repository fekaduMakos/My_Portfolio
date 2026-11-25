import type { Metadata, Viewport } from "next";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#020817",
};

export const metadata: Metadata = {
  title: "Fekadu Markos | Software Engineer & Systems Architect",
  description:
    "International portfolio and engineering case studies of Fekadu Markos, a Full-Stack Software Engineer building scalable cloud applications, distributed systems, and resilient web platforms.",
  keywords: [
    "Fekadu Markos",
    "Software Engineer",
    "Full-Stack Developer",
    "Systems Architect",
    "Next.js",
    "TypeScript",
    "PostgreSQL",
    "Cloud Architecture",
    "Remote Developer",
  ],
  authors: [{ name: "Fekadu Markos" }],
  creator: "Fekadu Markos",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://example.com"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    title: "Fekadu Markos | Software Engineer & Systems Architect",
    description:
      "Explore engineering case studies, system architecture blueprints, and cloud applications.",
    siteName: "Fekadu Markos Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Fekadu Markos | Software Engineer & Systems Architect",
    description:
      "Explore engineering case studies, system architecture blueprints, and cloud applications.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className="min-h-screen bg-background text-foreground antialiased selection:bg-primary/20 selection:text-primary overflow-x-hidden font-sans">
        {children}
      </body>
    </html>
  );
}
