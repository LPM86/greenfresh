
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface Slide {
  id: number;
  image: string;
  title: string;
  description: string;
  buttonText: string;
  link: string;
}

const slides: Slide[] = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1518495973542-4542c06a5843?auto=format&fit=crop&w=1400&h=400&q=80",
    title: "Rau sạch từ nông trại đến bàn ăn",
    description: "Sản phẩm tươi mới mỗi ngày, đảm bảo chất lượng VietGAP",
    buttonText: "Mua ngay",
    link: "/products"
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?auto=format&fit=crop&w=1400&h=400&q=80",
    title: "Combo tiện lợi",
    description: "Tiết kiệm thời gian với các combo đã được chuẩn bị sẵn",
    buttonText: "Xem combo",
    link: "/products"
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1400&h=400&q=80",
    title: "Flash Sale tháng 5",
    description: "Giảm giá lên đến 30% cho các sản phẩm mùa hè",
    buttonText: "Xem ưu đãi",
    link: "/products"
  }
];

const Hero: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-advance slides
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div className="relative w-full h-[300px] md:h-[400px] overflow-hidden rounded-lg">
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 w-full h-full transition-opacity duration-500 ease-in-out ${
            index === currentSlide ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        >
          {/* Background Image */}
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${slide.image})` }}
          >
            <div className="absolute inset-0 bg-black bg-opacity-40"></div>
          </div>

          {/* Content */}
          <div className="relative h-full flex flex-col justify-center px-8 md:px-12 text-white">
            <h2 className="text-2xl md:text-4xl font-bold mb-2">{slide.title}</h2>
            <p className="text-sm md:text-base mb-6 max-w-md">{slide.description}</p>
            <Button className="bg-greenfresh-600 hover:bg-greenfresh-700 w-fit">
              {slide.buttonText}
            </Button>
          </div>
        </div>
      ))}

      {/* Navigation buttons */}
      <Button
        variant="secondary"
        size="icon"
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white shadow-md z-10"
        onClick={prevSlide}
      >
        <ArrowLeft className="h-5 w-5" />
      </Button>

      <Button
        variant="secondary"
        size="icon"
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white shadow-md z-10"
        onClick={nextSlide}
      >
        <ArrowRight className="h-5 w-5" />
      </Button>

      {/* Slide indicators */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 rounded-full ${
              index === currentSlide ? "bg-white" : "bg-white/50"
            }`}
            onClick={() => setCurrentSlide(index)}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default Hero;
