"use client"

import axios from "axios"
import dynamic from "next/dynamic"
import toast from "react-hot-toast"
import { useMemo, useState } from "react"
import { FieldValues, useForm, SubmitHandler } from "react-hook-form"

import Heading from "@/components/heading"
import Counter from "@/components/counter"
import { useRouter } from "next/navigation"
import Modal from "@/components/globals/modal"
import ImageUpload from "@/components/image-upload"
import CountrySelect from "@/components/country-select"
import CategoryInput from "@/components/category-input"
import CustomInput from "@/components/globals/custom-input"

import { STEPS } from "@/constants/listing-steps"
import { categories } from "@/constants/categories"
import { useListingModal } from "@/hooks/use-listing-modal"

export default function ListingModal() {
  const router = useRouter()
  const listingModal = useListingModal()

  const [step, setStep] = useState(STEPS.CATEGORY)
  const [isLoading, setIsLoading] = useState(false)

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset
  } = useForm<FieldValues>({
    defaultValues: {
      category: "",
      location: null,
      guestCount: 1,
      roomCount: 1,
      bathroomCount: 1,
      imageSrc: "",
      price: 1,
      title: "",
      description: ""
    }
  })

  //-- keep track of the values
  const category = watch("category")
  const location = watch("location")
  const guestCount = watch("guestCount")
  const roomCount = watch("roomCount")
  const bathroomCount = watch("bathroomCount")
  const imageSrc = watch("imageSrc")

  //-- dynamically import map
  const Map = useMemo(
    () =>
      dynamic(() => import("@/components/map"), {
        ssr: false
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [location]
  )

  //-- work around function to setCustom value in react-hook-form
  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true
    })
  }

  const onBack = () => {
    setStep((value) => value - 1)
  }

  const onNext = () => {
    setStep((value) => value + 1)
  }

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    if (step !== STEPS.PRICE) {
      return onNext()
    }

    setIsLoading(true)
    axios
      .post("/api/listings", data)
      .then(() => {
        toast.success("Listing created")
        router.refresh()
        reset()
        setStep(STEPS.CATEGORY)
        listingModal.onClose()
      })
      .catch(() => {
        toast.error("Something went wrong, Try again!")
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  const actionLabel = useMemo(() => {
    if (step === STEPS.PRICE) return "Create"
    return "Next"
  }, [step])

  const secondaryActionLabel = useMemo(() => {
    if (step === STEPS.CATEGORY) return undefined
    return "Back"
  }, [step])

  let bodyContent = (
    <div className=" flex flex-col gap-8">
      <Heading
        title="Which of these best describes your place?"
        subTitle="Select a category"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto">
        {categories.map((item) => (
          <div key={item.label} className=" col-span-1">
            <CategoryInput
              onClick={(category) => setCustomValue("category", category)}
              selected={category === item.label}
              label={item.label}
              icon={item.icon}
            />
          </div>
        ))}
      </div>
    </div>
  )

  if (step === STEPS.LOCATION) {
    bodyContent = (
      <div className=" flex flex-col gap-8">
        <Heading
          title="Where is your place located"
          subTitle="Help guests find you"
        />
        <CountrySelect
          value={location}
          onChange={(value) => setCustomValue("location", value)}
        />
        <Map />
      </div>
    )
  }

  if (step === STEPS.INFO) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Share some basics about your place"
          subTitle="You'll add more details later, like bed types"
        />
        <Counter
          title="Guests"
          subtitle="How many guests do you allow?"
          value={guestCount}
          onChange={(value) => setCustomValue("guestCount", value)}
        />
        <Counter
          title="Rooms"
          subtitle="How many rooms do you allow?"
          value={roomCount}
          onChange={(value) => setCustomValue("roomCount", value)}
        />
        <Counter
          title="Bathrooms"
          subtitle="How many bathroom do you have?"
          value={bathroomCount}
          onChange={(value) => setCustomValue("bathroomCount", value)}
        />
      </div>
    )
  }

  if (step === STEPS.IMAGES) {
    bodyContent = (
      <div className=" flex flex-col gap-8">
        <Heading
          title="Add a photo of your place"
          subTitle="Show guests what your place looks like"
        />
        <ImageUpload
          value={imageSrc}
          onChange={(value) => {
            setCustomValue("imageSrc", value)
          }}
        />
      </div>
    )
  }

  if (step === STEPS.DESCRIPTION) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="How would you describe your place"
          subTitle="Short and sweet words work bests"
        />
        <CustomInput
          id="title"
          label="Title"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
        <hr />
        <CustomInput
          id="description"
          label="Description"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
      </div>
    )
  }

  if (step === STEPS.PRICE) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Now, set your price"
          subTitle="How much do you charge per night"
        />
        <CustomInput
          id="price"
          label="Price"
          formatPrice
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
      </div>
    )
  }

  return (
    <Modal
      title="Create a new listing"
      isOpen={listingModal.isOpen}
      actionLabel={actionLabel}
      secondaryActionLabel={secondaryActionLabel}
      secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
      onClose={listingModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      disabled={isLoading}
      body={bodyContent}
    />
  )
}
