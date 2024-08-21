import type { Metadata } from "next"
import { Nunito as FontSans } from "next/font/google"

import "./globals.css"

import { cn } from "@/lib/utils"
import NavBar from "@/components/navbar/navbar"
import ModalProvider from "@/providers/modal-providers"
import ToasterProvider from "@/providers/toaster-provider"
import getCurrentUser from "@/actions/get-current-user"

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans"
})

export const metadata: Metadata = {
  title: "Pavilion Housing",
  description: "an agent housing app"
}

export default async function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  const currentUser = await getCurrentUser()
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <NavBar currentUser={currentUser} />
        <ModalProvider />
        <ToasterProvider />
        <div className="pb-20 pt-28">{children}</div>
      </body>
    </html>
  )
}
