import { useCallback, useEffect, useState } from "react";

const ImageCarousel = ({ images }: { images: string[] }) => {
  const [currentSlider, setCurrentSlider] = useState(0);

  const nextSlider = useCallback(
    () =>
      setCurrentSlider((currentSlider) =>
        currentSlider === images?.length - 1 ? 0 : currentSlider + 1
      ),
    [images?.length]
  );

  // for automatic sliding
  useEffect(() => {
    const intervalId = setInterval(() => {
      nextSlider();
    }, 3000);
    return () => clearInterval(intervalId);
  }, [nextSlider]);
  return (
    <div className="block md:hidden mt-5">
      <div className="w-full relative overflow-hidden">
        {/* Carousel container */}
        <div
          className="ease-linear duration-500 flex transform-gpu"
          style={{ transform: `translateX(-${currentSlider * 100}%)` }}
        >
          {/* sliders */}
          {images?.map((image: string, index: number) => (
            <div
              key={index}
              className="bg-[#F6F6F6] min-w-full  overflow-hidden font-Montserrat relative "
            >
              <img
                src={image}
                className="min-w-full h-full w-full object-cover"
                alt={`Slider - ${index + 1}`}
              />
            </div>
          ))}
        </div>
      </div>

      {/* dots */}
      <div className="flex justify-center items-center rounded-full z-50 mt-5 w-full gap-1">
        {images?.map((img, idx) => (
          <button
            key={`${img}_${idx}`}
            onClick={() => setCurrentSlider(idx)}
            className={`rounded-[28px] duration-500 bg-[#5C7DEB] ${
              currentSlider === idx ? "w-8" : "w-2"
            } h-[6px]`}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default ImageCarousel;
