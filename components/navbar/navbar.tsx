"use client"

import Logo from "@/components/navbar/logo"
import Container from "@/components/container"
import Search from "@/components/navbar/search"
import UserMenu from "@/components/navbar/user-menu"
import Categories from "@/components/navbar/categories"

import { safeUser } from "@/types"

interface NavBarProps {
  currentUser?: safeUser | null
}

export default function NavBar({ currentUser }: NavBarProps) {
  return (
    <div className=" fixed w-full bg-white z-10 shadow-sm">
      <div className=" py-4 border-b-[1px]">
        <Container>
          <div className=" w-full flex flex-col justify-center items-center gap-y-4">
            <div className=" flex w-full flex-row items-center justify-between gap-3 md:gap-0">
              <Logo />
              {/* <Mode /> */}
              {/* <Search /> */}
              <UserMenu currentUser={currentUser} />
            </div>
            <div className=" w-full flex items-center justify-center">
              <Search />
            </div>
          </div>
        </Container>
      </div>
      <Categories />
    </div>
  )
}
