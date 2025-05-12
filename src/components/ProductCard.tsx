
import React from 'react';
import { Button } from "@/components/ui/button";
import { Plus, Minus, ShoppingCart } from "lucide-react";
import { Link } from 'react-router-dom';
import { Badge } from "@/components/ui/badge";
import { toast } from "@/components/ui/use-toast";

export interface Product {
  id: number;
  name: string;
  image: string;
  price: number;
  originalPrice?: number;
  unit: string;
  isHot?: boolean;
  isOrganic?: boolean;
  discount?: number;
}

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [quantity, setQuantity] = React.useState(1);

  const handleIncrease = () => {
    setQuantity(prev => prev + 1);
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  const addToCart = () => {
    // Get current cart from localStorage
    const cart = localStorage.getItem('greenfresh-cart');
    let cartItems = cart ? JSON.parse(cart) : {};
    
    // Update quantity if item exists, otherwise add new item
    if (cartItems[product.id]) {
      cartItems[product.id].quantity += quantity;
    } else {
      cartItems[product.id] = {
        ...product,
        quantity,
      };
    }
    
    // Save updated cart
    localStorage.setItem('greenfresh-cart', JSON.stringify(cartItems));
    
    // Show toast notification
    toast({
      title: "Đã thêm vào giỏ hàng",
      description: `${quantity} ${product.unit} ${product.name}`,
    });
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden card-hover relative">
      {/* Badges */}
      <div className="absolute top-2 left-2 flex flex-col gap-1">
        {product.isHot && (
          <Badge className="bg-orange-500">HOT</Badge>
        )}
        {product.isOrganic && (
          <Badge className="bg-greenfresh-600">Organic</Badge>
        )}
        {product.discount && (
          <Badge className="bg-red-500">-{product.discount}%</Badge>
        )}
      </div>

      {/* Product Image */}
      <Link to={`/product/${product.id}`}>
        <div className="aspect-square overflow-hidden">
          <img 
            src={product.image} 
            alt={product.name}
            className="w-full h-full object-cover transition-transform hover:scale-105"
          />
        </div>
      </Link>

      {/* Product Info */}
      <div className="p-3">
        <Link to={`/product/${product.id}`}>
          <h3 className="font-medium text-gray-800 hover:text-greenfresh-600 transition-colors">
            {product.name}
          </h3>
        </Link>

        <div className="mt-1 flex items-center justify-between">
          <div>
            <span className="font-semibold text-greenfresh-700">{formatPrice(product.price)}/{product.unit}</span>
            {product.originalPrice && (
              <span className="text-xs text-gray-500 line-through ml-1">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>
        </div>

        {/* Quantity selector and Add to cart */}
        <div className="mt-3 flex items-center gap-2">
          <div className="flex items-center border border-gray-300 rounded-md overflow-hidden">
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8 rounded-none" 
              onClick={handleDecrease}
            >
              <Minus className="h-3 w-3" />
            </Button>
            <div className="w-8 text-center text-sm">{quantity}</div>
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8 rounded-none" 
              onClick={handleIncrease}
            >
              <Plus className="h-3 w-3" />
            </Button>
          </div>

          <Button 
            variant="default" 
            size="sm" 
            className="ml-auto bg-greenfresh-600 hover:bg-greenfresh-700 text-xs"
            onClick={addToCart}
          >
            <ShoppingCart className="h-3.5 w-3.5 mr-1" />
            Thêm
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
