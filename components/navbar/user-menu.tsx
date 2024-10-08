"use client"

import { useCallback, useState } from "react"
import { AiOutlineMenu } from "react-icons/ai"

import { signOut } from "next-auth/react"

import Avatar from "@/components/avatar"
import { Separator } from "@/components/ui/separator"
import { useLoginModal } from "@/hooks/use-login-modal"
import { useListingModal } from "@/hooks/use-listing-modal"
import UserMenuItem from "@/components/navbar/user-menu-item"
import { useRegisterModal } from "@/hooks/use-register-modal"

import { safeUser } from "@/types"

interface UserMenuProps {
  currentUser?: safeUser | null
}

export default function UserMenu({ currentUser }: UserMenuProps) {
  const loginModal = useLoginModal()
  const registerModal = useRegisterModal()
  const listingModal = useListingModal()

  const [isOpen, setIsOpen] = useState(false)

  const toggleOpen = useCallback(() => {
    setIsOpen((value) => !value)
  }, [])

  const onListing = useCallback(() => {
    if (!currentUser) return loginModal.onOpen()

    listingModal.onOpen()
  }, [currentUser, loginModal, listingModal])

  return (
    <div className=" relative">
      <div className=" flex flex-row items-center gap-3">
        <div
          onClick={onListing}
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
            <Avatar src={currentUser?.image} />
          </div>
        </div>
      </div>

      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className=" absolute rounded-xl shadow-md w-[40vw] md:w-3/4 bg-white overflow-hidden right-0 top-12 text-sm mt-4 cursor-pointer"
        >
          {currentUser ? (
            <>
              <UserMenuItem onClick={() => {}} label="Messages" />
              <UserMenuItem onClick={() => {}} label="Notifications" />
              <UserMenuItem onClick={() => {}} label="Trips" />
              <UserMenuItem onClick={() => {}} label="Wishlists" />
              <Separator className=" my-2" />
              <UserMenuItem onClick={onListing} label="Airbnb your home" />
              <UserMenuItem onClick={() => {}} label="Account" />
              <Separator className=" my-2" />
              <UserMenuItem onClick={() => {}} label="Gift cards" />
              <UserMenuItem onClick={() => {}} label="Help Center" />
              <UserMenuItem
                onClick={() => {
                  signOut()
                }}
                label="Log out"
              />
            </>
          ) : (
            <>
              <UserMenuItem onClick={registerModal.onOpen} label="Sign up" />
              <UserMenuItem onClick={loginModal.onOpen} label="Login" />
              <Separator className=" my-2" />
              <UserMenuItem onClick={() => {}} label="Gift cards" />
              <UserMenuItem onClick={() => {}} label="Airbnb your home" />
              <UserMenuItem onClick={() => {}} label="Help center" />
            </>
          )}
        </div>
      )}
    </div>
  )
}
