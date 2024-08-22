import getListingById from "@/actions/getListingById"

interface IParams {
  listingId: string
}

export default async function ListingPage({ params }: { params: IParams }) {
  const { listingId } = params
  console.log("🚀 ~ ListingPage :", listingId)

  const listing = await getListingById(listingId)
  console.log("🚀 ~ ListingPage ~ listing:", listing)

  return <div className="pt-24">Individual page {listing?.title}</div>
}
