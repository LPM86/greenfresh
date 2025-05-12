
import React, { useState, useEffect } from 'react';
import ProductCard, { Product } from './ProductCard';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

interface FlashSaleProps {
  endTime: Date;
  products: Product[];
}

const FlashSale: React.FC<FlashSaleProps> = ({ endTime, products }) => {
  const [timeLeft, setTimeLeft] = useState<{ hours: number; minutes: number; seconds: number }>({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = endTime.getTime() - new Date().getTime();
      if (difference <= 0) {
        return { hours: 0, minutes: 0, seconds: 0 };
      }

      return {
        hours: Math.floor(difference / (1000 * 60 * 60)),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    };

    setTimeLeft(calculateTimeLeft());

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [endTime]);

  return (
    <div className="my-8">
      <div className="bg-gradient-to-r from-orange-500 to-orange-300 p-4 rounded-lg mb-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-white mb-1">Flash Sale</h2>
            <p className="text-white/80 text-sm">Giá sốc chỉ trong hôm nay</p>
          </div>
          
          {/* Countdown timer */}
          <div className="flex items-center gap-1">
            <div className="bg-white px-2 py-1 rounded text-center min-w-12">
              <div className="text-orange-600 font-bold text-xl">{timeLeft.hours.toString().padStart(2, '0')}</div>
              <div className="text-xs text-gray-500">Giờ</div>
            </div>
            <span className="text-white font-bold text-xl">:</span>
            <div className="bg-white px-2 py-1 rounded text-center min-w-12">
              <div className="text-orange-600 font-bold text-xl">{timeLeft.minutes.toString().padStart(2, '0')}</div>
              <div className="text-xs text-gray-500">Phút</div>
            </div>
            <span className="text-white font-bold text-xl">:</span>
            <div className="bg-white px-2 py-1 rounded text-center min-w-12">
              <div className="text-orange-600 font-bold text-xl">{timeLeft.seconds.toString().padStart(2, '0')}</div>
              <div className="text-xs text-gray-500">Giây</div>
            </div>
          </div>
          
          <Button variant="default" size="sm" className="bg-white text-orange-600 hover:bg-white/90">
            Xem tất cả <ArrowRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default FlashSale;
