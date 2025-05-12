
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Plus, Minus, ShoppingCart } from "lucide-react";
import { toast } from '@/components/ui/use-toast';
import ProductList from '@/components/ProductList';
import { Product } from '@/components/ProductCard';

// Mock products data
const products: Record<number, Product & { description: string; origin: string; standard: string }> = {
  101: {
    id: 101,
    name: "Cà rốt hữu cơ",
    image: "https://images.unsplash.com/photo-1598170845058-32b9d6a5d4f7?auto=format&fit=crop&w=900&h=900&q=80",
    price: 25000,
    originalPrice: 38000,
    unit: "kg",
    discount: 30,
    isOrganic: true,
    description: "Cà rốt hữu cơ tươi ngon từ nông trại, giàu beta-carotene, vitamin A và chất xơ. Phù hợp cho các món ăn dinh dưỡng hàng ngày.",
    origin: "Đà Lạt",
    standard: "VietGAP"
  },
  102: {
    id: 102,
    name: "Cải xanh",
    image: "https://images.unsplash.com/photo-1567375698348-5d9d5ae99de0?auto=format&fit=crop&w=900&h=900&q=80",
    price: 15000,
    originalPrice: 20000,
    unit: "bó",
    discount: 25,
    description: "Cải xanh tươi ngon, giàu vitamin C và chất xơ. Lá cải xanh mướt, không bị úa vàng, không có sâu bệnh.",
    origin: "Hà Nội",
    standard: "VietGAP"
  }
};

// Mock related products
const relatedProducts: Product[] = [
  {
    id: 103,
    name: "Dâu tây",
    image: "https://images.unsplash.com/photo-1601004890684-d8cbf643f5f2?auto=format&fit=crop&w=500&h=500&q=80",
    price: 110000,
    originalPrice: 145000,
    unit: "hộp",
    discount: 20,
    isHot: true
  },
  {
    id: 104,
    name: "Xà lách",
    image: "https://images.unsplash.com/photo-1621194166361-6d3893b793e9?auto=format&fit=crop&w=500&h=500&q=80",
    price: 20000,
    originalPrice: 28000,
    unit: "bó",
    discount: 30,
    isOrganic: true
  },
  {
    id: 105,
    name: "Bơ",
    image: "https://images.unsplash.com/photo-1519162808019-7de1683fa2ad?auto=format&fit=crop&w=500&h=500&q=80",
    price: 95000,
    originalPrice: 120000,
    unit: "kg",
    discount: 15,
    isHot: true
  },
  {
    id: 201,
    name: "Combo salad",
    image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=500&h=500&q=80",
    price: 89000,
    unit: "combo",
    isHot: true
  },
  {
    id: 202,
    name: "Khoai tây",
    image: "https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=500&h=500&q=80",
    price: 25000,
    unit: "kg",
    isOrganic: true
  }
];

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const productId = id ? parseInt(id) : 0;
  const product = products[productId];
  
  const [quantity, setQuantity] = useState(1);

  const handleIncrease = () => {
    setQuantity(prev => prev + 1);
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  const addToCart = () => {
    if (!product) return;
    
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

  if (!product) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <div className="text-center py-16">
            <h1 className="text-2xl font-bold mb-4">Sản phẩm không tồn tại</h1>
            <Button asChild>
              <a href="/">Quay về trang chủ</a>
            </Button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-6">
        <div className="bg-white rounded-lg shadow-sm overflow-hidden p-4 md:p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Product Image */}
            <div className="rounded-lg overflow-hidden">
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-full object-cover aspect-square"
              />
            </div>
            
            {/* Product Details */}
            <div>
              <h1 className="text-2xl font-bold text-gray-800">{product.name}</h1>
              
              <div className="flex items-center gap-2 my-2">
                {product.isHot && <Badge className="bg-orange-500">HOT</Badge>}
                {product.isOrganic && <Badge className="bg-greenfresh-600">Organic</Badge>}
                <Badge variant="outline" className="text-gray-500">Nguồn gốc: {product.origin}</Badge>
                <Badge variant="outline" className="text-gray-500">Tiêu chuẩn: {product.standard}</Badge>
              </div>
              
              <div className="mt-4 flex items-center">
                <span className="text-2xl font-bold text-greenfresh-700">{formatPrice(product.price)}</span>
                {product.originalPrice && (
                  <span className="text-gray-500 line-through ml-2">
                    {formatPrice(product.originalPrice)}
                  </span>
                )}
                {product.discount && (
                  <Badge className="ml-2 bg-red-500">-{product.discount}%</Badge>
                )}
              </div>
              
              <p className="text-sm text-gray-500 mt-1">Giá trên mỗi {product.unit}</p>
              
              <div className="my-6">
                <p className="text-gray-700">{product.description}</p>
              </div>
              
              <div className="mt-6">
                <div className="flex items-center gap-4">
                  <span className="text-gray-700">Số lượng:</span>
                  <div className="flex items-center border border-gray-300 rounded-md overflow-hidden">
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-10 w-10 rounded-none" 
                      onClick={handleDecrease}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <div className="w-12 text-center">{quantity}</div>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-10 w-10 rounded-none" 
                      onClick={handleIncrease}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                
                <Button 
                  className="mt-6 w-full md:w-auto bg-greenfresh-600 hover:bg-greenfresh-700"
                  size="lg"
                  onClick={addToCart}
                >
                  <ShoppingCart className="h-5 w-5 mr-2" />
                  Thêm vào giỏ hàng
                </Button>
              </div>
            </div>
          </div>
        </div>
        
        <Separator className="my-12" />
        
        {/* Related products */}
        <ProductList title="Sản phẩm liên quan" products={relatedProducts} />
      </main>
      
      <footer className="bg-greenfresh-800 text-white mt-12">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-bold mb-4">GreenFresh</h3>
              <p className="text-greenfresh-200 mb-4">Rau sạch từ nông trại đến bàn ăn. Sản phẩm tươi mới mỗi ngày, đảm bảo chất lượng VietGAP.</p>
            </div>
            
            <div>
              <h3 className="text-lg font-bold mb-4">Thông tin</h3>
              <ul className="space-y-2 text-greenfresh-200">
                <li>Về chúng tôi</li>
                <li>Chính sách giao hàng</li>
                <li>Điều khoản sử dụng</li>
                <li>Chính sách bảo mật</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-bold mb-4">Liên hệ</h3>
              <ul className="space-y-2 text-greenfresh-200">
                <li>Địa chỉ: 123 Đường ABC, Quận 1, TP HCM</li>
                <li>Email: info@greenfresh.vn</li>
                <li>Hotline: 1800-1234</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-greenfresh-700 mt-8 pt-4 text-center text-greenfresh-300">
            <p>© 2023 GreenFresh. Tất cả các quyền được bảo lưu.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ProductDetail;
