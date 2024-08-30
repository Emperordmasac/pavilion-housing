import getListingById from "@/actions/getListingById"

import getCurrentUser from "@/actions/get-current-user"
import ClientOnly from "@/components/client-only"
import EmptyState from "@/components/empty-state"
import ListingClient from "@/components/listings/listing-client"

interface Props {
  params: {
    listingId: string
  }
}
const ListingPage: React.FC<Props> = async ({ params }) => {
  const [listing, currentUser] = await Promise.all([
    getListingById(params),
    getCurrentUser()
  ])

  if (!listing) {
    return (
      <ClientOnly>
        <EmptyState title="No listing found" subtitle="Try going back home" />
      </ClientOnly>
    )
  }

  return (
    <ClientOnly>
      <ListingClient listing={listing} currentUser={currentUser} />
    </ClientOnly>
  )
}
3
export default ListingPage
