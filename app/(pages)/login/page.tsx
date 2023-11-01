"use client"

import Login from "@/components/form/auth/login"

export default function Page() {
  return (
    <section className="container mx-auto mt-10 w-11/12">
      <div className="flex h-full w-full items-center justify-center">
        <div className=" h-auto w-11/12 rounded-md bg-primary p-10 text-white md:w-96">
          <Login />
        </div>
      </div>
    </section>
  )
}
