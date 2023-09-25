import gsap, { Power1 } from "gsap";
import { useEffect, useRef } from "react";
interface IProps {
  location: string;
  title: string;
  index: number;
  img: string;
}

export default function SliderCard({ index, location, title, img }: IProps) {
  const componentRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!componentRef.current) return;
    let ctx = gsap.context(() => {
      gsap.fromTo(
        componentRef.current,
        { scale: 0.6, opacity: 0, transition: Power1.easeIn },
        { scale: 1, opacity: 1 }
      );
    }, componentRef);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <div
      className="relative h-52 min-w-[250px]  shadow-md md:h-80 md:min-w-[208px]"
      ref={componentRef}
    >
      <img
        className={`absolute h-full w-full rounded-md  brightness-75 object-cover ${
          index === 0 ? "transition-img" : ""
        }`}
        src={img}
      />
      <div className=" absolute z-10 flex h-full items-end p-4">
        <div>
          <div className=" mb-2 h-[2px] w-3 rounded-full bg-white"></div>
          <p className="text-xs text-[#D5D5D6]">{location}</p>
          <h1 className="text-xl leading-6 text-white">{title}</h1>
        </div>
      </div>
    </div>
  );
}
