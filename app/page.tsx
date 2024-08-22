import getListings from "@/actions/getListing"
import ClientOnly from "@/components/client-only"
import getCurrentUser from "@/actions/get-current-user"

import Container from "@/components/container"
import EmptyState from "@/components/empty-state"
import ListingCard from "@/components/listings/listing-card"

export default async function Home() {
  const [listings, currentUser] = await Promise.all([
    getListings(),
    getCurrentUser()
  ])

  if (listings?.length === 0) {
    return <EmptyState showReset />
  }

  return (
    <ClientOnly>
      <Container>
        <div className="pt-44 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
          {listings?.map((listing) => (
            <ListingCard
              key={listing.id}
              data={listing}
              currentUser={currentUser}
            />
          ))}
        </div>
      </Container>
    </ClientOnly>
  )
}
