import axios from 'axios'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import { useCallback, useMemo } from 'react'

import { safeUser } from '@/types'
import { useLoginModal } from '@/hooks/use-login-modal'

interface IUseFavorite {
  listingId: string
  currentUser?: safeUser | null
}

export default function useFavorite({ listingId, currentUser }: IUseFavorite) {
  const router = useRouter()
  const loginModal = useLoginModal()

  const hasFavorited = useMemo(() => {
    const list = currentUser?.favoriteIds || []

    return list.includes(listingId)
  }, [currentUser, listingId])

  const toggleFavorite = useCallback(
    async (e: React.MouseEvent<HTMLDivElement>) => {
      e.stopPropagation()

      // const user = await getCurrentUser()

      if (!currentUser) {
        return loginModal.onOpen()
      }

      try {
        let request

        if (hasFavorited) {
          request = () => axios.delete(`/api/favorites/${listingId}`)
        } else {
          request = () => axios.post(`/api/favorites/${listingId}`)
        }

        await request()
        router.refresh()
        toast.success('Added to favorites')
      } catch (error) {
        toast.error(`Something went wrong!`)
      }
    },
    [],
  )

  return {
    hasFavorited,
    toggleFavorite,
  }
}
