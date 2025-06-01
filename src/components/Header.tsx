
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Bell, ShoppingCart, Search, Menu, User, LogOut, Settings, Package, BarChart2 } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useNotifications } from '@/hooks/useNotifications';
import { useMobile } from '@/hooks/use-mobile';

const Header: React.FC = () => {
  const location = useLocation();
  const { isMobile } = useMobile();
  const [showMenu, setShowMenu] = useState(false);
  const [cartItemCount, setCartItemCount] = useState(0);
  
  const { isAuthenticated, currentUser, userRole, logout } = useAuth();
  const { unreadCount } = useNotifications();

  // Update cart count
  useEffect(() => {
    const updateCartCount = () => {
      const cart = localStorage.getItem('greenfresh-cart');
      if (cart) {
        const parsedCart = JSON.parse(cart);
        setCartItemCount(Object.keys(parsedCart).length);
      }
    };
    
    updateCartCount();
    
    // Listen to storage events to update the cart count when it changes
    window.addEventListener('storage', updateCartCount);
    
    return () => {
      window.removeEventListener('storage', updateCartCount);
    };
  }, []);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Menu Button */}
          <div className="flex items-center">
            {isMobile && (
              <Button variant="ghost" size="icon" onClick={toggleMenu} className="mr-2">
                <Menu className="h-5 w-5" />
              </Button>
            )}
            <Link to="/" className="text-2xl font-bold text-greenfresh-600">
              <img  src='/images/logo-removebg-preview.png' alt="Logo GreenFresh" width={85} />
            </Link>
          </div>

          {/* Search bar - hidden on mobile */}
          {!isMobile && (
            <div className="flex-1 max-w-md mx-4">
              <div className="relative">
                <Search className="absolute left-2.5 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Tìm kiếm rau củ, trái cây..."
                  className="w-full pl-9 bg-gray-50"
                />
              </div>
            </div>
          )}

          {/* Navigation - desktop */}
          {!isMobile && (
            <nav className="hidden md:flex space-x-6">
              <Link
                to="/"
                className={`text-sm font-medium ${
                  isActive('/') ? 'text-greenfresh-600' : 'text-gray-600 hover:text-greenfresh-500'
                }`}
              >
                Trang chủ
              </Link>
              
              <Link
                to="/chat"
                className={`text-sm font-medium ${
                  isActive('/chat') ? 'text-greenfresh-600' : 'text-gray-600 hover:text-greenfresh-500'
                }`}
              >
                Tư vấn AI
              </Link>
            </nav>
          )}

          {/* Icons */}
          <div className="flex items-center space-x-4">
            {/* Search icon - only on mobile */}
            {isMobile && (
              <Button variant="ghost" size="icon">
                <Search className="h-5 w-5" />
              </Button>
            )}
            
            {/* Cart */}
            <Link to="/cart" className="relative">
              <Button variant="ghost" size="icon">
                <ShoppingCart className="h-5 w-5" />
                {cartItemCount > 0 && (
                  <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center">
                    {cartItemCount}
                  </span>
                )}
              </Button>
            </Link>
            
            {/* Notifications */}
            <Link to="/notifications" className="relative">
              <Button variant="ghost" size="icon">
                <Bell className="h-5 w-5" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center">
                    {unreadCount > 9 ? '9+' : unreadCount}
                  </span>
                )}
              </Button>
            </Link>
            
            {/* User menu */}
            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="" />
                      <AvatarFallback className="bg-greenfresh-100 text-greenfresh-600">
                        {currentUser?.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>
                    <div className="flex flex-col">
                      <span>{currentUser?.name}</span>
                      <span className="text-xs text-muted-foreground">{currentUser?.email}</span>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  
                  {userRole === 'admin' && (
                    <>
                      <DropdownMenuItem asChild>
                        <Link to="/admin/dashboard" className="flex items-center cursor-pointer">
                          <BarChart2 className="mr-2 h-4 w-4" />
                          <span>Dashboard</span>
                        </Link>
                      </DropdownMenuItem>
                      
                      <DropdownMenuItem asChild>
                        <Link to="/admin/products" className="flex items-center cursor-pointer">
                          <Package className="mr-2 h-4 w-4" />
                          <span>Quản lý sản phẩm</span>
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                    </>
                  )}
                  
                
                  
                  <DropdownMenuItem asChild>
                    <Link to="/settings" className="flex items-center cursor-pointer">
                      <Settings className="mr-2 h-4 w-4" />
                      <span>Cài đặt</span>
                    </Link>
                  </DropdownMenuItem>
                  
                  <DropdownMenuSeparator />
                  
                  <DropdownMenuItem 
                    className="flex items-center cursor-pointer text-red-500 focus:text-red-500"
                    onClick={logout}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Đăng xuất</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button asChild className="bg-greenfresh-600 hover:bg-greenfresh-700">
                <Link to="/login">Đăng nhập</Link>
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobile && showMenu && (
        <div className="bg-white border-t py-2 px-4">
          <nav className="flex flex-col space-y-2">
            <Link
              to="/"
              className={`px-3 py-2 rounded-md ${
                isActive('/') ? 'bg-greenfresh-50 text-greenfresh-600' : 'text-gray-600 hover:bg-gray-50'
              }`}
              onClick={toggleMenu}
            >
              Trang chủ
            </Link>
            
            <Link
              to="/chat"
              className={`px-3 py-2 rounded-md ${
                isActive('/chat') ? 'bg-greenfresh-50 text-greenfresh-600' : 'text-gray-600 hover:bg-gray-50'
              }`}
              onClick={toggleMenu}
            >
              Tư vấn AI
            </Link>
            
            {userRole === 'admin' && (
              <>
                <div className="my-2 border-t pt-2">
                  <h3 className="px-3 text-sm font-semibold text-gray-500">Admin</h3>
                </div>
                <Link
                  to="/admin/dashboard"
                  className={`px-3 py-2 rounded-md ${
                    isActive('/admin/dashboard') ? 'bg-greenfresh-50 text-greenfresh-600' : 'text-gray-600 hover:bg-gray-50'
                  }`}
                  onClick={toggleMenu}
                >
                  Dashboard
                </Link>
                <Link
                  to="/admin/products"
                  className={`px-3 py-2 rounded-md ${
                    isActive('/admin/products') ? 'bg-greenfresh-50 text-greenfresh-600' : 'text-gray-600 hover:bg-gray-50'
                  }`}
                  onClick={toggleMenu}
                >
                  Quản lý sản phẩm
                </Link>
                <Link
                  to="/admin/orders"
                  className={`px-3 py-2 rounded-md ${
                    isActive('/admin/orders') ? 'bg-greenfresh-50 text-greenfresh-600' : 'text-gray-600 hover:bg-gray-50'
                  }`}
                  onClick={toggleMenu}
                >
                  Quản lý đơn hàng
                </Link>
              </>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
