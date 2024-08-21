"use client"

import Image from "next/image"
import { format } from "date-fns"
import { useCallback, useMemo } from "react"
import { useRouter } from "next/navigation"
import { Listing, Reservation } from "@prisma/client"

import { safeUser } from "@/types"
import useCountries from "@/hooks/use-countries"

import HeartButton from "@/components/heart-button"
import CustomButton from "@/components/globals/custom-button"

interface ListingCardProps {
  data: Listing
  reservation?: Reservation
  onAction?: (id: string) => void
  disabled?: boolean
  actionLabel?: string
  actionId?: string
  currentUser?: safeUser | null
}

export default function ListingCard({
  data,
  reservation,
  onAction,
  disabled,
  actionLabel,
  actionId = "",
  currentUser
}: ListingCardProps) {
  const router = useRouter()
  const { getByValue } = useCountries()

  const location = getByValue(data.locationValue)

  const handleCancel = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation()

      if (disabled) return

      onAction?.(actionId)
    },
    [onAction, disabled, actionId]
  )

  const price = useMemo(() => {
    if (reservation) return reservation.totalPrice

    return data.price
  }, [reservation, data.price])

  const reservationDate = useMemo(() => {
    if (!reservation) return null

    const startDate = new Date(reservation.startDate)
    const endDate = new Date(reservation.endDate)

    return `${format(startDate, "pp")} - ${format(endDate, "pp")}`
  }, [reservation])

  return (
    <div
      onClick={() => router.push(`/listings/${data.id}`)}
      className=" col-span-1 cursor-pointer group"
    >
      <div className="flex flex-col gap-2 w-full">
        <div className=" aspect-square w-full relative overflow-hidden rounded-xl">
          <Image
            fill
            alt="listing"
            src={data.imageSrc}
            className=" object-cover h-full w-full group-hover:scale-110 transition"
          />
          <div className=" absolute top-3 right-3">
            <HeartButton listingId={data.id} currentUser={currentUser} />
          </div>
        </div>

        <div className=" font-semibold text-lg mt-[2px]">
          {location?.region}, {location?.label}
        </div>
        <div className=" font-light text-neutral-500 text-lg">
          {data.description}
        </div>
        <div className=" font-light text-neutral-500 text-lg">
          {reservationDate || data.category}
        </div>
        <div className="flex flex-row items-center gap-1">
          <div className=" font-semibold">${price}</div>
          {!reservation && <div className="font-light">night</div>}
        </div>
        {onAction && actionLabel && (
          <CustomButton
            disabled={disabled}
            small
            label={actionLabel}
            onClick={handleCancel}
          />
        )}
      </div>
    </div>
  )
}
