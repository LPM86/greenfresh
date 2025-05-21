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
    image: "https://cdn.pixabay.com/photo/2018/06/23/15/16/carrots-3493237_1280.jpg",
    price: 25000,
    originalPrice: 38000,
    unit: "kg",
    discount: 30,
    isOrganic: true
  },
  {
    id: 102,
    name: "Cải xanh",
    image: "https://cdn.pixabay.com/photo/2018/08/30/20/47/spinach-3643523_1280.jpg",
    price: 15000,
    originalPrice: 20000,
    unit: "bó",
    discount: 25
  },
  {
    id: 103,
    name: "Dâu tây",
    image: "https://cdn.pixabay.com/photo/2018/04/29/11/54/strawberries-3359755_1280.jpg",
    price: 110000,
    originalPrice: 145000,
    unit: "hộp",
    discount: 20,
    isHot: true
  },
  {
    id: 104,
    name: "Xà lách",
    image: "https://cdn.pixabay.com/photo/2018/10/03/22/08/green-3722767_1280.jpg",
    price: 20000,
    originalPrice: 28000,
    unit: "bó",
    discount: 30,
    isOrganic: true
  },
  {
    id: 105,
    name: "Bơ",
    image: "https://cdn.pixabay.com/photo/2017/12/10/14/47/avocado-3010511_1280.jpg",
    price: 95000,
    originalPrice: 120000,
    unit: "kg",
    discount: 15,
    isHot: true
  },
  {
    id: 106,
    name: "Ớt chuông đỏ",
    image: "https://cdn.pixabay.com/photo/2017/09/25/20/05/peppers-2786684_1280.jpg",
    price: 58000,
    originalPrice: 75000,
    unit: "kg",
    discount: 22,
    isOrganic: true
  },
  {
    id: 107,
    name: "Nho đỏ không hạt",
    image: "https://cdn.pixabay.com/photo/2018/09/19/20/14/grapes-3689926_1280.jpg",
    price: 160000,
    originalPrice: 195000,
    unit: "kg",
    discount: 18,
    isHot: true
  },
];

// Mock data for popular products
const popularProducts: Product[] = [
  {
    id: 201,
    name: "Combo salad",
    image: "https://cdn.pixabay.com/photo/2016/06/30/18/49/salad-1489580_1280.jpg",
    price: 89000,
    unit: "combo",
    isHot: true
  },
  {
    id: 202,
    name: "Khoai tây",
    image: "https://cdn.pixabay.com/photo/2016/08/11/08/43/potatoes-1585060_1280.jpg",
    price: 25000,
    unit: "kg",
    isOrganic: true
  },
  {
    id: 203,
    name: "Cà chua",
    image: "https://cdn.pixabay.com/photo/2016/08/01/17/08/tomatoes-1561565_1280.jpg",
    price: 35000,
    unit: "kg",
    isOrganic: true
  },
  {
    id: 204,
    name: "Hành tây",
    image: "https://cdn.pixabay.com/photo/2016/05/16/22/47/onions-1397037_1280.jpg",
    price: 22000,
    unit: "kg"
  },
  {
    id: 205,
    name: "Ớt chuông",
    image: "https://cdn.pixabay.com/photo/2016/08/03/01/10/paprika-1565105_1280.jpg",
    price: 65000,
    unit: "kg",
    isOrganic: true
  },
  {
    id: 206,
    name: "Kiwi xanh",
    image: "https://cdn.pixabay.com/photo/2015/01/13/10/31/kiwi-598322_1280.jpg",
    price: 110000,
    unit: "kg"
  },
  {
    id: 207,
    name: "Táo đỏ",
    image: "https://cdn.pixabay.com/photo/2016/01/05/13/58/apple-1122537_1280.jpg",
    price: 80000,
    unit: "kg",
    isHot: true
  },
];

// Mock data for recommended products
const recommendedProducts: Product[] = [
  {
    id: 301,
    name: "Bông cải xanh",
    image: "https://cdn.pixabay.com/photo/2016/03/05/19/02/broccoli-1238250_1280.jpg",
    price: 48000,
    unit: "kg",
    isOrganic: true
  },
  {
    id: 302,
    name: "Bắp cải",
    image: "https://cdn.pixabay.com/photo/2019/09/06/07/03/red-cabbage-4455958_1280.jpg",
    price: 18000,
    unit: "kg"
  },
  {
    id: 303,
    name: "Cà tím",
    image: "https://cdn.pixabay.com/photo/2017/08/17/16/04/eggplant-2651074_1280.jpg",
    price: 39000,
    unit: "kg"
  },
  {
    id: 304,
    name: "Nấm",
    image: "https://cdn.pixabay.com/photo/2017/11/15/11/11/mushroom-2950801_1280.jpg",
    price: 55000,
    unit: "hộp"
  },
  {
    id: 305,
    name: "Chanh",
    image: "https://cdn.pixabay.com/photo/2017/02/05/12/31/lemons-2039830_1280.jpg",
    price: 28000,
    unit: "kg"
  },
  {
    id: 306,
    name: "Đậu xanh",
    image: "https://cdn.pixabay.com/photo/2021/01/05/23/14/broad-beans-5892655_1280.jpg",
    price: 38000,
    unit: "kg",
    isOrganic: true
  },
  {
    id: 307,
    name: "Dưa leo",
    image: "https://cdn.pixabay.com/photo/2015/07/17/13/44/cucumbers-849269_1280.jpg",
    price: 22000,
    unit: "kg"
  },
  {
    id: 308,
    name: "Măng tây",
    image: "https://cdn.pixabay.com/photo/2018/04/13/17/12/asparagus-3316976_1280.jpg",
    price: 85000,
    unit: "bó",
    isOrganic: true
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
