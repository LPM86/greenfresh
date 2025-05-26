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
    image: "https://scontent.fhan14-3.fna.fbcdn.net/v/t39.30808-6/485153963_1086982863426397_1050640933148720730_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=127cfc&_nc_ohc=tjiA87EZsgcQ7kNvwH5lUZ8&_nc_oc=AdmbYWUDmigW1VAcpqxraN_SRb0N40lMW5mfKzvLeUhQZGz-2KtM85kzec4SARh7TZ8&_nc_zt=23&_nc_ht=scontent.fhan14-3.fna&_nc_gid=vWAgnk4VmCiV2baP5z2nYw&oh=00_AfKVsCN3e6VzGFw6Ku4z2nV14cqhX3KbgGMTbsNGmRWHTA&oe=6835B11B",
    price: 30000,
    originalPrice: 40000,
    unit: "kg ",
    discount: 10,
    isOrganic: true
  },
  {
    id: 105,
    name: "Cà chua đỏ",
    image: "https://scontent.fhan14-2.fna.fbcdn.net/v/t39.30808-6/485290405_1086690746788942_774899754515586117_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=127cfc&_nc_ohc=S0KxbSj3r6oQ7kNvwHWL3vf&_nc_oc=Adn9D8MRNF1ssWHVWPE8wnyIO-WOLIByiQTRgUlSB6_7Rk_JnmxkeorsjupXAaXdJ3I&_nc_zt=23&_nc_ht=scontent.fhan14-2.fna&_nc_gid=hvYblhKjc9-TPrZYcFOVQw&oh=00_AfK6ffwgjRYDO-E7bo5av0ftljzbmRVzoeQc45jpwsOWJg&oe=6835B4D8",
    price: 25000,
    originalPrice: 35000,
    unit: "kg",
    discount: 15,
    isHot: true
  },
  {
    id: 106,
    name: "Rau muống ",
    image: "https://scontent.fhan14-5.fna.fbcdn.net/v/t39.30808-6/484907006_1086983753426308_1523282637470222638_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=127cfc&_nc_ohc=-5449o6AP5cQ7kNvwEDf77w&_nc_oc=AdlI8aW2FrEJmH-dq4Pqqx3FkID2fOLPEdFOPQz3YbKSk6F6YnkE65LP8DLICeMRdRo&_nc_zt=23&_nc_ht=scontent.fhan14-5.fna&_nc_gid=hNevymPNaloyuS1c4oazLQ&oh=00_AfLX3vZyN24shYbDaZUDMacjMvQLHbbj2NbQyZXsMtzCkQ&oe=6835AFE2",
    price: 28000,
    originalPrice: 38000,
    unit: "500gr",
    discount: 20,
    isOrganic: true
  },
  {
    id: 107,
    name: "Rau cải ngồng",
    image: "https://scontent.fhan14-2.fna.fbcdn.net/v/t39.30808-6/485126179_1086982906759726_359327491843324804_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=127cfc&_nc_ohc=pmhBOWow7lIQ7kNvwGuVzZO&_nc_oc=AdkzVt17elQokeQBRLAzxm5leU3Z2hmjCpUSEdR4i9x-aWl9cM9HQog4EoFNuTE8VMM&_nc_zt=23&_nc_ht=scontent.fhan14-2.fna&_nc_gid=IkRRm2cQFWxmwddJPddI1Q&oh=00_AfIb90wF3paRb13Ne8tcAkRBPr-pRrr64JQ3u2Q68Q_78Q&oe=6835BD72",
    price: 280000,
    originalPrice: 195000,
    unit: "500gr",
    discount: 18,
    isHot: true
  },

{
id: 108,
name: "Súp lơ",
image: "https://scontent.fhan14-1.fna.fbcdn.net/v/t39.30808-6/485814054_1089244003200283_706858702379029125_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=127cfc&_nc_ohc=c2aIayC0Fa0Q7kNvwFnCQxl&_nc_oc=Adk0nTvl6lP-bcpyvOkYB_CJ7USiXCf3C1uwLZwoUTlZwTF4sufOmUL2qtidKn8RcVo&_nc_zt=23&_nc_ht=scontent.fhan14-1.fna&_nc_gid=8JKICwL124BH60IjcziYVA&oh=00_AfJUfKYqHVqNqh8xKmwmS5GzuHqGvNuB8Rqt8dTqZlwGhA&oe=6835D777",
price: 25000 ,
originalPrice: 30000,
unit: "Kg",
discount: 10,
isHot: true,

},


 {
    id: 109,
    name: "Bắp cải trắng ",
    image: "https://scontent.fhan14-4.fna.fbcdn.net/v/t39.30808-6/485747115_1086983110093039_4332483777851317066_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=127cfc&_nc_ohc=UGqKFMDI5zEQ7kNvwEhOX5I&_nc_oc=AdlGYqhF2f3Co6gdJOdij9Q7-BjPZQ7M5fhSwJ9Zd7g3FhhBEadpHwQv6bI_NYx8TXc&_nc_zt=23&_nc_ht=scontent.fhan14-4.fna&_nc_gid=PKBsKEyfpBiEP_8Is5z3cQ&oh=00_AfLdrDDXFrLmCtY_WQ4GeGY-RXOdP_4gpd2GQsf9WRNYnA&oe=6835B577",
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
    name: "Combo thực đơn 3 ngày cho 3 người ăn chay",
    image: "/images/combo.jpg",
    price: 180000,
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
    image: "https://scontent.fhan14-4.fna.fbcdn.net/v/t39.30808-6/485628920_1086983940092956_2235957933636417679_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=127cfc&_nc_ohc=cC3qR8zyxw8Q7kNvwEOX4N-&_nc_oc=Admi3sS8FqKhFUpOqJsGEUX7ip2VRwdEqPenWCYtyWSh_4rBVrT2h3z0G9fgpZ0Gc4o&_nc_zt=23&_nc_ht=scontent.fhan14-4.fna&_nc_gid=Kr5UopimMLmrhi6m_xeCFg&oh=00_AfIEqASIvkwlxo8PtT1KdePYi3_n-r1NnQcDcYOKvGXN8w&oe=6835D8CB",
    price: 30000,
    unit: "500gr"
  },
  {
    id: 207,
    name: "Rau cải chíp ",
    image: "https://scontent.fhan14-5.fna.fbcdn.net/v/t39.30808-6/484915162_1086690673455616_6629324926839088845_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=127cfc&_nc_ohc=t6OE4dMvi7YQ7kNvwFIjEO4&_nc_oc=Adl24NUgTlbrJNwBR8tomY6VBZfDv7cCOUDUVbkq0pS9C5GNIc6RauuvHXwaOBm4qdM&_nc_zt=23&_nc_ht=scontent.fhan14-5.fna&_nc_gid=2hKbibjF6S_rdzFuY5Tw1g&oh=00_AfIBb-vm89knCocpPt6sH9OvPq-F5lDg2utJ-ACNHYsahw&oe=6835CFB5",
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
    name: "Bắp cải tím ",
    image: "https://scontent.fhan14-2.fna.fbcdn.net/v/t39.30808-6/485311058_1086982893426394_4831414372735081827_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=127cfc&_nc_ohc=i-LopcHEi9EQ7kNvwHjdZZn&_nc_oc=AdmYF8ESRh9iQB_2mtw__4rJAWDTzUEkc1ziGfBjKlw9cvmfmA_VuQSFNgXgnT_AY8I&_nc_zt=23&_nc_ht=scontent.fhan14-2.fna&_nc_gid=q4SKx5rmlEwtF29Zf5aX6w&oh=00_AfIdnK9nBbdR_WIyb3qNJlKkR_EGmCrW35K-4-5qGBEwAg&oe=6835CD85",
    price: 25000,
    unit: "cái"
  },
  {
    id: 303,
    name: "Măng tây",
    image: "https://scontent.fhan14-4.fna.fbcdn.net/v/t39.30808-6/484650641_1084990013625682_4637463401545707745_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=127cfc&_nc_ohc=Rxbt8Xai2s8Q7kNvwF6NUPk&_nc_oc=AdmMvySa3PHyilUrzm0oC4zaqeKpduTiOBHBo9oLOEJhJ6nBZddab-FDNroY8SMqm9U&_nc_zt=23&_nc_ht=scontent.fhan14-4.fna&_nc_gid=fD_6WbrtdQOjAbe4dsuTvg&oh=00_AfKyKdYLk2O-NRYlqniNkvWG2KoPDbviL26mS05pZEQWyQ&oe=6835D851",
    price: 85000,
    unit: "bó500gr"
  },
  {
    id: 304,
    name: "Rau dền",
    image: "https://scontent.fhan14-4.fna.fbcdn.net/v/t39.30808-6/485288808_1086982890093061_8829174834187118888_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=127cfc&_nc_ohc=qgtDqHcgDggQ7kNvwE4pBGS&_nc_oc=AdkTSJeUkPo4cZbOy9NWQ3V9D513V02OmoiOtk-5Cv7B9Yfv_bMpM91sE0Zrz-CN3_0&_nc_zt=23&_nc_ht=scontent.fhan14-4.fna&_nc_gid=iyxQCnXggbnJl3clo0zGZw&oh=00_AfKTnfK5BNxuSgLJy09pwBbnbBW4o1fVUveV8RCISI1vzA&oe=6835E188",
    price: 25000,
    unit: "500gr"
  },
  {
    id: 305,
    name: "Rau ngót",
    image: "https://scontent.fhan14-3.fna.fbcdn.net/v/t39.30808-6/485797514_1086983133426370_657453257884274861_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=127cfc&_nc_ohc=vfNUpQzg1xwQ7kNvwG5RT3T&_nc_oc=Adn5Ar228GwQPIG-Xr2sKMleTXOAvRLicX8QtS5uvj_36rvJs7DejkPHxDrKKUOKQMU&_nc_zt=23&_nc_ht=scontent.fhan14-3.fna&_nc_gid=rOu0lQjuoLPuvVdiWVCHMA&oh=00_AfLFjxYyrJNLk4uP45p6d2XNzWddUSVgqot4li43nyf17g&oe=6835BDBE",
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
    image: "https://scontent.fhan14-1.fna.fbcdn.net/v/t39.30808-6/484535743_1086983093426374_7760109482683128918_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=127cfc&_nc_ohc=6oyEyBn5gdcQ7kNvwGeNyBq&_nc_oc=AdncAHlvnR52KM7-p365SpjnV6qN4_Pjeg4yyrqFDfAwQnkR66WxIPNKu1j2aHisYtc&_nc_zt=23&_nc_ht=scontent.fhan14-1.fna&_nc_gid=94M9xwpZtOlbl4qfhX2VIQ&oh=00_AfIYxwqvKKe88mWGBW_2CXvNqC6JuyEYnji84AFuClY-Tw&oe=6835ADC6",
    price: 28000,
    unit: "500gr"
  },
  {
    id: 308,
    name: "Cải xanh",
    image: "https://scontent.fhan14-2.fna.fbcdn.net/v/t39.30808-6/485356494_1086982793426404_9150733630855273973_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=127cfc&_nc_ohc=5fFcCf6YAt8Q7kNvwGWtu-2&_nc_oc=AdlFi-hO_NfC8agwH7f8bK3qbqCL39daBjT2BVFQTP7STQ4g-LpZoCAIueE8v-Uq2XA&_nc_zt=23&_nc_ht=scontent.fhan14-2.fna&_nc_gid=qruFyqjNVidfULo2QuOPcQ&oh=00_AfLjyj58_38-FclNnLghUKvfTUspu_BJGIvqVcbRJA1gdQ&oe=6835E8CE",
    price: 28000,
    unit: "500gr",
    isOrganic: true
  },

{
    id: 309,
    name: "Bí xanh",
    image: "https://scontent.fhan14-2.fna.fbcdn.net/v/t39.30808-6/485073103_1086983103426373_6080653332814485095_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=127cfc&_nc_ohc=1Nm1rGEvLaYQ7kNvwFuHuPH&_nc_oc=AdmOeukzLSE4KvBX0NwwVzdAeh3iGHb9ACiUjrlxBU4alFWRMpBUUqX5UppswoUutZU&_nc_zt=23&_nc_ht=scontent.fhan14-2.fna&_nc_gid=LWoHiUxrgKPaNp2xWG4rHQ&oh=00_AfJ9wAFZbTVXXNE4IVzLtlIsOFVlroMdwJ7YSOaIoaGz9g&oe=6835DB9A",
    price: 30000,
    unit: "kg"
  },

  {
    id:310,
    name: "Bí đỏ ",
    image: "https://scontent.fhan14-3.fna.fbcdn.net/v/t39.30808-6/485601452_1086690516788965_5595169371022260480_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=127cfc&_nc_ohc=sszrtxBf-y4Q7kNvwGuNo5L&_nc_oc=Adkt7CNa3ZYOyLLogDlGj8tJYYfMYn8ae6_CYPAt1zS4FMRBsh7gp0hIXdONget90JM&_nc_zt=23&_nc_ht=scontent.fhan14-3.fna&_nc_gid=TVagKVeabpoZLc2yjb7ZSA&oh=00_AfKAuzffa1L-7CM9hNoic8kJ62kC2zMeIbLi4I7vR0497w&oe=6835D63B",
    price: 26000,
    unit: "kg",
    isOrganic: true
  },

{
    id: 311,
    name: "Rau cải bó xôi ",
    image: "https://scontent.fhan14-5.fna.fbcdn.net/v/t39.30808-6/485805695_1086983083426375_6350728641735681053_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=127cfc&_nc_ohc=63rXQcvr6V4Q7kNvwG-ehvY&_nc_oc=AdmIee2ET6huHv4OQnCEOpOPr-zFoJ6itYOqWojEIUswwXV3hjuj1qv31et3NwNBKMg&_nc_zt=23&_nc_ht=scontent.fhan14-5.fna&_nc_gid=XxCFc9DzmlNWi9wkeGW4qA&oh=00_AfI2QdcfU6fm9gj3x7Xo15fnvgGxXWBitKSp7BY3jIcMhQ&oe=6835CFFF",
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
