
import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import AdminLayout from '@/components/admin/AdminLayout';
import { useAuth } from '@/contexts/AuthContext';

interface Order {
  id: number;
  items: any[];
  customer: {
    fullName: string;
    phone: string;
  };
  status: string;
  total: number;
  createdAt: string;
}

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { userRole } = useAuth();

  const [totalOrders, setTotalOrders] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [recentOrders, setRecentOrders] = useState<Order[]>([]);
  const [chartData, setChartData] = useState<any[]>([]);
  
  useEffect(() => {
    // Redirect if not admin
    if (userRole !== 'admin') {
      navigate('/');
      return;
    }
    
    // Load orders from localStorage
    const ordersData = JSON.parse(localStorage.getItem('greenfresh-orders') || '[]');
    
    // Calculate total orders and revenue
    setTotalOrders(ordersData.length);
    const revenue = ordersData.reduce((sum: number, order: Order) => sum + order.total, 0);
    setTotalRevenue(revenue);
    
    // Get recent orders
    const recent = [...ordersData].sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    ).slice(0, 5);
    setRecentOrders(recent);
    
    // Prepare chart data - Last 7 days
    const last7Days = Array.from({ length: 7 }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - i);
      return date;
    }).reverse();
    
    const chartDataByDay = last7Days.map(date => {
      const day = date.toLocaleDateString('vi-VN', { weekday: 'short' });
      const dayStr = date.toISOString().split('T')[0];
      
      const dayOrders = ordersData.filter((order: Order) => 
        order.createdAt.split('T')[0] === dayStr
      );
      
      const dayRevenue = dayOrders.reduce((sum: number, order: Order) => sum + order.total, 0);
      
      return {
        day,
        revenue: dayRevenue
      };
    });
    
    setChartData(chartDataByDay);
    
  }, [userRole, navigate]);
  
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
  };
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <AdminLayout>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
        
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Tổng đơn hàng
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{totalOrders}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Doanh thu
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-greenfresh-600">{formatPrice(totalRevenue)}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Sản phẩm đã bán
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">42</div>
            </CardContent>
          </Card>
        </div>
        
        {/* Revenue Chart */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Doanh thu 7 ngày qua</CardTitle>
            <CardDescription>Biểu đồ doanh thu theo ngày</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis 
                    tickFormatter={(value) => 
                      new Intl.NumberFormat('vi-VN', {
                        notation: 'compact',
                        compactDisplay: 'short',
                        currency: 'VND'
                      }).format(value)
                    } 
                  />
                  <Tooltip 
                    formatter={(value) => [formatPrice(Number(value)), 'Doanh thu']}
                  />
                  <Bar dataKey="revenue" fill="#4ade80" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        {/* Recent Orders */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Đơn hàng gần đây</CardTitle>
              <CardDescription>Danh sách các đơn hàng mới nhất</CardDescription>
            </div>
            <Link to="/admin/orders" className="text-sm text-greenfresh-600 hover:underline">Xem tất cả</Link>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4">Mã đơn</th>
                    <th className="text-left py-3 px-4">Khách hàng</th>
                    <th className="text-left py-3 px-4">Thời gian</th>
                    <th className="text-right py-3 px-4">Giá trị</th>
                    <th className="text-center py-3 px-4">Trạng thái</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {recentOrders.map((order) => (
                    <tr key={order.id} className="hover:bg-muted/50">
                      <td className="py-3 px-4"># {order.id}</td>
                      <td className="py-3 px-4">
                        <div>{order.customer.fullName}</div>
                        <div className="text-sm text-gray-500">{order.customer.phone}</div>
                      </td>
                      <td className="py-3 px-4">{formatDate(order.createdAt)}</td>
                      <td className="py-3 px-4 text-right font-medium">{formatPrice(order.total)}</td>
                      <td className="py-3 px-4">
                        <div className="flex justify-center">
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            order.status === 'pending' 
                              ? 'bg-yellow-100 text-yellow-800' 
                              : order.status === 'delivered' 
                                ? 'bg-green-100 text-green-800'
                                : 'bg-blue-100 text-blue-800'
                          }`}>
                            {order.status === 'pending' ? 'Chờ xử lý' : 
                             order.status === 'delivered' ? 'Đã giao' : 'Đang giao'}
                          </span>
                        </div>
                      </td>
                    </tr>
                  ))}
                  
                  {recentOrders.length === 0 && (
                    <tr>
                      <td colSpan={5} className="py-6 text-center text-gray-500">
                        Chưa có đơn hàng nào
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
