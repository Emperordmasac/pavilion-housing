import getListingById from "@/actions/getListingById"
import ClientOnly from "@/components/client-only"
import EmptyState from "@/components/empty-state"

interface Props {
  params: {
    listingId: string
  }
}
const ListingPage: React.FC<Props> = async ({ params }) => {
  const listing = await getListingById(params)

  if (!listing) {
    return (
      <ClientOnly>
        <EmptyState title="No listing found" subtitle="Try going back home" />
      </ClientOnly>
    )
  }

  return (
    <ClientOnly>
      <div className="pt-[58px]">{listing.title}</div>
    </ClientOnly>
  )
}

export default ListingPage
