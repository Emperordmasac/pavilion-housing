import { create } from 'zustand'

interface ListingModalProps {
  isOpen: boolean
  onOpen: () => void
  onClose: () => void
}

export const useListingModal = create<ListingModalProps>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}))
