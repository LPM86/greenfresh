
import React from 'react';
import ProductCard, { Product } from './ProductCard';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

interface ProductListProps {
  title: string;
  seeAllLink?: string;
  products: Product[];
}

const ProductList: React.FC<ProductListProps> = ({ title, seeAllLink, products }) => {
  const isMobile = useIsMobile();
  
  // Limit products shown on mobile
  const displayProducts = isMobile ? products.slice(0, 4) : products;
  
  return (
    <div className="my-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-gray-800">{title}</h2>
        {seeAllLink && (
          <Button variant="ghost" size="sm" className="text-greenfresh-600 hover:text-greenfresh-700">
            Xem tất cả <ArrowRight className="h-4 w-4 ml-1" />
          </Button>
        )}
      </div>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {displayProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductList;
