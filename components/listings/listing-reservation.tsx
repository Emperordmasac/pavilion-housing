"use client"

import { Range } from "react-date-range"

import Calendar from "@/components/calendar"
import CustomButton from "../globals/custom-button"

interface ListingReservationProps {
  price: number
  totalPrice: number
  onChangeDate: (value: Range) => void
  dateRange: Range
  onSubmit: () => void
  disabled?: boolean
  disabledDates: Date[]
}

export default function ListingReservation({
  price,
  totalPrice,
  onChangeDate,
  dateRange,
  onSubmit,
  disabledDates,
  disabled
}: ListingReservationProps) {
  return (
    <div className="bg-white rounded-xl  border-[1px] border-neutral-200 overflow-hidden">
      <div className="flex flex-row items-center gap-1 p-4">
        <div className=" text-2xl font-semibold">$ {price}</div>
        <div className=" font-light text-neutral-600">night</div>
      </div>
      <hr />
      <Calendar
        value={dateRange}
        disabledDates={disabledDates}
        onChange={(value) => onChangeDate(value.selection)}
      />
      <hr />
      <div className="p-4">
        <CustomButton disabled={disabled} label="Reserve" onClick={onSubmit} />
      </div>
      <div className=" flex items-center justify-between font-semibold text-lg p-4">
        <div>Total</div>
        <div>$ {totalPrice}</div>
      </div>
    </div>
  )
}
