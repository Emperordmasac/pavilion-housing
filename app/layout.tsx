import type { Metadata } from "next"
import { Nunito as FontSans } from "next/font/google"

import "./globals.css"

import { cn } from "@/lib/utils"
import NavBar from "@/components/navbar/navbar"

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans"
})

export const metadata: Metadata = {
  title: "Pavilion Housing",
  description: "an agent housing app"
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <NavBar />
        {children}
      </body>
    </html>
  )
}
