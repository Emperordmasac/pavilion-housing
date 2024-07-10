"use client"

import { useCallback, useState } from "react"
import { AiOutlineMenu } from "react-icons/ai"

import Avatar from "@/components/avatar"
import { Separator } from "@/components/ui/separator"
import UserMenuItem from "@/components/navbar/user-menu-item"

export default function UserMenu() {
  const [isOpen, setIsOpen] = useState(false)

  const toggleOpen = useCallback(() => {
    setIsOpen((value) => !value)
  }, [])

  return (
    <div className=" relative">
      <div className=" flex flex-row items-center gap-3">
        <div
          onClick={() => {}}
          className=" hidden md:block text-sm font-semibold py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer"
        >
          Airbnb your home
        </div>
        <div
          onClick={toggleOpen}
          className=" p-4 md:py-2 md:px-[10px] border-[1px] border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition"
        >
          <AiOutlineMenu />
          <div className=" hidden md:block">
            <Avatar />
          </div>
        </div>
      </div>

      {isOpen && (
        <div className=" absolute rounded-xl shadow-md w-[40vw] md:w-3/4 bg-white overflow-hidden right-0 top-12 text-sm mt-4 cursor-pointer">
          <UserMenuItem onClick={() => {}} label="Sign up" />
          <UserMenuItem onClick={() => {}} label="Login" />
          <Separator className=" my-2" />
          <UserMenuItem onClick={() => {}} label="Gift cards" />
          <UserMenuItem onClick={() => {}} label="Airnbnb your home" />
          <UserMenuItem onClick={() => {}} label="Help center" />
        </div>
      )}
    </div>
  )
}
