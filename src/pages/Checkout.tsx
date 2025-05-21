
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';
import { toast } from '@/components/ui/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { Product } from '@/components/ProductCard';
import { useNotifications } from '@/hooks/useNotifications';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { hanoiDistricts, District, Ward } from '@/data/hanoi-districts';

interface CartItem extends Product {
  quantity: number;
  selected: boolean;
}

export interface Order {
  id: number;
  items: CartItem[];
  customer: OrderDetails;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  total: number;
  createdAt: string;
}

interface OrderDetails {
  fullName: string;
  phone: string;
  address: string;
  city: string;
  district: string;
  ward: string;
  note: string;
  paymentMethod: 'cod' | 'banking';
}

const Checkout = () => {
  const navigate = useNavigate();
  const { isAuthenticated, currentUser } = useAuth();
  const { addNotification } = useNotifications();
  
  const [cartItems, setCartItems] = useState<Record<number, CartItem>>({});
  const [selectedItems, setSelectedItems] = useState<CartItem[]>([]);
  const [orderDetails, setOrderDetails] = useState<OrderDetails>({
    fullName: '',
    phone: '',
    address: '',
    city: 'Hà Nội', // Default to Hanoi
    district: '',
    ward: '',
    note: '',
    paymentMethod: 'cod'
  });
  
  const [availableWards, setAvailableWards] = useState<Ward[]>([]);
  const [selectedDistrict, setSelectedDistrict] = useState<District | null>(null);
  
  // Load cart items from localStorage
  useEffect(() => {
    if (!isAuthenticated) {
      toast({
        title: "Yêu cầu đăng nhập",
        description: "Vui lòng đăng nhập để tiến hành thanh toán.",
        variant: "destructive",
      });
      navigate('/login');
      return;
    }
    
    const cart = localStorage.getItem('greenfresh-cart');
    if (!cart) {
      navigate('/cart');
      return;
    }
    
    const parsedCart = JSON.parse(cart);
    setCartItems(parsedCart);
    
    // Filter only selected items
    const selected = Object.values(parsedCart).filter((item: CartItem) => item.selected);
    
    if (selected.length === 0) {
      toast({
        title: "Giỏ hàng trống",
        description: "Vui lòng chọn sản phẩm để thanh toán.",
        variant: "destructive",
      });
      navigate('/cart');
      return;
    }
    
    setSelectedItems(selected as CartItem[]);
    
    // Pre-fill user information if available
    if (currentUser) {
      setOrderDetails(prev => ({
        ...prev,
        fullName: currentUser.name,
        city: 'Hà Nội' // Default to Hanoi
      }));
    }
  }, [isAuthenticated, navigate, currentUser]);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setOrderDetails(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleDistrictChange = (value: string) => {
    const district = hanoiDistricts.find(d => d.id === value);
    if (district) {
      setSelectedDistrict(district);
      setAvailableWards(district.wards);
      setOrderDetails(prev => ({
        ...prev,
        district: district.name,
        ward: '' // Reset ward when district changes
      }));
    }
  };
  
  const handleWardChange = (value: string) => {
    const ward = availableWards.find(w => w.id === value);
    if (ward) {
      setOrderDetails(prev => ({
        ...prev,
        ward: ward.name
      }));
    }
  };
  
  const handlePaymentMethodChange = (value: string) => {
    setOrderDetails(prev => ({
      ...prev,
      paymentMethod: value as 'cod' | 'banking'
    }));
  };
  
  const calculateSubtotal = () => {
    return selectedItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };
  
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
  };
  
  const handleSubmitOrder = () => {
    // Validate form
    const requiredFields = ['fullName', 'phone', 'address', 'city', 'district', 'ward'];
    const missingFields = requiredFields.filter(field => !orderDetails[field as keyof OrderDetails]);
    
    if (missingFields.length > 0) {
      toast({
        title: "Thông tin chưa đầy đủ",
        description: "Vui lòng điền đầy đủ thông tin giao hàng.",
        variant: "destructive",
      });
      return;
    }
    
    if (!orderDetails.phone.match(/^[0-9]{10}$/)) {
      toast({
        title: "Số điện thoại không hợp lệ",
        description: "Vui lòng nhập số điện thoại 10 chữ số.",
        variant: "destructive",
      });
      return;
    }
    
    // Create order
    const orderId = Date.now();
    const order: Order = {
      id: orderId,
      items: selectedItems,
      customer: orderDetails,
      status: 'pending',
      total: calculateSubtotal(),
      createdAt: new Date().toISOString(),
    };
    
    // Save order to localStorage
    const existingOrders = JSON.parse(localStorage.getItem('greenfresh-orders') || '[]');
    existingOrders.push(order);
    localStorage.setItem('greenfresh-orders', JSON.stringify(existingOrders));
    
    // Save user orders by userId if authenticated
    if (currentUser && currentUser.id) {
      const userOrdersKey = `greenfresh-user-orders-${currentUser.id}`;
      const userOrders = JSON.parse(localStorage.getItem(userOrdersKey) || '[]');
      userOrders.push(order);
      localStorage.setItem(userOrdersKey, JSON.stringify(userOrders));
    }
    
    // Create and save notification for admin
    const adminNotification = {
      id: Date.now(),
      type: 'order',
      title: `Đơn hàng mới #${orderId}`,
      message: `Đơn hàng mới từ ${orderDetails.fullName} với tổng giá trị ${formatPrice(calculateSubtotal())}`,
      isRead: false,
      createdAt: new Date().toISOString(),
    };
    
    const existingNotifications = JSON.parse(localStorage.getItem('greenfresh-notifications') || '[]');
    existingNotifications.unshift(adminNotification);
    localStorage.setItem('greenfresh-notifications', JSON.stringify(existingNotifications));
    
    // Create notification for user
    if (currentUser) {
      addNotification({
        type: 'order',
        title: `Đơn hàng #${orderId} đã đặt thành công`,
        message: `Cảm ơn bạn đã đặt hàng. Đơn hàng của bạn đang được xử lý.`,
        orderId: orderId
      });
    }
    
    // Remove purchased items from cart
    const newCart = { ...cartItems };
    selectedItems.forEach(item => {
      delete newCart[item.id];
    });
    localStorage.setItem('greenfresh-cart', JSON.stringify(newCart));
    
    // Show detailed success toast notification
    toast({
      title: "Đặt hàng thành công!",
      description: (
        <div className="mt-2">
          <p><strong>Mã đơn hàng:</strong> #{orderId}</p>
          <p><strong>Tổng tiền:</strong> {formatPrice(calculateSubtotal())}</p>
          <p><strong>Phương thức thanh toán:</strong> {orderDetails.paymentMethod === 'cod' ? 'Thanh toán khi nhận hàng' : 'Chuyển khoản ngân hàng'}</p>
          <p className="mt-1 text-sm">Chi tiết đơn hàng được gửi trong phần Thông báo.</p>
        </div>
      ),
    });
    
    // Redirect to homepage after a short delay
    setTimeout(() => {
      navigate('/');
    }, 3000);
  };
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold mb-6">Thanh toán</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Shipping Information */}
          <div className="md:col-span-2 space-y-6">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold mb-4">Thông tin giao hàng</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="fullName">Họ và tên <span className="text-red-500">*</span></Label>
                  <Input
                    id="fullName"
                    name="fullName"
                    value={orderDetails.fullName}
                    onChange={handleInputChange}
                    placeholder="Nguyễn Văn A"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="phone">Số điện thoại <span className="text-red-500">*</span></Label>
                  <Input
                    id="phone"
                    name="phone"
                    value={orderDetails.phone}
                    onChange={handleInputChange}
                    placeholder="0912345678"
                  />
                </div>
                
                <div className="md:col-span-2 space-y-2">
                  <Label htmlFor="address">Địa chỉ <span className="text-red-500">*</span></Label>
                  <Input
                    id="address"
                    name="address"
                    value={orderDetails.address}
                    onChange={handleInputChange}
                    placeholder="Số nhà, tên đường"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="city">Tỉnh/Thành phố</Label>
                  <Input
                    id="city"
                    name="city"
                    value={orderDetails.city}
                    disabled
                    className="bg-gray-100"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="district">Quận/Huyện <span className="text-red-500">*</span></Label>
                  <Select onValueChange={handleDistrictChange}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Chọn quận/huyện" />
                    </SelectTrigger>
                    <SelectContent>
                      {hanoiDistricts.map((district) => (
                        <SelectItem key={district.id} value={district.id}>
                          {district.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="ward">Phường/Xã <span className="text-red-500">*</span></Label>
                  <Select 
                    onValueChange={handleWardChange} 
                    disabled={!selectedDistrict}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Chọn phường/xã" />
                    </SelectTrigger>
                    <SelectContent>
                      {availableWards.map((ward) => (
                        <SelectItem key={ward.id} value={ward.id}>
                          {ward.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="md:col-span-2 space-y-2">
                  <Label htmlFor="note">Ghi chú</Label>
                  <Textarea
                    id="note"
                    name="note"
                    value={orderDetails.note}
                    onChange={handleInputChange}
                    placeholder="Ghi chú về đơn hàng (thời gian giao, cách thức giao...)"
                    className="min-h-[80px]"
                  />
                </div>
              </div>
            </div>
            
            {/* Payment Method */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold mb-4">Phương thức thanh toán</h2>
              
              <RadioGroup
                value={orderDetails.paymentMethod}
                onValueChange={handlePaymentMethodChange}
                className="space-y-3"
              >
                <div className="flex items-center space-x-2 border p-3 rounded-md">
                  <RadioGroupItem value="cod" id="cod" />
                  <Label htmlFor="cod" className="flex-grow cursor-pointer">
                    <div className="font-medium">Thanh toán khi nhận hàng (COD)</div>
                    <div className="text-sm text-gray-500">Thanh toán bằng tiền mặt khi nhận hàng</div>
                  </Label>
                </div>
                
                <div className="flex items-center space-x-2 border p-3 rounded-md">
                  <RadioGroupItem value="banking" id="banking" />
                  <Label htmlFor="banking" className="flex-grow cursor-pointer">
                    <div className="font-medium">Chuyển khoản ngân hàng</div>
                    <div className="text-sm text-gray-500">Chuyển khoản trước khi giao hàng</div>
                  </Label>
                </div>
              </RadioGroup>
              
              {orderDetails.paymentMethod === 'banking' && (
                <div className="mt-4 p-4 bg-gray-50 rounded-md border text-sm">
                  <p className="font-medium">Thông tin chuyển khoản:</p>
                  <p>Ngân hàng: Vietcombank</p>
                  <p>Số tài khoản: 1234567890</p>
                  <p>Chủ tài khoản: CÔNG TY TNHH GREEN FRESH</p>
                  <p className="mt-2 text-greenfresh-600">Nội dung: [Họ tên] - [Số điện thoại]</p>
                </div>
              )}
            </div>
          </div>
          
          {/* Order Summary */}
          <div className="md:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-4">
              <h2 className="text-lg font-semibold mb-4">Tóm tắt đơn hàng</h2>
              
              <div className="space-y-3">
                {selectedItems.map(item => (
                  <div key={item.id} className="flex justify-between py-2">
                    <div className="flex items-start">
                      <div className="text-sm font-medium flex-grow">
                        {item.name} <span className="text-gray-500">x {item.quantity}</span>
                      </div>
                    </div>
                    <div className="font-medium">
                      {formatPrice(item.price * item.quantity)}
                    </div>
                  </div>
                ))}
              </div>
              
              <Separator className="my-4" />
              
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span>Tạm tính:</span>
                  <span className="font-medium">{formatPrice(calculateSubtotal())}</span>
                </div>
                
                <div className="flex justify-between">
                  <span>Phí vận chuyển:</span>
                  <span className="font-medium">Miễn phí</span>
                </div>
                
                <Separator className="my-2" />
                
                <div className="flex justify-between text-lg font-bold">
                  <span>Tổng cộng:</span>
                  <span className="text-greenfresh-600">{formatPrice(calculateSubtotal())}</span>
                </div>
              </div>
              
              <Button 
                className="w-full mt-6 bg-greenfresh-600 hover:bg-greenfresh-700"
                size="lg"
                onClick={handleSubmitOrder}
              >
                Đặt hàng
              </Button>
            </div>
          </div>
        </div>
      </main>
      
      <footer className="bg-greenfresh-800 text-white mt-12">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center text-greenfresh-300">
            <p>© 2023 GreenFresh. Tất cả các quyền được bảo lưu.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Checkout;
