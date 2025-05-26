
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
    image: "/images/header1.jpg",
    title: "Rau sạch từ nông trại đến bàn ăn",
    description: "Sản phẩm tươi mới mỗi ngày, đảm bảo chất lượng VietGAP",
    buttonText: "Mua ngay",
    link: "/products"
  },
  {
    id: 2,
    image: "https://scontent.fhan14-5.fna.fbcdn.net/v/t39.30808-6/486226083_1089131296544887_7651220681822985335_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=127cfc&_nc_ohc=0KjENoExm0IQ7kNvwE9Ueuf&_nc_oc=Adl713hTQ1PnnqnUHDDtZgUIMGVA0R2qDA6S30Xl5P8pw9hNsvwiu_u4ZfFC8TtTZD8&_nc_zt=23&_nc_ht=scontent.fhan14-5.fna&_nc_gid=zQrGUiRckIYkz9nT1MTWyg&oh=00_AfJLiR6RhEdcuNqwhUqOtEqBnIXvGuXAvBmQdMNlFhCdhw&oe=6835DAEC",
    title: "Combo tiện lợi",
    description: "Tiết kiệm thời gian với các combo đã được chuẩn bị sẵn",
    buttonText: "Xem combo",
    link: "/products"
  },
  {
    id: 3,
    image: "https://scontent.fhan14-2.fna.fbcdn.net/v/t39.30808-6/484688465_1085418613582822_997120347676150464_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=127cfc&_nc_ohc=jWZyuMRZDeQQ7kNvwHx37nz&_nc_oc=AdlZH4q1QImzyDJMuSmOnWNgjt4Sq6xDGuDwnNtjEjdC141l4699CZ6bZw4W_zwB2AU&_nc_zt=23&_nc_ht=scontent.fhan14-2.fna&_nc_gid=Xzs9G_EFim2THa4K4LvqHw&oh=00_AfLPKIXaiWK5iuTvxFKSPtBXFMernnQQ_lEprc63oVSWbg&oe=6835B413",
    title: "Deal Hot",
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
