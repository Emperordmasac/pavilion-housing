"use client"

import Image from "next/image"

interface AvatarProps {
  src: string | null | undefined
}

export default function Avatar({ src }: AvatarProps) {
  return (
    <Image
      alt="avatar"
      height="30"
      width="30"
      src={src || "/images/avatar.png"}
      className=" rounded-full"
    />
  )
}
