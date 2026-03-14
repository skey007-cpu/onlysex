import Image from 'next/image'
import React from 'react'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { Francais } from '@/constants'

const Guide = () => {
  return (
    <section className="flexCenter flex-col">
      <div className="padding-container max-container w-full pb-20">
        <Image src="/camp.svg" alt="camp" width={50} height={50} />
        {/* <p className="uppercase regular-18 -mt-1 mb-3 text-green-50">
          Modèles qui parlent Français
        </p> */}
        <div className="flex flex-wrap justify-between gap-5 lg:gap-10">
          <h2 className="bold-40 lg:bold-64 xl:max-w-[390px]"> Modèles qui parlent Français</h2>
          <p className="regular-16 text-gray-30 xl:max-w-[520px]">
            Profitez d’un moment privilégié chez <strong>OnlySex </strong> avec nos magnifiques modèles francophones, Charmantes, séduisantes et toujours prêtent à vous faire jouir; et à Partagez un instant complice avec vous… dans votre langue. Laissez-vous tenter par une expérience plus proche, et encore plus excitante.
          </p>
        </div>
      </div>

      <div className="padding-container flexCenter max-container relative w-full ">
        <Carousel>
          <CarouselContent>
            {Francais.map((french) => (
              <CarouselItem key={french.id} className="basis-2/3 lg:basis-1/3">
                <Image
                  src={french.photo}
                  alt="boat"
                  width={1440}
                  height={580}
                  className="w-full rounded-3xl h-[340px] lg:h-[580px] object-cover object-center 2xl:rounded-5xl"
                />
              </CarouselItem>

            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </section>
  )
}

export default Guide