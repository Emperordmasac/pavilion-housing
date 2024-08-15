"use client"

import axios from "axios"
import { useState } from "react"
import toast from "react-hot-toast"
import { FcGoogle } from "react-icons/fc"
import { useRouter } from "next/navigation"
import { AiFillGithub } from "react-icons/ai"
import { FieldValues, SubmitHandler, useForm } from "react-hook-form"

import { signIn } from "next-auth/react"

import Heading from "@/components/heading"
import Modal from "@/components/globals/modal"
import { useLoginModal } from "@/hooks/use-login-modal"
import CustomInput from "@/components/globals/custom-input"
import { useRegisterModal } from "@/hooks/use-register-modal"
import CustomButton from "@/components/globals/custom-button"

export default function LoginModal() {
  const loginModal = useLoginModal()
  const registerModal = useRegisterModal()
  const router = useRouter()

  const [isLoading, setIsLoading] = useState<boolean>(false)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<FieldValues>({
    defaultValues: {
      email: "",
      password: ""
    }
  })

  const onSubmit: SubmitHandler<FieldValues> = async (values) => {
    setIsLoading(true)

    signIn("credentials", {
      ...values,
      redirect: false
    }).then((callback) => {
      setIsLoading(false)

      if (callback?.ok) {
        toast.success("Logged In")
        router.refresh()
        loginModal.onClose()
      }

      if (callback?.error) {
        toast.error(callback.error)
      }
    })
  }

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading title="Welcome to Pavilion" />
      {/* <CustomInput
        id="name"
        label="Name"
        type="text"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      /> */}
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
            onClick={loginModal.onClose}
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
      isOpen={loginModal.isOpen}
      title="Login"
      actionLabel="Continue"
      onClose={loginModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  )
}
