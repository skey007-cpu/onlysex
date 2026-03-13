"use client";

import Image from 'next/image'
import Button from './Button'
import { useRouter } from "next/navigation";

const Hero = () => {
  const router = useRouter();

  return (
    <section className="max-container padding-container flex flex-col gap-20 py-20 pb-32 md:gap-28 lg:py-8 xl:flex-row">
      {/* <div className="hero-map hidden lg:block" /> */}

      <div className="absolute right-0 top-0 h-screen w-full overflow-hidden">

        {/* Video Background */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute top-0 left-0 w-full h-full object-cover"
        >
          <source src="/video-bg.mp4" type="video/mp4" />
        </video>

      </div>

      <div className="relative z-20 flex flex-1 flex-col xl:w-1/2">
        {/* <Image
          src="/camp.svg"
          alt="camp"
          width={50}
          height={50}
          className="absolute left-[-5px] top-[-30px] w-10 lg:w-[50px]"
        /> */}
        <h1 className="bold-52 lg:bold-88 text-white">Arrête de te branler sur des webcams de nudité</h1>
        <p className="regular-16 mt-6 text-gray-10 xl:max-w-[520px]">
          <strong>
            Tes envies te travaillent ? Ne les résiste plus. Une paire de fesses irrésistible t’attend… contacte-la dès maintenant. </strong> <br /> <br /> <strong> OnlySex
              vous offre un endroit sûr et anonyme pour vous détendre. <br />
            Rejoignez-nous en  quelques clics, Choisissez celle qui  vous fait bander, Éliminez votre stress en bonne compagnie</strong>
        </p>

        <div className="my-5 flex flex-wrap gap-5">
          {/* <div className="flex items-center gap-2">
            {Array(5).fill(1).map((_, index) => (
              <Image
                src="/star.svg"
                key={index}
                alt="star"
                width={24}
                height={24}
              />
            ))}
          </div> */}

          {/* <p className="bold-16 lg:bold-20 text-blue-70">
            198k
            <span className="regular-16 lg:regular-20 ml-1">Excellent Reviews</span>
          </p> */}
        </div>

        <div className="flex flex-col w-full gap-3 sm:flex-row">

          <Button
            type="button"
            title="Let's Go !!"
            variant="btn_dark_greens"
            onClick={() => router.push("/sign-in")}
          />
        </div>
      </div>

      <div className="relative flex flex-1 items-start">
        <div className="relative z-20 flex w-[268px] flex-col gap-8 rounded-3xl bg-green-90 px-7 py-8">

          {/* <div className="flex flex-col">
            <div className="flexBetween">
              <p className="regular-16 text-gray-20">Location</p>
              <Image src="/close.svg" alt="close" width={24} height={24} />
            </div>
            <p className="bold-20 text-gray-90">Paris France</p>
          </div> */}

          {/* <div className="flexBetween">
            <div className="flex flex-col">
              <p className="regular-16 block text-gray-20">Distance</p>
              <p className="bold-20 text-gray-90">173.28 mi</p>
            </div>
            <div className="flex flex-col">
              <p className="regular-16 block text-gray-20">Elevation</p>
              <p className="bold-20 text-gray-90">2.040 km</p>
            </div>
          </div> */}
        </div>
      </div>
    </section>
  )
}

export default Hero