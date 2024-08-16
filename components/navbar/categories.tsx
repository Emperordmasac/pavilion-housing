"use client"

import { usePathname, useSearchParams } from "next/navigation"

import Container from "@/components/container"
import { categories } from "@/constants/categories"
import CategoryBox from "@/components/globals/category-box"

export default function Categories() {
  const params = useSearchParams()
  const selectedCategory = params?.get("category")

  const pathname = usePathname()
  const isMainPage = pathname === "/"
  if (!isMainPage) return null

  return (
    <Container>
      <div className=" pt-4 flex flex-row items-center justify-between overflow-x-auto">
        {categories.map((category) => (
          <CategoryBox
            key={category.label}
            label={category.label}
            description={category.description}
            selected={selectedCategory === category.label}
            icon={category.icon}
          />
        ))}
      </div>
    </Container>
  )
}
