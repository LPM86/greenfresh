
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  ShoppingCart, 
  Bell, 
  Search, 
  Menu, 
  X,
  MessageSquare,
  Home
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [notificationCount, setNotificationCount] = useState(2);
  
  // Mock function - would be replaced with actual cart context later
  React.useEffect(() => {
    const cart = localStorage.getItem('greenfresh-cart');
    if (cart) {
      const parsedCart = JSON.parse(cart);
      setCartCount(Object.keys(parsedCart).length);
    }
  }, []);

  return (
    <header className="sticky top-0 z-10 bg-white shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <span className="text-xl font-bold text-greenfresh-600">Green<span className="text-greenfresh-500">Fresh</span></span>
          </Link>

          {/* Search bar - hidden on mobile */}
          <div className="hidden md:flex relative flex-1 mx-6 max-w-md">
            <Input 
              type="search" 
              placeholder="Tìm kiếm rau sạch..." 
              className="pl-10 pr-4 w-full" 
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          </div>

          {/* Navigation - hidden on mobile */}
          <nav className="hidden md:flex items-center space-x-2">
            <Link to="/">
              <Button variant="ghost" size="sm">
                <Home className="h-5 w-5 mr-1" /> Trang chủ
              </Button>
            </Link>
            <Link to="/chat">
              <Button variant="ghost" size="sm">
                <MessageSquare className="h-5 w-5 mr-1" /> Chat AI
              </Button>
            </Link>
            <Link to="/notifications">
              <Button variant="ghost" size="sm" className="relative">
                <Bell className="h-5 w-5 mr-1" /> Thông báo
                {notificationCount > 0 && (
                  <Badge className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center p-0 bg-orange-400">
                    {notificationCount}
                  </Badge>
                )}
              </Button>
            </Link>
            <Link to="/cart">
              <Button variant="ghost" size="sm" className="relative">
                <ShoppingCart className="h-5 w-5 mr-1" /> Giỏ hàng
                {cartCount > 0 && (
                  <Badge className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center p-0 bg-orange-400">
                    {cartCount}
                  </Badge>
                )}
              </Button>
            </Link>
          </nav>

          {/* Mobile menu button */}
          <div className="flex md:hidden">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-1"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Search bar - mobile only */}
        <div className="md:hidden py-2">
          <div className="relative">
            <Input 
              type="search" 
              placeholder="Tìm kiếm rau sạch..." 
              className="pl-10 pr-4 w-full" 
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="container mx-auto px-4 py-2">
            <nav className="flex flex-col space-y-2">
              <Link to="/" className="py-2 px-4 hover:bg-greenfresh-50 rounded-md flex items-center">
                <Home className="h-5 w-5 mr-2" /> Trang chủ
              </Link>
              <Link to="/chat" className="py-2 px-4 hover:bg-greenfresh-50 rounded-md flex items-center">
                <MessageSquare className="h-5 w-5 mr-2" /> Chat AI
              </Link>
              <Link to="/notifications" className="py-2 px-4 hover:bg-greenfresh-50 rounded-md flex items-center">
                <Bell className="h-5 w-5 mr-2" /> Thông báo
                {notificationCount > 0 && (
                  <Badge className="ml-auto bg-orange-400">{notificationCount}</Badge>
                )}
              </Link>
              <Link to="/cart" className="py-2 px-4 hover:bg-greenfresh-50 rounded-md flex items-center">
                <ShoppingCart className="h-5 w-5 mr-2" /> Giỏ hàng
                {cartCount > 0 && (
                  <Badge className="ml-auto bg-orange-400">{cartCount}</Badge>
                )}
              </Link>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
