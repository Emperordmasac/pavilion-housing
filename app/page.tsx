import getListings from "@/actions/getListing"
import ClientOnly from "@/components/client-only"

import Container from "@/components/container"
import EmptyState from "@/components/empty-state"
import ListingCard from "@/components/listings/llisting-card"

export default async function Home() {
  const listings = await getListings()

  if (listings?.length === 0) {
    return <EmptyState showReset />
  }

  return (
    <ClientOnly>
      <Container>
        <div className="pt-44 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
          {listings?.map((listing: any) => (
            <ListingCard key={listing.id} data={listing} />
          ))}
        </div>
      </Container>
    </ClientOnly>
  )
}
