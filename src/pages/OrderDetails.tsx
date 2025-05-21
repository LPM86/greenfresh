
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { format } from 'date-fns';
import { vi } from 'date-fns/locale';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { useAuth } from '@/contexts/AuthContext';
import { Order } from '@/pages/Checkout';
import { FileText, Check, ArrowLeft } from 'lucide-react';

const OrderDetails = () => {
  const { orderId } = useParams();
  const { currentUser } = useAuth();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrder = () => {
      setLoading(true);
      try {
        // If user is logged in, check their orders first
        if (currentUser?.id) {
          const userOrdersKey = `greenfresh-user-orders-${currentUser.id}`;
          const userOrders = JSON.parse(localStorage.getItem(userOrdersKey) || '[]');
          const foundOrder = userOrders.find((o: Order) => o.id === Number(orderId));
          if (foundOrder) {
            setOrder(foundOrder);
            setLoading(false);
            return;
          }
        }

        // Check in general orders
        const allOrders = JSON.parse(localStorage.getItem('greenfresh-orders') || '[]');
        const foundOrder = allOrders.find((o: Order) => o.id === Number(orderId));
        
        if (foundOrder) {
          setOrder(foundOrder);
        } else {
          setError('Không tìm thấy đơn hàng');
        }
      } catch (err) {
        setError('Đã xảy ra lỗi khi tải thông tin đơn hàng');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (orderId) {
      fetchOrder();
    }
  }, [orderId, currentUser]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
  };

  const formatDate = (dateString: string) => {
    return format(new Date(dateString), 'HH:mm, dd/MM/yyyy', { locale: vi });
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending': return 'Chờ xử lý';
      case 'processing': return 'Đang xử lý';
      case 'shipped': return 'Đang giao hàng';
      case 'delivered': return 'Đã giao hàng';
      case 'cancelled': return 'Đã hủy';
      default: return 'Không xác định';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'processing': return 'bg-blue-100 text-blue-800';
      case 'shipped': return 'bg-indigo-100 text-indigo-800';
      case 'delivered': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-6">
        <div className="mb-6">
          <Link to="/notifications" className="text-greenfresh-600 inline-flex items-center hover:underline">
            <ArrowLeft className="h-4 w-4 mr-1" />
            Quay lại danh sách thông báo
          </Link>
        </div>
        
        <h1 className="text-2xl font-bold flex items-center mb-6">
          <FileText className="mr-2 h-6 w-6 text-greenfresh-600" />
          Chi tiết đơn hàng {orderId && `#${orderId}`}
        </h1>

        {loading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-greenfresh-600"></div>
          </div>
        ) : error ? (
          <Alert variant="destructive" className="my-6">
            <AlertTitle>Lỗi</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        ) : order ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Order summary */}
            <div className="md:col-span-2 space-y-6">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex flex-wrap justify-between items-start mb-4">
                  <div>
                    <h2 className="text-lg font-semibold">Đơn hàng #{order.id}</h2>
                    <p className="text-gray-500 text-sm">{formatDate(order.createdAt)}</p>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                    {getStatusText(order.status)}
                  </div>
                </div>

                <h3 className="font-medium mb-2">Sản phẩm</h3>
                <div className="space-y-3 mb-4">
                  {order.items.map((item) => (
                    <div key={item.id} className="flex justify-between py-2 border-b">
                      <div className="flex items-start">
                        {item.image && (
                          <img 
                            src={item.image} 
                            alt={item.name}
                            className="w-14 h-14 object-cover rounded mr-3" 
                          />
                        )}
                        <div>
                          <div className="font-medium">{item.name}</div>
                          <div className="text-sm text-gray-500">
                            {formatPrice(item.price)} x {item.quantity}
                          </div>
                        </div>
                      </div>
                      <div className="font-medium">
                        {formatPrice(item.price * item.quantity)}
                      </div>
                    </div>
                  ))}
                </div>

                <Separator className="my-4" />
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Tạm tính</span>
                    <span>{formatPrice(order.total)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Phí vận chuyển</span>
                    <span>Miễn phí</span>
                  </div>
                  
                  <Separator className="my-2" />
                  
                  <div className="flex justify-between font-bold">
                    <span>Tổng cộng</span>
                    <span className="text-greenfresh-600">{formatPrice(order.total)}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Customer details */}
            <div className="md:col-span-1">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="font-semibold mb-4">Thông tin giao hàng</h3>
                <div className="space-y-2 text-sm">
                  <p><span className="font-medium">Người nhận:</span> {order.customer.fullName}</p>
                  <p><span className="font-medium">Số điện thoại:</span> {order.customer.phone}</p>
                  <p><span className="font-medium">Địa chỉ:</span> {order.customer.address}, {order.customer.ward}, {order.customer.district}, {order.customer.city}</p>
                  
                  {order.customer.note && (
                    <div className="mt-3">
                      <p className="font-medium">Ghi chú:</p>
                      <p className="italic">{order.customer.note}</p>
                    </div>
                  )}
                </div>

                <Separator className="my-4" />
                
                <h3 className="font-semibold mb-4">Phương thức thanh toán</h3>
                <div className="text-sm">
                  {order.customer.paymentMethod === 'cod' ? (
                    <div className="flex items-center">
                      <Check className="h-4 w-4 text-green-500 mr-1" />
                      Thanh toán khi nhận hàng (COD)
                    </div>
                  ) : (
                    <div className="flex items-center">
                      <Check className="h-4 w-4 text-green-500 mr-1" />
                      Chuyển khoản ngân hàng
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <Alert className="my-6">
            <AlertTitle>Không có dữ liệu</AlertTitle>
            <AlertDescription>Không thể tìm thấy thông tin đơn hàng</AlertDescription>
          </Alert>
        )}
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

export default OrderDetails;
