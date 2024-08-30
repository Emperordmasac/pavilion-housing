"use client"

import Heading from "@/components/heading"
import useCountries from "@/hooks/use-countries"
import { safeUser } from "@/types"
import Image from "next/image"
import HeartButton from "../heart-button"

interface ListingHeadProps {
  title: string
  imageSrc: string
  locationValue: string
  id: string
  currentUser?: safeUser | null
}

export default function ListingHead({
  title,
  imageSrc,
  locationValue,
  id,
  currentUser
}: ListingHeadProps) {
  const { getByValue } = useCountries()
  const location = getByValue(locationValue)

  return (
    <>
      <Heading
        title={title}
        subTitle={`${location?.region}, ${location?.label}`}
      />
      <div className="w-full h-[60vh] overflow-hidden rounded-xl relative bg-[#DDCDE7]">
        <Image
          alt="image"
          src={imageSrc}
          fill
          className=" object-cover w-full"
        />
        <div className=" absolute top-5 right-5">
          <HeartButton listingId={id} currentUser={currentUser} />
        </div>
      </div>
    </>
  )
}
