import "./globals.css"

import { Inter } from "next/font/google"
import { Analytics } from "@vercel/analytics/react"
import { Toaster } from "react-hot-toast"

import AuthProvider from "../@core/context/AuthProvider"
import Provider from "../@core/lib/provider"
import { cn } from '../@core/lib/utils'
import { siteConfig } from '../@core/config/site'

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
  },
  authors: [
    {
      name: "Vincent Duguet",
      url: "https://github.com/eikyuu",
    },
  ],
  creator: "Vincent Duguet",
  publisher: "Vincent Duguet",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
  },
  icons : {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: `${siteConfig.url}/site.webmanifest`,
}


export default function RootLayout(props: {
  children: React.ReactNode
  modal: React.ReactNode
}) {

  return (
    <html lang="fr" suppressHydrationWarning>
      <head/>
      <body
        suppressHydrationWarning={true}
        className={cn(
          inter.className,
          "min-h-screen font-sans leading-relaxed antialiased"
        )}
      >
        <Provider>
          <AuthProvider>
            <main>
              {props.children} {props.modal}
            </main>
            <Analytics />
            <Toaster />
          </AuthProvider>
        </Provider>
      </body>
    </html>
  )
}
