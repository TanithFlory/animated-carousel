import gsap, { Power1 } from "gsap";
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
interface IProps {
  location: string;
  title: string;
  index: number;
  img: string;
}

export default function SliderCard({ index, location, title, img }: IProps) {
  const componentRef = useRef<HTMLDivElement | null>(null);
  const textRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const tl = gsap.timeline();

    tl.fromTo(
      componentRef.current,
      { scale: 0.6, opacity: 0, x: -50, ease: "power2.easeIn" },
      { scale: 1, opacity: 1, x: 0 }
    );

    tl.fromTo(
      textRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.5, ease: "power2.inOut" },
      "-=0.2" // Start this animation 0.5 seconds before the previous one ends
    );
  }, []);

  return (
    <div
      className="relative h-52 min-w-[250px]  shadow-md md:h-80 md:min-w-[208px]"
      ref={componentRef}
    >
      <img
        alt="Transition Image"
        src={img}
        className={`absolute h-full w-full  rounded-2xl  object-cover brightness-75 ${
          index === 0 ? "transition-img" : ""
        }`}
      />
      <div className=" absolute z-10 flex h-full items-end p-4">
        <div ref={textRef}>
          <div className=" mb-2 h-[2px] w-3 rounded-full bg-white"></div>
          <p className="text-xs text-[#D5D5D6]">{location}</p>
          <h1 className="text-xl leading-6 text-white">{title}</h1>
        </div>
      </div>
    </div>
  );
}
