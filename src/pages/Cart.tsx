
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Plus, Minus, Trash2, ArrowRight } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import { Product } from '@/components/ProductCard';

interface CartItem extends Product {
  quantity: number;
  selected: boolean;
}

const Cart: React.FC = () => {
  const [cartItems, setCartItems] = useState<Record<number, CartItem>>({});
  const [voucher, setVoucher] = useState('');
  const [discount, setDiscount] = useState(0);
  const [isAllSelected, setIsAllSelected] = useState(false);
  
  // Load cart items from localStorage on component mount
  useEffect(() => {
    const cart = localStorage.getItem('greenfresh-cart');
    if (cart) {
      const parsedCart = JSON.parse(cart);
      // Add selected property to each item
      const cartWithSelection = Object.entries(parsedCart).reduce((acc, [key, value]) => {
        return {
          ...acc,
          [key]: {
            ...value as CartItem,
            selected: true
          }
        };
      }, {});
      setCartItems(cartWithSelection);
      setIsAllSelected(true);
    }
  }, []);
  
  // Save updated cart to localStorage
  useEffect(() => {
    if (Object.keys(cartItems).length > 0) {
      localStorage.setItem('greenfresh-cart', JSON.stringify(cartItems));
    }
  }, [cartItems]);
  
  // Update item quantity
  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    
    setCartItems(prev => ({
      ...prev,
      [id]: {
        ...prev[id],
        quantity: newQuantity
      }
    }));
  };
  
  // Remove item from cart
  const removeItem = (id: number) => {
    setCartItems(prev => {
      const newCart = { ...prev };
      delete newCart[id];
      return newCart;
    });
    
    toast({
      title: "Đã xóa sản phẩm",
      description: "Sản phẩm đã được xóa khỏi giỏ hàng."
    });
  };
  
  // Toggle item selection
  const toggleSelectItem = (id: number) => {
    setCartItems(prev => ({
      ...prev,
      [id]: {
        ...prev[id],
        selected: !prev[id].selected
      }
    }));
  };
  
  // Toggle select all items
  const toggleSelectAll = () => {
    const newSelectAll = !isAllSelected;
    setIsAllSelected(newSelectAll);
    
    setCartItems(prev => {
      const updatedCart = { ...prev };
      Object.keys(updatedCart).forEach(key => {
        updatedCart[parseInt(key)].selected = newSelectAll;
      });
      return updatedCart;
    });
  };
  
  // Check if all items are selected
  useEffect(() => {
    const allSelected = Object.values(cartItems).every(item => item.selected);
    setIsAllSelected(allSelected);
  }, [cartItems]);
  
  // Apply voucher
  const applyVoucher = () => {
    if (voucher.toUpperCase() === 'FRESH10') {
      setDiscount(10);
      toast({
        title: "Áp dụng voucher thành công",
        description: "Giảm 10% cho đơn hàng của bạn."
      });
    } else if (voucher.toUpperCase() === 'FRESH20') {
      setDiscount(20);
      toast({
        title: "Áp dụng voucher thành công",
        description: "Giảm 20% cho đơn hàng của bạn."
      });
    } else {
      setDiscount(0);
      toast({
        title: "Mã không hợp lệ",
        description: "Vui lòng kiểm tra lại mã voucher.",
        variant: "destructive"
      });
    }
  };
  
  // Calculate totals
  const calculateSubtotal = () => {
    return Object.values(cartItems)
      .filter(item => item.selected)
      .reduce((total, item) => total + item.price * item.quantity, 0);
  };
  
  const calculateDiscount = () => {
    return (calculateSubtotal() * discount) / 100;
  };
  
  const calculateTotal = () => {
    return calculateSubtotal() - calculateDiscount();
  };
  
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
  };
  
  // Checkout handler
  const handleCheckout = () => {
    if (Object.values(cartItems).some(item => item.selected)) {
      toast({
        title: "Đặt hàng thành công",
        description: "Cảm ơn bạn đã mua hàng tại GreenFresh!"
      });
      
      // Only remove selected items from cart
      setCartItems(prev => {
        const newCart = { ...prev };
        Object.keys(newCart).forEach(key => {
          if (newCart[parseInt(key)].selected) {
            delete newCart[parseInt(key)];
          }
        });
        return newCart;
      });
    } else {
      toast({
        title: "Vui lòng chọn sản phẩm",
        description: "Bạn chưa chọn sản phẩm nào để thanh toán.",
        variant: "destructive"
      });
    }
  };
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold mb-6">Giỏ hàng của bạn</h1>
        
        {Object.keys(cartItems).length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Cart items */}
            <div className="md:col-span-2">
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                {/* Header */}
                <div className="flex items-center p-4 bg-gray-50 border-b">
                  <div className="flex items-center">
                    <Checkbox 
                      checked={isAllSelected} 
                      onCheckedChange={toggleSelectAll} 
                      id="select-all"
                    />
                    <label htmlFor="select-all" className="ml-2 text-sm font-medium">
                      Chọn tất cả
                    </label>
                  </div>
                  <span className="ml-auto text-sm text-gray-500">
                    {Object.keys(cartItems).length} sản phẩm
                  </span>
                </div>
                
                {/* Cart items list */}
                <div className="divide-y">
                  {Object.values(cartItems).map((item) => (
                    <div key={item.id} className="flex p-4 items-center">
                      <Checkbox 
                        checked={item.selected} 
                        onCheckedChange={() => toggleSelectItem(item.id)} 
                        id={`item-${item.id}`}
                      />
                      
                      <div className="flex flex-1 ml-4">
                        <div className="h-16 w-16 rounded-md overflow-hidden">
                          <img 
                            src={item.image} 
                            alt={item.name} 
                            className="h-full w-full object-cover"
                          />
                        </div>
                        
                        <div className="ml-4 flex-1">
                          <Link to={`/product/${item.id}`} className="font-medium text-gray-800 hover:text-greenfresh-600">
                            {item.name}
                          </Link>
                          <p className="text-sm text-gray-500">{formatPrice(item.price)}/{item.unit}</p>
                        </div>
                        
                        <div className="flex items-center">
                          <div className="flex items-center border border-gray-300 rounded-md overflow-hidden">
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="h-8 w-8 rounded-none" 
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            >
                              <Minus className="h-3 w-3" />
                            </Button>
                            <div className="w-8 text-center text-sm">{item.quantity}</div>
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="h-8 w-8 rounded-none" 
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            >
                              <Plus className="h-3 w-3" />
                            </Button>
                          </div>
                          
                          <div className="ml-8 text-right">
                            <div className="font-medium">
                              {formatPrice(item.price * item.quantity)}
                            </div>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="h-8 w-8 text-gray-500 hover:text-red-500 p-0" 
                              onClick={() => removeItem(item.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Order summary */}
            <div className="md:col-span-1">
              <div className="bg-white rounded-lg shadow-sm p-4">
                <h2 className="font-bold text-lg mb-4">Tổng đơn hàng</h2>
                
                {/* Voucher */}
                <div className="mb-4">
                  <p className="text-sm mb-2">Mã giảm giá</p>
                  <div className="flex gap-2">
                    <Input 
                      placeholder="Nhập mã giảm giá" 
                      value={voucher} 
                      onChange={(e) => setVoucher(e.target.value)}
                    />
                    <Button 
                      variant="outline" 
                      onClick={applyVoucher}
                    >
                      Áp dụng
                    </Button>
                  </div>
                </div>
                
                <Separator className="my-4" />
                
                {/* Price details */}
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tạm tính</span>
                    <span>{formatPrice(calculateSubtotal())}</span>
                  </div>
                  
                  {discount > 0 && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Giảm giá ({discount}%)</span>
                      <span className="text-red-500">-{formatPrice(calculateDiscount())}</span>
                    </div>
                  )}
                  
                  <Separator className="my-2" />
                  
                  <div className="flex justify-between text-lg font-bold">
                    <span>Tổng cộng</span>
                    <span>{formatPrice(calculateTotal())}</span>
                  </div>
                </div>
                
                <Button 
                  className="w-full mt-6 bg-greenfresh-600 hover:bg-greenfresh-700"
                  size="lg"
                  onClick={handleCheckout}
                >
                  Thanh toán <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-lg shadow-sm">
            <div className="text-gray-400 mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </div>
            <h2 className="text-xl font-medium mb-4">Giỏ hàng trống</h2>
            <p className="text-gray-500 mb-6">Bạn chưa có sản phẩm nào trong giỏ hàng.</p>
            <Button asChild className="bg-greenfresh-600 hover:bg-greenfresh-700">
              <Link to="/">Tiếp tục mua sắm</Link>
            </Button>
          </div>
        )}
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

export default Cart;
