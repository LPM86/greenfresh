
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { vi } from 'date-fns/locale';
import { 
  ShoppingBag, Bell, Tag, AlertTriangle, 
  Check, Trash2, FileText
} from 'lucide-react';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { useNotifications } from '@/hooks/useNotifications';

const Notifications = () => {
  const { notifications, markAsRead, markAllAsRead, unreadCount } = useNotifications();
  const [filter, setFilter] = useState<string>('all');

  // Filter notifications
  const filteredNotifications = filter === 'all' 
    ? notifications 
    : notifications.filter(n => n.type === filter);

  // Delete notification
  const deleteNotification = (id: number) => {
    const storedNotifications = JSON.parse(localStorage.getItem('greenfresh-notifications') || '[]');
    const updatedNotifications = storedNotifications.filter((n: any) => n.id !== id);
    localStorage.setItem('greenfresh-notifications', JSON.stringify(updatedNotifications));
    
    // Update state
    const newNotifications = notifications.filter(n => n.id !== id);
    toast({
      title: "Đã xóa thông báo",
      description: "Thông báo đã được xóa thành công."
    });
    // Force reload to update state
    window.location.reload();
  };

  // Delete all read notifications
  const deleteAllRead = () => {
    const storedNotifications = JSON.parse(localStorage.getItem('greenfresh-notifications') || '[]');
    const updatedNotifications = storedNotifications.filter((n: any) => !n.isRead);
    localStorage.setItem('greenfresh-notifications', JSON.stringify(updatedNotifications));
    
    toast({
      title: "Đã xóa thông báo",
      description: "Tất cả thông báo đã đọc đã được xóa thành công."
    });
    // Force reload to update state
    window.location.reload();
  };

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    
    // Less than 24 hours ago
    if (now.getTime() - date.getTime() < 24 * 60 * 60 * 1000) {
      return format(date, "'Hôm nay,' HH:mm", { locale: vi });
    }
    
    // Yesterday
    if (now.getTime() - date.getTime() < 48 * 60 * 60 * 1000) {
      return format(date, "'Hôm qua,' HH:mm", { locale: vi });
    }
    
    // More than 2 days ago
    return format(date, "dd/MM/yyyy, HH:mm", { locale: vi });
  };

  // Get icon by notification type
  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'order':
        return <ShoppingBag className="h-5 w-5 text-blue-500" />;
      case 'promotion':
        return <Tag className="h-5 w-5 text-purple-500" />;
      case 'product':
        return <Bell className="h-5 w-5 text-green-500" />;
      case 'system':
        return <AlertTriangle className="h-5 w-5 text-orange-500" />;
      default:
        return <Bell className="h-5 w-5 text-gray-500" />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold">Thông báo</h1>
            <p className="text-gray-500">
              {unreadCount > 0 ? `Bạn có ${unreadCount} thông báo chưa đọc` : 'Không có thông báo mới'}
            </p>
          </div>
          
          <div className="flex space-x-2 mt-4 md:mt-0">
            <Button 
              variant="outline" 
              size="sm"
              onClick={markAllAsRead}
              disabled={!notifications.some(n => !n.isRead)}
            >
              <Check className="h-4 w-4 mr-1" /> Đánh dấu tất cả đã đọc
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              onClick={deleteAllRead}
              disabled={!notifications.some(n => n.isRead)}
            >
              <Trash2 className="h-4 w-4 mr-1" /> Xóa thông báo đã đọc
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Filters */}
          <div className="md:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-4">
              <h2 className="font-semibold mb-3">Lọc thông báo</h2>
              <div className="space-y-2">
                <Button
                  variant={filter === 'all' ? 'default' : 'ghost'}
                  className={`w-full justify-start ${filter === 'all' ? 'bg-greenfresh-600 hover:bg-greenfresh-700' : ''}`}
                  onClick={() => setFilter('all')}
                >
                  <Bell className="h-4 w-4 mr-2" /> Tất cả
                </Button>
                <Button
                  variant={filter === 'order' ? 'default' : 'ghost'}
                  className={`w-full justify-start ${filter === 'order' ? 'bg-greenfresh-600 hover:bg-greenfresh-700' : ''}`}
                  onClick={() => setFilter('order')}
                >
                  <ShoppingBag className="h-4 w-4 mr-2" /> Đơn hàng
                </Button>
                <Button
                  variant={filter === 'promotion' ? 'default' : 'ghost'}
                  className={`w-full justify-start ${filter === 'promotion' ? 'bg-greenfresh-600 hover:bg-greenfresh-700' : ''}`}
                  onClick={() => setFilter('promotion')}
                >
                  <Tag className="h-4 w-4 mr-2" /> Khuyến mãi
                </Button>
                <Button
                  variant={filter === 'product' ? 'default' : 'ghost'}
                  className={`w-full justify-start ${filter === 'product' ? 'bg-greenfresh-600 hover:bg-greenfresh-700' : ''}`}
                  onClick={() => setFilter('product')}
                >
                  <Bell className="h-4 w-4 mr-2" /> Sản phẩm mới
                </Button>
                <Button
                  variant={filter === 'system' ? 'default' : 'ghost'}
                  className={`w-full justify-start ${filter === 'system' ? 'bg-greenfresh-600 hover:bg-greenfresh-700' : ''}`}
                  onClick={() => setFilter('system')}
                >
                  <AlertTriangle className="h-4 w-4 mr-2" /> Hệ thống
                </Button>
              </div>
            </div>
          </div>
          
          {/* Notifications list */}
          <div className="md:col-span-3">
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              {filteredNotifications.length > 0 ? (
                <div className="divide-y">
                  {filteredNotifications.map((notification) => (
                    <div 
                      key={notification.id} 
                      className={`p-4 ${notification.isRead ? 'bg-white' : 'bg-gray-50'}`}
                      onClick={() => markAsRead(notification.id)}
                    >
                      <div className="flex items-start">
                        <div className="mr-3 mt-1">
                          {getNotificationIcon(notification.type)}
                        </div>
                        
                        <div className="flex-grow">
                          <div className="flex items-start justify-between">
                            <h3 className={`font-medium ${notification.isRead ? 'text-gray-700' : 'text-gray-900'}`}>
                              {notification.title}
                            </h3>
                            <span className="text-xs text-gray-500">
                              {formatDate(notification.createdAt)}
                            </span>
                          </div>
                          <p className={`text-sm mt-1 ${notification.isRead ? 'text-gray-500' : 'text-gray-700'}`}>
                            {notification.message}
                          </p>
                          
                          {notification.type === 'order' && notification.orderId && (
                            <div className="mt-2">
                              <Link
                                to={`/order/${notification.orderId}`}
                                className="text-sm text-greenfresh-600 hover:underline flex items-center"
                              >
                                <FileText className="h-4 w-4 mr-1" />
                                Xem chi tiết đơn hàng
                              </Link>
                            </div>
                          )}
                          
                          {notification.type === 'promotion' && (
                            <div className="mt-2">
                              <Button 
                                variant="link" 
                                className="h-auto p-0 text-sm text-greenfresh-600"
                                asChild
                              >
                                <Link to="/">Mua sắm ngay</Link>
                              </Button>
                            </div>
                          )}
                        </div>
                        
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-gray-400 hover:text-red-500"
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteNotification(notification.id);
                          }}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="py-16 text-center">
                  <div className="text-gray-400 mb-4">
                    <Bell className="h-16 w-16 mx-auto" />
                  </div>
                  <h2 className="text-xl font-medium mb-2">Không có thông báo nào</h2>
                  <p className="text-gray-500">
                    {filter !== 'all' 
                      ? 'Không có thông báo nào phù hợp với bộ lọc hiện tại.' 
                      : 'Bạn không có thông báo nào.'}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      
      <footer className="bg-greenfresh-800 text-white mt-12">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center text-greenfresh-300">
            <p>© 2025 GreenFresh. Tất cả các quyền được bảo lưu.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Notifications;
