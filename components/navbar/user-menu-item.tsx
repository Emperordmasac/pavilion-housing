"use client"

interface UserMenuItemProps {
  onClick: () => void
  label: string
}

export default function UserMenuItem({ onClick, label }: UserMenuItemProps) {
  return (
    <div
      onClick={onClick}
      className=" px-6 py-2 hover:bg-neutral-100 transition font-semibold"
    >
      {label}
    </div>
  )
}
