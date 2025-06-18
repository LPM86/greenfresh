
import React, { useState, useEffect } from 'react';
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
    image: "/images/carot1.jpg",
    price: 26000,
    originalPrice: 38000,
    unit: "kg",
    discount: 30,
    isOrganic: true,
    description: "Cà rốt hữu cơ tươi ngon từ nông trại, giàu beta-carotene, vitamin A và chất xơ. Phù hợp cho các món ăn dinh dưỡng hàng ngày.",
    origin: "HTX Rau Sạch Yên Dũng",
    standard: "VietGAP"
  },
  102: {
    id: 102,
    name: "Khoai tây",
    image: "/images/khoaitay.jpg",
    price: 26000,
    originalPrice: 30000,
    unit: "kg",
    discount: 25,
    description: "Giàu vitamin C và chất xơ, tốt cho tiêu hóa, hỗ trợ miễn dịch, phù hợp cho các món chiên, hầm, nướng, súp và nhiều món ngon khác.",
    origin: "HTX Rau Sạch Yên Dũng",
    standard: "VietGAP"
  },
  103: {
    id: 103,
    name: "Khoai lang mật",
    image: "/images/khoailang1.jpg",
    price: 350000,
    originalPrice: 40000,
    unit: "kg",
    discount: 20,
    isHot: true,
    description: "Vị ngọt thanh, dẻo mềm, giàu chất xơ và vitamin A, tốt cho tiêu hóa và làm đẹp da. Phù hợp cho món nướng, luộc, hoặc làm bánh ăn vặt dinh dưỡng.",
    origin: "HTX Rau Sạch Yên Dũng",
    standard: "VietGAP"
  },
  104: {
    id: 104,
    name: "Ngô ngọt ",
    image: "/images/ngongot.jpg",
    price: 30000,
    originalPrice: 40000,
    unit: "kg",
    discount: 30,
    isOrganic: true,
    description: "Ngô ngọt tươi non, vị ngọt tự nhiên, hạt vàng giòn, giàu dinh dưỡng, phù hợp cho luộc, hấp, nướng hay chế biến món ăn sáng.",
    origin: "HTX Rau Sạch Yên Dũng",
    standard: "VietGAP"
  },
  105: {
    id: 105,
    name: "Cà chua đỏ",
    image: "/images/cachuado.jpg",
    price: 25000,
    originalPrice: 35000,
    unit: "kg",
    discount: 15,
    isHot: true,
    description: "Cà chua đỏ là loại quả mọng có màu đỏ tươi, hình tròn hoặc hơi bầu dục, vỏ mỏng, thịt mọng nước và vị chua ngọt. Đây là thực phẩm giàu vitamin C, A, lycopene và chất chống oxy hóa, thường được dùng trong các món salad, nước ép, sốt và nấu ăn hàng ngày.",
    origin: "HTX Rau Sạch Yên Dũng",
    standard: "VietGAP"
  },
  106: {
    id: 106,
    name: "Rau muống ",
    image: "/images/raumuong.jpg",
    price: 28000,
    originalPrice: 38000,
    unit: "500gr",
    isHot: true,
    description: "Rau muống tươi, cọng non giòn, lá xanh mướt, được trồng theo hướng hữu cơ, không thuốc trừ sâu. Giàu chất xơ, sắt và vitamin A, C – giúp thanh nhiệt, bổ máu, hỗ trợ tiêu hóa. Phù hợp xào tỏi, luộc, ăn kèm mắm kho hoặc nấu canh",
    origin: "HTX Rau Sạch Yên Dũng",
    standard: "VietGAP"
  },
  107: {
    id: 107,
    name: "Rau cải ngồng",
    image: "/images/raucaingong.jpg",
    price: 280000,
    originalPrice: 195000,
    unit: "500gr",
    isOrganic: true,
    description: "Cải ngồng tươi xanh, cọng non mập, lá mướt, vị ngọt nhẹ đặc trưng. Được trồng sạch theo hướng VietGAP, không thuốc hóa học. Giàu chất xơ, vitamin A, C, K – tốt cho mắt, hỗ trợ tiêu hóa và tăng cường đề kháng. Thích hợp xào tỏi, luộc, nấu canh hoặc làm món salad.",
    origin: "HTX Rau Sạch Yên Dũng",
    standard: "VietGAP"
  },
  108: {
    id: 108,
    name: "Khoai sọ",
    image: "/images/khoaiso.jpg",
    price: 25000,
    originalPrice: 30000,
    unit: "Kg",
    isOrganic: true,
    description: "",
    origin: "HTX Rau Sạch Yên Dũng",
    standard: "VietGAP"
  },
  109: {
    id: 109,
    name: "Bắp cải trắng ",
    image: "/images/bapcaitrang.jpg",
    price: 25000,
    originalPrice: 30000,
    unit: "kg",
    isOrganic: true,
    description: "Bắp cải trắng tươi, búp tròn chắc tay, lá mỏng, trắng xanh tự nhiên. Vị ngọt thanh, giòn mát, giàu vitamin C, K, folate và chất chống oxy hóa – tốt cho tim mạch, tiêu hóa và làm đẹp da. Phù hợp để luộc, xào, cuốn thịt, làm gỏi hoặc dưa muối.",
    origin: "HTX Rau Sạch Yên Dũng",
    standard: "VietGAP"
  },

  201: {
    id: 201,
    name: "Combo thực đơn 3 ngày cho 2 người",
    image: "/images/combo.jpg",
    price: 180000,
    unit: "combo",
    isOrganic: true,
    description: "Liên hệ trực tiếp qua sđt: 0922407746 để được tư vấn chi tiết combo rau của bạn",
    origin: "HTX Rau Sạch Yên Dũng",
    standard: "VietGAP"
  },
  202: {
    id: 202,
    name: "Combo rau 5 ngày cho EAT CLEAN",
    image: "/images/combo2.jpg",
    price: 225000,
    unit: "combo",
    isOrganic: true,
    description: "Liên hệ trực tiếp qua sđt: 0922407746 để được tư vấn chi tiết combo rau của bạn",
    origin: "HTX Rau Sạch Yên Dũng",
    standard: "VietGAP"
  },

  203: {
    id: 203,
    name: "Combo 7 ngày cho 6 người ( 4 người lớn 2 trẻ nhỏ)",
    image: "/images/raucuqua.jpg",
    price: 300000,
    unit: "combo",
    description: "Liên hệ trực tiếp qua sđt: 0922407746 để được tư vấn chi tiết combo rau của bạn",
    origin: "HTX Rau Sạch Yên Dũng",
    standard: "VietGAP"
  },

  204: {
     id: 204,
    name: "Combo 7 ngày cho 2 người",
    image: "/images/setrau_n.jpg ",
    price: 250000,
    unit: "combo",
    description: "Liên hệ trực tiếp qua sđt: 0922407746 để được tư vấn chi tiết combo rau của bạn",
    origin: "HTX Rau Sạch Yên Dũng",
    standard: "VietGAP"
  },

  205: {
    id: 205,
    name: "Xà lách lolo xanh",
    image: "https://www.lottemart.vn/media/catalog/product/cache/0x0/2/0/2039900000009.jpg.webp",
    price: 30000,
    unit: "500gr",
    description: "Xà lách lô lô xanh tươi, lá xoăn mềm, màu xanh non bắt mắt, vị thanh nhẹ, không đắng. Giàu vitamin A, C, K và chất xơ – hỗ trợ đẹp da, giảm cân, tốt cho tiêu hóa. Thích hợp ăn sống, trộn salad, cuốn thịt hoặc ăn kèm món nướng.",
    origin: "HTX Rau Sạch Yên Dũng",
    standard: "VietGAP"
  },

  206: {
     id: 206,
    name: "Dưa chuột baby",
    image: "/images/duachuotbaby.jpg",
    price: 30000,
    unit: "500gr",
    description: "Dưa chuột baby tươi non, vỏ mỏng, ruột ít hạt, giòn ngọt tự nhiên. Kích thước nhỏ gọn, tiện lợi cho ăn sống, trộn salad, làm đồ ăn nhẹ hoặc ép nước detox. Giàu nước, vitamin C, kali và chất chống oxy hóa – giúp thanh nhiệt, đẹp da và hỗ trợ giảm cân.",
    origin: "HTX Rau Sạch Yên Dũng",
    standard: "VietGAP"
  },

  207: {
    id: 207,
    name: "Rau cải chíp ",
    image: "/images/raucaichip.jpg",
    price: 28000,
    unit: "500gr",
    description: "Cải chíp tươi non, bẹ xanh sáng, lá mềm mướt, vị ngọt thanh. Giàu vitamin A, C, K, canxi và chất xơ – tốt cho xương, tăng đề kháng và hỗ trợ tiêu hóa. Phù hợp để xào tỏi, luộc, nấu canh hoặc ăn lẩu.",
    origin: "HTX Rau Sạch Yên Dũng",
    standard: "VietGAP"
  },

   301: {
    id: 301,
    name: "Cải ngọt",
    image: "/images/caingot.jpg",
    price: 28000,
    unit: "500gr",
    description: "Cải ngọt tươi non, thân giòn, lá xanh mướt, vị ngọt nhẹ đặc trưng. Giàu vitamin A, C, axit folic và chất xơ – giúp thanh nhiệt, bổ máu, tốt cho tiêu hóa và tim mạch. Phù hợp để luộc, xào, nấu canh hoặc ăn lẩu.",
    origin: "HTX Rau Sạch Yên Dũng",
    standard: "VietGAP"
  },

  
   302: {
   id: 302,
    name: "Mướp ",
    image: "/images/muop.jpg",
    price: 25000,
    unit: "kg",
    description: "Mướp là loại rau quả dạng dây leo, có thân mềm, quả dài hình trụ thuôn, vỏ màu xanh và có rãnh dọc. Khi còn non, mướp có ruột mềm, vị ngọt nhẹ, thường được dùng để nấu canh, xào hoặc luộc. Mướp già có thể để lấy xơ làm giẻ rửa. Đây là thực phẩm mát, giúp thanh nhiệt và bổ sung chất xơ.",
    origin: "HTX Rau Sạch Yên Dũng",
    standard: "VietGAP"
  },

   303: {
   id: 303,
    name: "Ớt chuông",
    image: "/images/otchuong.jpg",
    price: 60000,
    unit: "kg",
    description: "Ớt chuông là loại quả thuộc họ cà, có hình khối hoặc hơi thuôn, vỏ dày, trơn bóng, không cay. Quả có nhiều màu như đỏ, vàng, xanh, cam, chứa nhiều vitamin C, A và chất chống oxy hóa. Ớt chuông thường được dùng trong các món xào, salad, nướng hoặc ăn sống, vừa tạo màu sắc bắt mắt vừa tăng giá trị dinh dưỡng.",
    origin: "HTX Rau Sạch Yên Dũng",
    standard: "VietGAP"
  },

    304: {
   id: 304,
    name: "Bầu xanh",
    image: "/images/bauxanh.jpg",
    price: 25000,
    unit: "500gr",
    description: "Bầu xanh là loại cây leo cho quả dài, vỏ màu xanh nhạt hoặc xanh đậm, bề mặt nhẵn hoặc có lông mịn. Quả bầu non có ruột mềm, vị ngọt nhẹ, thường được dùng để nấu canh, luộc hoặc xào. Bầu xanh có tính mát, giúp thanh nhiệt, giải độc và hỗ trợ tiêu hóa.",
    origin: "HTX Rau Sạch Yên Dũng",
    standard: "VietGAP"
  },

     305: {
   id: 305,
    name: "Rau ngót",
    image: "/images/raungot.jpg",
    price: 34000,
    unit: "kg",
    description: "Rau ngót tươi, lá xanh đậm, non mềm, vị ngọt thanh tự nhiên. Giàu vitamin A, C, canxi và chất xơ – giúp thanh nhiệt, giải độc, mát gan, lợi sữa và hỗ trợ tiêu hóa. Thích hợp nấu canh với thịt bằm, tôm, hoặc dùng trong món ăn truyền thống.",
    origin: "HTX Rau Sạch Yên Dũng",
    standard: "VietGAP"
  },

  306: {
   id: 306,
    name: "Đỗ cove",
    image: "https://www.hasfarmgreens.com/wp-content/uploads/2021/07/Dau-cove-4.jpg",
    price: 30000,
    unit: "kg",
    description: "Đỗ cô ve tươi, quả thẳng, non giòn, màu xanh sáng tự nhiên. Giàu chất xơ, vitamin A, C, K và khoáng chất – tốt cho tiêu hóa, tim mạch và làm đẹp da. Thích hợp để luộc, xào, hấp hoặc làm salad, món chay thanh đạm.",
    origin: "HTX Rau Sạch Yên Dũng",
    standard: "VietGAP"
  },

  307: {
   id: 307,
    name: "Dưa leo",
    image: "/images/dualeo.jpg",
    price: 28000,
    unit: "500gr",
    description: "Dưa leo tươi non, vỏ mỏng, ruột đặc, vị giòn mát tự nhiên. Giàu nước, vitamin C, kali và chất chống oxy hóa – giúp thanh nhiệt, đẹp da, hỗ trợ giảm cân và tốt cho tiêu hóa. Thích hợp ăn sống, làm salad, cuốn thịt, hoặc ép nước detox.",
    origin: "HTX Rau Sạch Yên Dũng",
    standard: "VietGAP"
  },

   308: {
    id: 308,
    name: "Cải xanh",
    image: "/images/caixanh.jpg",
    price: 28000,
    unit: "500gr",
    description: "Cải xanh tươi, lá to xanh đậm, thân giòn chắc, vị cay nhẹ đặc trưng. Giàu vitamin A, C, K, canxi và chất xơ – giúp thanh nhiệt, hỗ trợ tiêu hóa, bổ sung khoáng chất và tốt cho hệ miễn dịch. Phù hợp để luộc, xào, nấu canh hoặc muối dưa.",
    origin: "HTX Rau Sạch Yên Dũng",
    standard: "VietGAP"
  },

  309: {
    id: 309,
    name: "Bí xanh",
    image: "/images/bixanh.jpg",
    price: 30000,
    unit: "kg",
    description: "Bí xanh tươi, vỏ xanh nhạt, ruột đặc, ít hạt, vị ngọt thanh và mát. Giàu nước, chất xơ, vitamin C và khoáng chất – giúp giải nhiệt, lợi tiểu, hỗ trợ giảm cân và làm đẹp da. Thích hợp nấu canh, xào, luộc, hầm hoặc nấu nước uống thanh lọc cơ thể.",
    origin: "HTX Rau Sạch Yên Dũng",
    standard: "VietGAP"
  },

  310: {
    id:310,
    name: "Bí đỏ ",
    image: "/images/bido.jpg",
    price: 26000,
    unit: "kg",
    description: "Bí đỏ tươi, ruột vàng cam đậm, thịt chắc, vị bùi ngọt tự nhiên. Giàu beta-carotene (tiền vitamin A), vitamin C, E, sắt và chất xơ – tốt cho thị lực, hỗ trợ trí não, tăng cường miễn dịch và đẹp da. Dễ chế biến: hầm, nấu cháo, làm súp, hấp hoặc chiên giòn.",
    origin: "HTX Rau Sạch Yên Dũng",
    standard: "VietGAP"
  },

   311: {
     id: 311,
    name: "Rau cải bó xôi ",
    image: "/images/caiboxoi.jpg",
    price: 30000,
    unit: "500gr",
    description: "Cải bó xôi tươi, lá xanh đậm, mềm mướt, vị thanh nhẹ. Là nguồn cung cấp dồi dào sắt, canxi, vitamin A, C, K và chất chống oxy hóa – giúp bổ máu, tăng đề kháng, tốt cho xương khớp và làm đẹp da. Thích hợp nấu canh, xào, làm sinh tố, salad hoặc món ăn dặm cho bé.",
    origin: "HTX Rau Sạch Yên Dũng",
    standard: "VietGAP"
  },



};

// Mock related products
const relatedProducts: Product[] = [
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
    id: 205,
    name: "Xà lách lolo xanh",
    image: "https://www.lottemart.vn/media/catalog/product/cache/0x0/2/0/2039900000009.jpg.webp",
    price: 30000,
    unit: "500gr",
    isOrganic: true
  },
{
id: 108,
name: "Khoai sọ",
image: "/images/khoaiso.jpg",
price: 25000 ,
originalPrice: 30000,
unit: "Kg",
discount: 10,
isHot: true,

},
  {
    id: 201,
    name: "Combo thực đơn 3 ngày cho 3 người ăn chay",
    image: "/images/combo.jpg",
    price: 150000,
    unit: "combo",
    isHot: true
  },
  {
    id: 203,
    name: "Combo 7 ngày cho 6 người ( 4 người lớn 2 trẻ nhỏ)",
    image: "/images/raucuqua.jpg",
    price: 300000,
    unit: "combo",
    isOrganic: true
  },
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
            <p>© 2025 GreenFresh. Tất cả các quyền được bảo lưu by LPM</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ProductDetail;
