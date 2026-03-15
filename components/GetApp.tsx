"use client"

import React from 'react'
import Button from './Button'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

const GetApp = () => {
  const router = useRouter()

  return (
    <section className="flexCenter w-full flex-col pb-[100px]">
      <div className="get-app">
        <div className="z-20 flex w-full flex-1 flex-col items-start justify-center gap-12">
          <h2 className="bold-40 lg:bold-64 xl:max-w-[320px]">Prêt pour une scéance plan Q ??</h2>
          <p className="regular-16 text-gray-10">Créez un compte pour Continuer ...</p>
          <div className="flex w-full flex-col gap-3 whitespace-nowrap xl:flex-row">
            {/* <div className="flex flex-col w-full gap-3 sm:flex-row mt-4"> */}
            <Button
              type="button"
              title="S'inscrire !!"
              variant="btn_white"
              onClick={() => router.push("/sign-up")}
              full
            />
            {/* </div> */}
            <Button
              type="button"
              title="Se Connecter !!"
              variant="btn_dark_green_outline"
              onClick={() => router.push("/sign-in")}
              full
            />
          </div>
        </div>

        <div className="flex flex-1 items-center justify-end">
          <Image src="/5a57235d4f6274a451568eb85ad29870.jpg" alt="img" width={600} height={870} />
        </div>
      </div>
    </section>
  )
}

export default GetApp