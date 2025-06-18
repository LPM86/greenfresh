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
    name: "Tươi ngon",
    image: "/images/tuoingon.jpg",
    slug: "hot"
  },
  {
    id: 2,
    name: "Combo Tiện Lợi",
    image: "/images/setrau_n.jpg", 
    slug: "combo"
  },
  {
    id: 3,
    name: "Giàu chất dinh dưỡng",
    image: "/images/giauchatdinhduong.jpg",
    slug: "healthy"
  },
  {
    id: 4,
    name: "Rau củ quả",
    image: "/images/raucuqua.jpg",
    slug: "vegetables"
  },
];

// Mock data for flash sale products
const flashSaleProducts: Product[] = [
  {
    id: 101,
    name: "Cà rốt hữu cơ",
    image: "/images/carot1.jpg",
    price: 26000,
    originalPrice: 38000,
    unit: "kg",
    discount: 30,
    isOrganic: true
  },
  {
    id: 102,
    name: "Khoai tây",
    image: "/images/khoaitay.jpg",
    price: 26000,
    originalPrice: 30000,
    unit: "kg",
    discount: 25
  },
  {
    id: 103,
    name: "Khoai lang mật",
    image: "/images/khoailang1.jpg",
    price: 35000,
    originalPrice: 40000,
    unit: "kg",
    discount: 20,
    isHot: true
  },
  {
    id: 104,
    name: "Ngô ngọt ",
    image: "/images/ngongot.jpg",
    price: 30000,
    originalPrice: 40000,
    unit: "kg ",
    discount: 10,
    isOrganic: true
  },
  {
    id: 105,
    name: "Cà chua đỏ",
    image: "/images/cachuado.jpg",
    price: 25000,
    originalPrice: 35000,
    unit: "kg",
    discount: 15,
    isHot: true
  },
  {
    id: 106,
    name: "Rau muống ",
    image: "/images/raumuong.jpg",
    price: 28000,
    originalPrice: 38000,
    unit: "500gr",
    discount: 20,
    isOrganic: true
  },
  {
    id: 107,
    name: "Rau cải ngồng",
    image: "/images/raucaingong.jpg",
    price: 280000,
    originalPrice: 195000,
    unit: "500gr",
    discount: 18,
    isHot: true
  },

{
id: 108,
name: "Khoai sọọ",
image: "/images/khoaiso.jpg",
price: 30000 ,
originalPrice: 40000,
unit: "Kg",
discount: 10,
isHot: true,

},


 {
    id: 109,
    name: "Bắp cải trắng ",
    image: "/images/bapcaitrang.jpg",
    price: 25000,
    originalPrice: 30000,
    unit: "kg",
    discount: 18,
    isHot: true
  },



];

// Mock data for popular products
const popularProducts: Product[] = [
  {
    id: 201,
    name: "Combo thực đơn 3 ngày cho 2 người",
    image: "/images/combo.jpg",
    price: 110000,
    unit: "combo",
    isHot: true
  },
  {
    id: 202,
    name: "Combo rau 5 ngày cho EAT CLEAN",
    image: "/images/combo2.jpg",
    price: 225000,
    unit: "combo",
    isOrganic: true
  },
  {
    id: 203,
    name: "Combo 7 ngày cho 6 người ( 4 người lớn 2 trẻ nhỏ)",
    image: "/images/raucuqua.jpg ",
    price: 300000,
    unit: "combo",
    isOrganic: true
  },
  {
    id: 204,
    name: "Combo 7 ngày cho 2 người",
    image: "/images/setrau_n.jpg",
    price: 250000,
    unit: "combo"
  },
  {
    id: 205,
    name: "Xà lách lolo xanh",
    image: "https://www.lottemart.vn/media/catalog/product/cache/0x0/2/0/2039900000009.jpg.webp",
    price: 30000,
    unit: "500gr",
    isOrganic: true
  },
  {
    id: 206,
    name: "Dưa chuột baby",
    image: "/images/duachuotbaby.jpg",
    price: 30000,
    unit: "500gr"
  },
  {
    id: 207,
    name: "Rau cải chíp ",
    image: "/images/raucaichip.jpg",
    price: 28000,
    unit: "500gr",
    isHot: true
  },
];

// Mock data for recommended products
const recommendedProducts: Product[] = [
  {
    id: 301,
    name: "Cải ngọt",
    image: "/images/caingot.jpg",
    price: 28000,
    unit: "500gr",
    isOrganic: true
  },
  {
    id: 302,
    name: "Mướp",
    image: "/images/muop.jpg",
    price: 25000,
    unit: "kg"
  },
  {
    id: 303,
    name: "Ớt chuông",
    image: "/images/otchuong.jpg",
    price: 60000,
    unit: "kg"
  },
  {
    id: 304,
    name: "Bầu xanh",
    image: "/images/bauxanh.jpg",
    price: 25000,
    unit: "kg"
  },
  {
    id: 305,
    name: "Rau ngót",
    image: "/images/raungot.jpg",
    price: 34000,
    unit: "kg"
  },

  {
    id: 306,
    name: "Đỗ cove",
    image: "https://www.hasfarmgreens.com/wp-content/uploads/2021/07/Dau-cove-4.jpg",
    price: 30000,
    unit: "kg",
    isOrganic: true
  },
  {
    id: 307,
    name: "Dưa leo",
    image: "/images/dualeo.jpg",
    price: 28000,
    unit: "500gr"
  },
  {
    id: 308,
    name: "Cải xanh",
    image: "/images/caixanh.jpg",
    price: 28000,
    unit: "500gr",
    isOrganic: true
  },

{
    id: 309,
    name: "Bí xanh",
    image: "/images/bixanh.jpg",
    price: 30000,
    unit: "kg"
  },

  {
    id:310,
    name: "Bí đỏ ",
    image: "/images/bido.jpg",
    price: 26000,
    unit: "kg",
    isOrganic: true
  },

{
    id: 311,
    name: "Rau cải bó xôi ",
    image: "/images/raucaiboxoi.jpg",
    price: 30000,
    unit: "500gr"
  },



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
                <li>Địa chỉ: Đại Học FPT Hà Nội </li>
                <li>Email: greenfresh456@gmail.com</li>
                <li>Hotline: 033 773 7190</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-greenfresh-700 mt-8 pt-4 text-center text-greenfresh-300">
            <p>© 2025 GreenFresh. Tất cả các quyền được bảo lưu by LPM</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
