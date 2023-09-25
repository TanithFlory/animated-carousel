interface IProps {
  image: string;
}

export default function BackgroundImage({ image }: IProps) {
  return (
    <div>
      <img
        className="background-img z-20 absolute h-full w-full brightness-75 top-0 left-0"
        src={image}
      />
      <img
        className="placeholder-img z-10 absolute h-full w-full brightness-75 top-0 left-0"
        src={image}
      />
    </div>
  );
}
