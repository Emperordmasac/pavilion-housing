"use client"

import useCountries from "@/hooks/use-countries"
import { categoriesInterface, safeUser } from "@/types"

import Avatar from "@/components/avatar"
import ListingCategory from "./listing-category"
import dynamic from "next/dynamic"

interface ListingInfoProps {
  user: safeUser | null
  category: categoriesInterface | undefined
  description: string
  roomCount: number
  guestCount: number
  bathroomCount: number
  locationValue: string
}

const Map = dynamic(() => import("../map"), {
  ssr: false
})

export default function ListingInfo({
  user,
  category,
  description,
  roomCount,
  guestCount,
  bathroomCount,
  locationValue
}: ListingInfoProps) {
  const { getByValue } = useCountries()

  const coordinates = getByValue(locationValue)?.latlng

  return (
    <div className="flex flex-col col-span-4 gap-8">
      <div className="flex flex-col gap-2">
        <div className="text-xl font-semibold flex flex-row items-center gap-2">
          <div>Hosted by {user?.name}</div>
          <Avatar src={user?.image} />
        </div>

        <div className="flex flex-row items-center gap-4 font-light text-neutral-500">
          <div>{guestCount} guests</div>
          <div>{roomCount} rooms</div>
          <div>{bathroomCount} bathrooms</div>
        </div>
      </div>
      <hr />
      {category && (
        <ListingCategory
          icon={category.icon}
          label={category.label}
          description={category.description}
        />
      )}
      <hr />
      <div className="text-lg font-light text-neutral-500">{description}</div>
      <hr />
      <Map center={coordinates} />
    </div>
  )
}
