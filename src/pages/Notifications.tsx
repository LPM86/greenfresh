
import React, { useState } from 'react';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

interface Notification {
  id: number;
  type: 'order' | 'promotion' | 'product';
  title: string;
  message: string;
  time: Date;
  isRead: boolean;
}

const Notifications: React.FC = () => {
  // Mock notification data
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: 1,
      type: 'order',
      title: 'Đơn hàng #12345 đã được xác nhận',
      message: 'Đơn hàng của bạn đã được xác nhận và đang chuẩn bị giao.',
      time: new Date(2023, 4, 15, 10, 30),
      isRead: false,
    },
    {
      id: 2,
      type: 'promotion',
      title: 'Flash Sale cuối tuần!',
      message: 'Giảm giá 20% cho tất cả các sản phẩm rau củ quả hữu cơ vào cuối tuần này.',
      time: new Date(2023, 4, 14, 9, 15),
      isRead: false,
    },
    {
      id: 3,
      type: 'product',
      title: 'Sản phẩm mới: Bơ Đà Lạt hữu cơ',
      message: 'Bơ Đà Lạt hữu cơ đã có mặt tại GreenFresh. Hãy nhanh tay mua ngay!',
      time: new Date(2023, 4, 13, 14, 45),
      isRead: true,
    },
    {
      id: 4,
      type: 'order',
      title: 'Đơn hàng #12340 đã được giao',
      message: 'Đơn hàng của bạn đã được giao thành công. Cảm ơn bạn đã mua sắm tại GreenFresh.',
      time: new Date(2023, 4, 12, 16, 20),
      isRead: true,
    },
    {
      id: 5,
      type: 'promotion',
      title: 'Mã giảm giá FRESH10',
      message: 'Nhập mã FRESH10 để được giảm 10% cho đơn hàng từ 200,000 VND.',
      time: new Date(2023, 4, 10, 8, 0),
      isRead: true,
    },
  ]);

  const markAsRead = (id: number) => {
    setNotifications(prev =>
      prev.map(notification => 
        notification.id === id ? { ...notification, isRead: true } : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev =>
      prev.map(notification => ({ ...notification, isRead: true }))
    );
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('vi-VN', { 
      year: 'numeric', 
      month: '2-digit', 
      day: '2-digit' 
    });
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('vi-VN', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const getTypeColor = (type: Notification['type']) => {
    switch (type) {
      case 'order':
        return 'bg-greenfresh-100 text-greenfresh-800';
      case 'promotion':
        return 'bg-orange-100 text-orange-800';
      case 'product':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeLabel = (type: Notification['type']) => {
    switch (type) {
      case 'order':
        return 'Đơn hàng';
      case 'promotion':
        return 'Khuyến mãi';
      case 'product':
        return 'Sản phẩm mới';
      default:
        return 'Thông báo';
    }
  };

  const filterNotifications = (type: string) => {
    if (type === 'all') {
      return notifications;
    }
    return notifications.filter(notification => notification.type === type);
  };

  const unreadCount = notifications.filter(notification => !notification.isRead).length;

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Thông báo
            {unreadCount > 0 && (
              <Badge className="ml-2 bg-orange-400">{unreadCount}</Badge>
            )}
          </h1>
          
          {unreadCount > 0 && (
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={markAllAsRead}
              className="text-greenfresh-600 hover:text-greenfresh-700"
            >
              Đánh dấu tất cả đã đọc
            </Button>
          )}
        </div>
        
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <Tabs defaultValue="all">
            <TabsList className="w-full border-b">
              <TabsTrigger value="all" className="flex-1">Tất cả</TabsTrigger>
              <TabsTrigger value="order" className="flex-1">Đơn hàng</TabsTrigger>
              <TabsTrigger value="promotion" className="flex-1">Khuyến mãi</TabsTrigger>
              <TabsTrigger value="product" className="flex-1">Sản phẩm mới</TabsTrigger>
            </TabsList>
            
            {['all', 'order', 'promotion', 'product'].map((tab) => (
              <TabsContent key={tab} value={tab} className="p-0">
                <div className="divide-y">
                  {filterNotifications(tab).length === 0 ? (
                    <div className="text-center py-8 text-gray-500">
                      Không có thông báo
                    </div>
                  ) : (
                    filterNotifications(tab).map((notification) => (
                      <div 
                        key={notification.id} 
                        className={`p-4 ${notification.isRead ? 'bg-white' : 'bg-greenfresh-50'}`}
                        onClick={() => markAsRead(notification.id)}
                      >
                        <div className="flex items-start">
                          <Badge className={`${getTypeColor(notification.type)} mr-3 mt-1`}>
                            {getTypeLabel(notification.type)}
                          </Badge>
                          
                          <div className="flex-1">
                            <h3 className={`font-medium ${notification.isRead ? 'text-gray-800' : 'text-greenfresh-700'}`}>
                              {notification.title}
                              {!notification.isRead && (
                                <span className="inline-block ml-2 w-2 h-2 rounded-full bg-greenfresh-500"></span>
                              )}
                            </h3>
                            <p className="text-gray-600 mt-1">{notification.message}</p>
                            <div className="text-xs text-gray-500 mt-2">
                              {formatDate(notification.time)} lúc {formatTime(notification.time)}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </TabsContent>
            ))}
          </Tabs>
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

export default Notifications;
