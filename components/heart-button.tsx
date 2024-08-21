import { AiFillHeart, AiOutlineHeart } from "react-icons/ai"

import { safeUser } from "@/types"

interface HeartButtonProps {
  listingId: string
  currentUser: safeUser | null | undefined
}

export default function HeartButton({
  listingId,
  currentUser
}: HeartButtonProps) {
  const hasfavourited = false
  const toggleFavourite = () => {}

  return (
    <div
      onClick={toggleFavourite}
      className=" relative hover:opacity-80 transition cursor-pointer"
    >
      <AiOutlineHeart
        size={28}
        className="fill-white absolute -top-[2px] -right-[2px]"
      />
      <AiFillHeart
        size={24}
        className={hasfavourited ? "fill-rose-500" : "fill-neutral-500/70"}
      />
    </div>
  )
}
