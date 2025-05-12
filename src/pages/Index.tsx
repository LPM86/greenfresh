
import React from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import ProductList from '@/components/ProductList';
import FlashSale from '@/components/FlashSale';
import CategoryCard, { Category } from '@/components/CategoryCard';
import { Product } from '@/components/ProductCard';
import { Separator } from '@/components/ui/separator';

// Mock data for categories
const categories: Category[] = [
  {
    id: 1,
    name: "Siêu HOT",
    image: "https://images.unsplash.com/photo-1518495973542-4542c06a5843?auto=format&fit=crop&w=600&h=300&q=80",
    slug: "hot"
  },
  {
    id: 2,
    name: "Combo Tiện Lợi",
    image: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=600&h=300&q=80", 
    slug: "combo"
  },
  {
    id: 3,
    name: "Thực đơn khoa học",
    image: "https://images.unsplash.com/photo-1501854140801-50d01698950b?auto=format&fit=crop&w=600&h=300&q=80",
    slug: "healthy"
  },
  {
    id: 4,
    name: "Rau củ quả",
    image: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?auto=format&fit=crop&w=600&h=300&q=80",
    slug: "vegetables"
  },
];

// Mock data for flash sale products
const flashSaleProducts: Product[] = [
  {
    id: 101,
    name: "Cà rốt hữu cơ",
    image: "https://images.unsplash.com/photo-1598170845058-32b9d6a5d4f7?auto=format&fit=crop&w=500&h=500&q=80",
    price: 25000,
    originalPrice: 38000,
    unit: "kg",
    discount: 30,
    isOrganic: true
  },
  {
    id: 102,
    name: "Cải xanh",
    image: "https://images.unsplash.com/photo-1567375698348-5d9d5ae99de0?auto=format&fit=crop&w=500&h=500&q=80",
    price: 15000,
    originalPrice: 20000,
    unit: "bó",
    discount: 25
  },
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
  }
];

// Mock data for popular products
const popularProducts: Product[] = [
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
  },
  {
    id: 203,
    name: "Cà chua",
    image: "https://images.unsplash.com/photo-1592924357228-91a4daadcffd?auto=format&fit=crop&w=500&h=500&q=80",
    price: 35000,
    unit: "kg",
    isOrganic: true
  },
  {
    id: 204,
    name: "Hành tây",
    image: "https://images.unsplash.com/photo-1580201092675-a0a6a6cafbb1?auto=format&fit=crop&w=500&h=500&q=80",
    price: 22000,
    unit: "kg"
  },
  {
    id: 205,
    name: "Ớt chuông",
    image: "https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?auto=format&fit=crop&w=500&h=500&q=80",
    price: 65000,
    unit: "kg",
    isOrganic: true
  }
];

// Mock data for recommended products
const recommendedProducts: Product[] = [
  {
    id: 301,
    name: "Bông cải xanh",
    image: "https://images.unsplash.com/photo-1583663848850-46af132dc08e?auto=format&fit=crop&w=500&h=500&q=80",
    price: 48000,
    unit: "kg",
    isOrganic: true
  },
  {
    id: 302,
    name: "Bắp cải",
    image: "https://images.unsplash.com/photo-1594282486552-05a5f0fa6cd3?auto=format&fit=crop&w=500&h=500&q=80",
    price: 18000,
    unit: "kg"
  },
  {
    id: 303,
    name: "Cà tím",
    image: "https://images.unsplash.com/photo-1605286978633-2dec93ff88a2?auto=format&fit=crop&w=500&h=500&q=80",
    price: 39000,
    unit: "kg"
  },
  {
    id: 304,
    name: "Nấm",
    image: "https://images.unsplash.com/photo-1543218024-57a70143c369?auto=format&fit=crop&w=500&h=500&q=80",
    price: 55000,
    unit: "hộp"
  },
  {
    id: 305,
    name: "Chanh",
    image: "https://images.unsplash.com/photo-1587735243615-c03f25aaff15?auto=format&fit=crop&w=500&h=500&q=80",
    price: 28000,
    unit: "kg"
  }
];

const Home: React.FC = () => {
  // Calculate flash sale end time (24 hours from now)
  const flashSaleEndTime = new Date();
  flashSaleEndTime.setHours(flashSaleEndTime.getHours() + 24);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-6">
          {/* Hero slider */}
          <Hero />
          
          {/* Categories */}
          <div className="my-8">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Danh mục nổi bật</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {categories.map((category) => (
                <CategoryCard key={category.id} category={category} />
              ))}
            </div>
          </div>
          
          <Separator />
          
          {/* Flash sale */}
          <FlashSale endTime={flashSaleEndTime} products={flashSaleProducts} />
          
          <Separator />
          
          {/* Popular products */}
          <ProductList title="Sản phẩm phổ biến" seeAllLink="/products" products={popularProducts} />
          
          <Separator />
          
          {/* Recommended products */}
          <ProductList title="Gợi ý cho bạn" seeAllLink="/products" products={recommendedProducts} />
        </div>
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

export default Home;
