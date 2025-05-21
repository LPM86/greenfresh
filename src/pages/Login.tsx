
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { toast } from '@/components/ui/use-toast';
import Header from '@/components/Header';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const { login, isAuthenticated, userRole } = useAuth();
  const navigate = useNavigate();

  // Nếu đã đăng nhập, chuyển về trang chủ hoặc admin dashboard
  React.useEffect(() => {
    if (isAuthenticated) {
      if (userRole === 'admin') {
        navigate('/admin/dashboard');
      } else {
        navigate('/');
      }
    }
  }, [isAuthenticated, navigate, userRole]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast({
        title: "Lỗi đăng nhập",
        description: "Vui lòng nhập đầy đủ email và mật khẩu.",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      const success = await login(email, password);
      
      if (success) {
        toast({
          title: "Đăng nhập thành công",
          description: "Chào mừng bạn quay trở lại GreenFresh!",
        });
      } else {
        toast({
          title: "Đăng nhập thất bại",
          description: "Email hoặc mật khẩu không chính xác.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Đã xảy ra lỗi",
        description: "Không thể đăng nhập. Vui lòng thử lại sau.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow flex items-center justify-center bg-gray-50 py-12 px-4">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-gray-900">Đăng nhập</h1>
            <p className="text-sm text-gray-500 mt-2">
              Đăng nhập để mua sắm và theo dõi đơn hàng
            </p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
              />
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between">
                <Label htmlFor="password">Mật khẩu</Label>
                <Link to="/forgot-password" className="text-xs text-greenfresh-600 hover:underline">
                  Quên mật khẩu?
                </Link>
              </div>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
              />
            </div>
            
            <Button 
              type="submit" 
              className="w-full bg-greenfresh-600 hover:bg-greenfresh-700"
              disabled={isLoading}
            >
              {isLoading ? "Đang xử lý..." : "Đăng nhập"}
            </Button>
          </form>
          
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <Separator className="w-full" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-2 text-gray-500">Hoặc</span>
              </div>
            </div>
            
            <div className="mt-6 text-center text-sm">
              Bạn chưa có tài khoản?{" "}
              <Link to="/register" className="font-medium text-greenfresh-600 hover:underline">
                Đăng ký ngay
              </Link>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t text-center text-xs text-gray-500">
            <p>Thông tin đăng nhập demo:</p>
            <p className="mt-1">Admin: admin@greenfresh.vn / admin123</p>
            <p>User: user@gmail.com / user123</p>
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

export default Login;
