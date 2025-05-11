import { useEffect, useState } from "react";
import banner1 from "../assets/banner1.jpg";
import banner2 from "../assets/banner2.jpg";
import banner3 from "../assets/banner3.jpg";

const slides = [
  {
    image: banner1,
    title: "Everything You Need, All in One Place",
    subtitle: "Explore our handcrafted treats, made with love and the finest ingredients.",
  },
  {
    image: banner2,
    title: "",
    subtitle: "",
  },
  {
    image: banner3,
    title: "Celebrate Moments with Flavor",
    subtitle: "From birthdays to everyday bliss — we’ve got you covered.",
  },
];

const Banner = () => {
  const [current, setCurrent] = useState(0);

  // Auto-slide every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-11/12 mx-auto px-2 mt-2">
      <div className="relative w-full h-[calc(100vh-60px)] overflow-hidden rounded-2xl">
        {/* Slides */}
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === current ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
            style={{
              backgroundImage: `url(${slide.image})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          >
            <div className="absolute inset-0 bg-orange-500 opacity-20 rounded-2xl"></div>
            <div className="relative z-20 flex flex-col justify-center items-start h-full px-6 md:px-16 text-white">
              <h1 className="text-4xl md:text-6xl font-bold mb-4 max-w-3xl">
                {slide.title}
              </h1>
              <p className="text-lg md:text-xl max-w-2xl">{slide.subtitle}</p>
            </div>
          </div>
        ))}

        {/* Manual Controls */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-2 z-30">
          {slides.map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full ${
                index === current ? "bg-white" : "bg-white/50"
              }`}
              onClick={() => setCurrent(index)}
            ></button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Banner;
