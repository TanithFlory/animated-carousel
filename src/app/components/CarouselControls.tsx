"use client";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { cardData } from "../types";
import { useState, useEffect } from "react";
import gsap, { Power1 } from "gsap";
import Flip from "gsap/dist/Flip";
import SliderButton from "./SliderButton";

interface IProps {
  setSliderData: React.Dispatch<React.SetStateAction<cardData[]>>;
  setBackgroundImg: React.Dispatch<React.SetStateAction<cardData>>;
  setTransitionImg: React.Dispatch<React.SetStateAction<cardData | null>>;
  backgroundImg: cardData;
  transitionImg: cardData | null;
  sliderData: cardData[];
}

export default function CarouselControls({
  setSliderData,
  sliderData,
  setBackgroundImg,
  backgroundImg,
  transitionImg,
  setTransitionImg,
}: IProps) {
  const [buttonStatus, setButtonStatus] = useState({
    inUse: false,
    direction: "",
  });
  function resetButton() {
    setTimeout(() => {
      setButtonStatus({
        inUse: false,
        direction: "",
      });
    }, 600);
  }
  function handlePrev() {
    if (buttonStatus.inUse) return;
    setTransitionImg(backgroundImg);
    setButtonStatus({
      inUse: true,
      direction: "prev",
    });
    resetButton();
  }

  function handleNext() {
    if (buttonStatus.inUse) return;
    setTransitionImg(sliderData[0]);
    setButtonStatus({
      inUse: true,
      direction: "next",
    });
    resetButton();
  }

  useEffect(() => {
    gsap.registerPlugin(Flip);
    const transitions = {
      duration: 0.6,
      ease: Power1.easeIn,
      scale: true,
      objectFit: "fill",
    };
    if (!transitionImg) return;

    if (buttonStatus.direction === "next") {
      Flip.fit(".transition-img", ".background-img", {
        ...transitions,
        onComplete: () => {
          setBackgroundImg(sliderData[0]);
          setSliderData((prev) => [...prev.slice(1), backgroundImg]);
        },
      });
    }

    if (buttonStatus.direction === "prev") {
      Flip.fit(".background-img", ".transition-img", {
        ...transitions,
        onComplete: () => {
          Flip.fit(".background-img", ".placeholder-img", {
            ...transitions,
            duration: 0,
          });
          setSliderData((prev) => [
            backgroundImg,
            ...prev.slice(0, prev.length - 1),
          ]);
          setBackgroundImg(sliderData[sliderData.length - 1]);
        },
      });
    }
  }, [transitionImg, buttonStatus]);

  return (
    <div className="z-30 flex items-center gap-3 px-0 py-3 md:px-1 md:py-5">
      <SliderButton handleClick={handlePrev}>
        <IoIosArrowBack className=" text-xl" />
      </SliderButton>
      <SliderButton handleClick={handleNext}>
        <IoIosArrowForward className=" text-xl" />
      </SliderButton>
    </div>
  );
}
