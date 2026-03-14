import Image from 'next/image'
import React from 'react'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { Newmodel } from '@/constants'

const Features = () => {
  return (
    <section className="flex-col flexCenter overflow-hidden bg-feature-bg bg-center bg-no-repeat py-24">
      <div className="max-container padding-container relative w-full flex justify-end">
        {/* <div className="flex flex-1 lg:min-h-[900px]">
          <Image
            src="/phone.png"
            alt="phone"
            width={440}
            height={1000}
            className="feature-phone"
          />
        </div> */}

        <div className="z-20 w-full flex-col lg:w-[60%] hidden lg:flex">
          <div className='relative'>
            <Image
              src="/camp.svg"
              alt="camp"
              width={50}
              height={50}
              className="absolute left-[-5px] top-[-28px] w-10 lg:w-[50px]"
            />
            <h2 className="bold-40 lg:bold-64">Nouveaux modèles</h2>
          </div>
        </div>

        <div className="flexCenter max-container relative w-full ">
          <Carousel>
            <CarouselContent>
              {Newmodel.map((french) => (
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
      </div>
    </section>
  )
}

type FeatureItem = {
  title: string;
  icon: string;
  description: string;
}

const FeatureItem = ({ title, icon, description }: FeatureItem) => {
  return (
    <li className="flex w-full flex-1 flex-col items-start">
      <div className="rounded-full p-4 lg:p-7 bg-green-50">
        <Image src={icon} alt="map" width={28} height={28} />
      </div>
      <h2 className="bold-20 lg:bold-32 mt-5 capitalize">
        {title}
      </h2>
      <p className="regular-16 mt-5 bg-white/80 text-gray-30 lg:mt-[30px] lg:bg-none">
        {description}
      </p>

      <div className='absolute bg-white'>
        <Image
          src="/meter.svg"
          alt="meter"
          width={16}
          height={158}
          className="h-full w-auto"
        />
      </div>
      {/* </div> */}
    </li>
  )
}

export default Features