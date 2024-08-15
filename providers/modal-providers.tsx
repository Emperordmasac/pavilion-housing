"use client"

import { useEffect, useState } from "react"

import LoginModal from "@/components/modals/login-modal"
import RegisterModal from "@/components/modals/register-modal"

const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return null
  }

  return (
    <>
      <RegisterModal />
      <LoginModal />
    </>
  )
}

export default ModalProvider
