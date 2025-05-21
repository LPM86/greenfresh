
import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  BarChart2, Package, ShoppingBag, Bell, 
  User, LogOut, ChevronLeft, ChevronRight 
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/components/ui/use-toast';

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { logout, currentUser } = useAuth();
  
  const handleLogout = () => {
    logout();
    toast({
      title: "Đăng xuất thành công",
      description: "Bạn đã đăng xuất khỏi hệ thống."
    });
    navigate('/login');
  };
  
  const isActive = (path: string) => location.pathname === path;
  
  const menuItems = [
    {
      title: 'Dashboard',
      icon: <BarChart2 className="h-5 w-5" />,
      path: '/admin/dashboard'
    },
    {
      title: 'Sản phẩm',
      icon: <Package className="h-5 w-5" />,
      path: '/admin/products'
    },
    {
      title: 'Đơn hàng',
      icon: <ShoppingBag className="h-5 w-5" />,
      path: '/admin/orders'
    }
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className={`bg-white border-r transition-all duration-300 ${sidebarCollapsed ? 'w-16' : 'w-64'}`}>
        <div className="h-16 border-b flex items-center justify-between px-4">
          {!sidebarCollapsed && (
            <Link to="/" className="font-bold text-xl text-greenfresh-600">
              GreenFresh
            </Link>
          )}
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-8 w-8"
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
          >
            {sidebarCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </Button>
        </div>
        
        <div className="py-4">
          <div className={`mb-6 px-4 ${sidebarCollapsed ? 'text-center' : ''}`}>
            <div className={`flex items-center ${sidebarCollapsed ? 'justify-center' : ''}`}>
              <div className="h-8 w-8 rounded-full bg-greenfresh-100 text-greenfresh-600 flex items-center justify-center">
                <User className="h-5 w-5" />
              </div>
              {!sidebarCollapsed && (
                <div className="ml-2">
                  <p className="text-sm font-medium">{currentUser?.name}</p>
                  <p className="text-xs text-gray-500">Admin</p>
                </div>
              )}
            </div>
          </div>
          
          <nav className="space-y-1 px-2">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center px-3 py-2 rounded-md ${
                  isActive(item.path) 
                    ? 'bg-greenfresh-50 text-greenfresh-600' 
                    : 'text-gray-600 hover:bg-gray-50'
                } ${sidebarCollapsed ? 'justify-center' : ''}`}
              >
                {item.icon}
                {!sidebarCollapsed && <span className="ml-3">{item.title}</span>}
              </Link>
            ))}
            
            <Link
              to="/"
              className="flex items-center px-3 py-2 rounded-md text-gray-600 hover:bg-gray-50"
            >
              <Bell className="h-5 w-5" />
              {!sidebarCollapsed && <span className="ml-3">Thông báo</span>}
            </Link>
            
            <Button
              variant="ghost"
              className={`w-full flex items-center px-3 py-2 rounded-md text-red-600 hover:bg-red-50 ${
                sidebarCollapsed ? 'justify-center' : 'justify-start'
              }`}
              onClick={handleLogout}
            >
              <LogOut className="h-5 w-5" />
              {!sidebarCollapsed && <span className="ml-3">Đăng xuất</span>}
            </Button>
          </nav>
        </div>
      </div>
      
      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="h-16 bg-white border-b flex items-center px-6">
          <h1 className="text-xl font-semibold">Admin Panel</h1>
          
          <div className="ml-auto flex items-center space-x-4">
            <Link to="/" className="text-sm text-greenfresh-600 hover:underline">
              Xem cửa hàng
            </Link>
          </div>
        </header>
        
        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
