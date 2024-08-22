import getCurrentUser from '@/actions/get-current-user'
import { NextResponse } from 'next/server'
import prisma from '@/lib/prismadb'

interface Params {
  listingId: string
}

export async function DELETE(request: Request, { params }: { params: Params }) {
  const currentUser = await getCurrentUser()

  if (!currentUser) {
    return NextResponse.error()
  }

  const { listingId } = params

  if (!listingId || typeof listingId !== 'string') {
    throw new Error('Invalid ID')
  }

  const listing = await prisma.listing.deleteMany({
    where: {
      id: listingId,
      userId: currentUser.id,
    },
  })

  return NextResponse.json(listing)
}
