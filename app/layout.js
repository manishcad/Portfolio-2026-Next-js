import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "My Portfolio - Software Engineer",
  description: "Welcome to my portfolio. I am a passionate software engineer showcasing my projects and skills in web development.",
  keywords: ["portfolio", "software engineer", "developer", "next.js", "react", "javascript", "typescript", "web development"],
  authors: [{ name: "Manish Chand" }],
  creator: "Manish Chand",
  publisher: "Manish Chand",
  openGraph: {
    title: "My Portfolio - Software Engineer",
    description: "Explore the projects and skills of a dedicated software engineer.",
    url: "https://manishcad.vercel.app/", // IMPORTANT: Change this to your actual domain
    siteName: "My Portfolio",
    images: [
      {
        url: "/og-image.png", // Create and add this image to your /public folder
        width: 1200,
        height: 630,
        alt: "My Portfolio Website",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "My Portfolio - Software Engineer",
    description: "Explore the projects and skills of a dedicated software engineer.",
    // creator: "@your_twitter_handle", // IMPORTANT: Add your Twitter handle
    images: ["/twitter-image.png"], // Create and add this image to your /public folder
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};


export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
