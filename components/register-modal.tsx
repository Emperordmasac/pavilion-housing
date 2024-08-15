"use client"

import axios from "axios"
import { useState } from "react"
import toast from "react-hot-toast"
import { FcGoogle } from "react-icons/fc"
import { AiFillGithub } from "react-icons/ai"
import { FieldValues, SubmitHandler, useForm } from "react-hook-form"

import Heading from "@/components/heading"
import Modal from "@/components/globals/modal"
import CustomInput from "@/components/globals/custom-input"
import { useRegisterModal } from "@/hooks/use-register-modal"
import CustomButton from "@/components/globals/custom-button"

export default function RegisterModal() {
  const registerModal = useRegisterModal()
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      email: "",
      password: ""
    }
  })

  const onSubmit: SubmitHandler<FieldValues> = async (values) => {
    setIsLoading(true)
    axios
      .post("/api/register", values)
      .then(() => registerModal.onClose())
      .catch((error) => {
        toast.error(`${error.message}`)
      })
      .finally(() => {
        setIsLoading(false)
        reset()
      })
  }

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading title="Welcome to Pavilion" />
      <CustomInput
        id="name"
        label="Name"
        type="text"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <CustomInput
        id="email"
        label="Email"
        type="email"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />{" "}
      <CustomInput
        id="password"
        label="Password"
        type="password"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
    </div>
  )

  const footerContent = (
    <div className="flex flex-col gap-4 mt-3">
      <hr />
      <CustomButton
        outline
        label="Continue with Google"
        icon={FcGoogle}
        onClick={() => {}}
      />
      <CustomButton
        outline
        label="Continue with Github"
        icon={AiFillGithub}
        onClick={() => {}}
      />
      <div className=" text-neutral-500 text-center mt-4 font-light">
        <div className=" justify-center flex flex-row items-center gap-2">
          <div>Already have an account?</div>
          <div
            onClick={registerModal.onClose}
            className=" text-neutral-800 cursor-pointer hover:underline"
          >
            Log in
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <Modal
      disabled={isLoading}
      isOpen={registerModal.isOpen}
      title="Log in or sign up"
      actionLabel="Continue"
      onClose={registerModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  )
}
