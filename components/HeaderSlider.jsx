import React, { useState, useEffect } from "react";
import { assets } from "@/assets/assets";
import Image from "next/image";

const HeaderSlider = () => {
  const sliderData = [
    {
      id: 1,
      title: "Visualize it",
      imgSrc: assets.header_headphone_image,
    },
    {
      id: 2,
      title: "Build it",
      imgSrc: assets.header_playstation_image,
    },
    {
      id: 3,
      title: "Render it",
      imgSrc: assets.header_macbook_image,
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % sliderData.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [sliderData.length]);

  const handleSlideChange = (index) => {
    setCurrentSlide(index);
  };

  return (
    <div className="overflow-hidden relative w-full ">
      <div
        className="flex transition-transform duration-700 ease-in-out"
        style={{
          transform: `translateX(-${currentSlide * 100}%)`,
        }}
      >
        {sliderData.map((slide, index) => (
  <div
    key={slide.id}
    className="min-w-full relative z-0 flex flex-col-reverse md:flex-row items-center justify-between bg-white/10 backdrop-blur-md border border-white/20 rounded-xl px-6 md:px-14 py-10 gap-6 mt-4"
  >
    {/* Text Section */}
    <div className="pl-0 md:pl-40 mt-6 md:mt-0 text-center md:text-left">
      <h1 className="text-white font-semibold text-3xl md:text-6xl leading-tight max-w-xl">
        {slide.title}
      </h1>
    </div>

    {/* Image Section */}
   <div className="flex-1 flex justify-end md:pr-40">

      <Image
        className="w-40 md:w-72 object-contain"
        src={slide.imgSrc}
        alt={`Slide ${index + 1}`}
      />
    </div>
  </div>
))}

      </div>

      {/* Indicator Dots */}
      <div className="flex items-center justify-center gap-3 mt-6">
        {sliderData.map((_, index) => (
          <div
            key={index}
            onClick={() => handleSlideChange(index)}
            className={`h-3 w-3 rounded-full cursor-pointer transition-all duration-300 ${
              currentSlide === index
                ? "bg-orange-500 scale-110"
                : "bg-white/30 hover:bg-white/50"
            }`}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default HeaderSlider;
