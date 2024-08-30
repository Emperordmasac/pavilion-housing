"use client"

import { useMemo } from "react"
import { Reservation } from "@prisma/client"

import { safeListing, safeUser } from "@/types"
import { categories } from "@/constants/categories"

import Container from "@/components/container"
import ListingHead from "@/components/listings/listing-head"
import ListingInfo from "@/components/listings/listing-info"

interface ListingClientProps {
  reservations?: Reservation[]
  listing: safeListing & {
    user: safeUser
  }
  currentUser?: safeUser | null
}

export default function ListingClient({
  listing,
  currentUser
}: ListingClientProps) {
  const category = useMemo(() => {
    return categories.find((item) => item.label === listing.category)
  }, [listing.category])

  return (
    <Container>
      <div className="max-w-screen-lg mx-auto mt-[65px]">
        <div className="flex flex-col gap-6">
          <ListingHead
            title={listing.title}
            imageSrc={listing.imageSrc}
            locationValue={listing.locationValue}
            id={listing.id}
            currentUser={currentUser}
          />
          <ListingInfo
            user={listing.user}
            category={category}
            description={listing.description}
            roomCount={listing.roomCount}
            guestCount={listing.guestCount}
            bathroomCount={listing.bathroomCount}
            locationValue={listing.locationValue}
          />
        </div>
      </div>
    </Container>
  )
}
