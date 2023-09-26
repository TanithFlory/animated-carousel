"use client";
import { useState } from "react";
import CarouselControls from "./CarouselControls";
import SliderCard from "./SliderCard";
import { sliderData as rawData } from "./slider-data";
import BackgroundImage from "./BackgroundImage";
import { cardData } from "../types";

export default function Carousel() {
  const [sliderData, setSliderData] = useState(rawData.slice(1));
  const [backgroundImg, setBackgroundImg] = useState(rawData[0]);
  const [transitionImg, setTransitionImg] = useState<cardData | null>(null);
  return (
    <main className="relative min-h-screen select-none overflow-hidden text-white antialiased">
      <BackgroundImage image={backgroundImg.img} />
      <div className="absolute z-20  h-full w-full">
        <div className=" flex h-full w-full grid-cols-10 flex-col md:grid">
          <div className="z-20 col-span-4 mb-3 flex h-full flex-1 flex-col justify-end px-5 md:mb-0 md:justify-center md:px-10">
            <div></div>
          </div>
          <div className=" col-span-6 flex h-full flex-1 flex-col justify-start p-4 md:justify-center md:p-10">
            <div className="flex w-full gap-6 transition-all duration-1000 ease-in-out">
              {sliderData.map((item, index) => {
                return (
                  <SliderCard
                    location={item.location}
                    title={item.title}
                    index={index}
                    key={item.img}
                    img={item.img}
                  />
                );
              })}
            </div>
            <CarouselControls
              setSliderData={setSliderData}
              setBackgroundImg={setBackgroundImg}
              setTransitionImg={setTransitionImg}
              transitionImg={transitionImg}
              backgroundImg={backgroundImg}
              sliderData={sliderData}
            />
          </div>
        </div>
      </div>
    </main>
  );
}
