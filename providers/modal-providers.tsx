"use client"

import { useEffect, useState } from "react"

import RegisterModal from "@/components/register-modal"

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
    </>
  )
}

export default ModalProvider
