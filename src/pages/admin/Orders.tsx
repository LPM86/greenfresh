
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Select, SelectContent, SelectItem, 
  SelectTrigger, SelectValue 
} from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Table, TableBody, TableCell, TableHead, 
  TableHeader, TableRow 
} from '@/components/ui/table';
import { 
  Dialog, DialogContent, DialogDescription, DialogHeader, 
  DialogTitle, DialogFooter 
} from '@/components/ui/dialog';
import { Search, Eye } from 'lucide-react';
import AdminLayout from '@/components/admin/AdminLayout';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/components/ui/use-toast';

interface OrderItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface Customer {
  fullName: string;
  phone: string;
  address: string;
  city: string;
  district: string;
  ward: string;
  note?: string;
  paymentMethod: 'cod' | 'banking';
}

interface Order {
  id: number;
  items: OrderItem[];
  customer: Customer;
  status: 'pending' | 'processing' | 'shipping' | 'delivered' | 'cancelled';
  total: number;
  createdAt: string;
}

const AdminOrders = () => {
  const navigate = useNavigate();
  const { userRole } = useAuth();

  const [orders, setOrders] = useState<Order[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  useEffect(() => {
    // Redirect if not admin
    if (userRole !== 'admin') {
      navigate('/');
      return;
    }
    
    // Load orders from localStorage
    const storedOrders = localStorage.getItem('greenfresh-orders');
    if (storedOrders) {
      setOrders(JSON.parse(storedOrders));
    }
  }, [userRole, navigate]);
  
  // Filter orders by search query and status
  const filteredOrders = orders.filter(order => {
    const matchesSearch = 
      order.customer.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customer.phone.includes(searchQuery) ||
      order.id.toString().includes(searchQuery);
    
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });
  
  const handleViewOrder = (order: Order) => {
    setSelectedOrder(order);
    setIsDialogOpen(true);
  };
  
  const handleUpdateStatus = (newStatus: Order['status']) => {
    if (!selectedOrder) return;
    
    const updatedOrders = orders.map(o => 
      o.id === selectedOrder.id ? { ...o, status: newStatus } : o
    );
    
    setOrders(updatedOrders);
    localStorage.setItem('greenfresh-orders', JSON.stringify(updatedOrders));
    
    // Update selected order
    setSelectedOrder({ ...selectedOrder, status: newStatus });
    
    toast({
      title: "Đã cập nhật trạng thái",
      description: `Đơn hàng #${selectedOrder.id} đã được cập nhật thành "${getStatusText(newStatus)}".`
    });
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
  
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
  };
  
  const getStatusText = (status: Order['status']) => {
    switch (status) {
      case 'pending': return 'Chờ xử lý';
      case 'processing': return 'Đang xử lý';
      case 'shipping': return 'Đang giao hàng';
      case 'delivered': return 'Đã giao hàng';
      case 'cancelled': return 'Đã hủy';
      default: return status;
    }
  };
  
  const getStatusClass = (status: Order['status']) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'processing': return 'bg-blue-100 text-blue-800';
      case 'shipping': return 'bg-purple-100 text-purple-800';
      case 'delivered': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <AdminLayout>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">Quản lý đơn hàng</h1>
        
        <Card>
          <CardHeader className="pb-3">
            <CardTitle>Danh sách đơn hàng</CardTitle>
            
            <div className="flex flex-col sm:flex-row gap-4 mt-4">
              <div className="relative flex-grow max-w-md">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Tìm theo tên, số điện thoại, mã đơn..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              <Select 
                value={statusFilter} 
                onValueChange={setStatusFilter}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Trạng thái" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tất cả</SelectItem>
                  <SelectItem value="pending">Chờ xử lý</SelectItem>
                  <SelectItem value="processing">Đang xử lý</SelectItem>
                  <SelectItem value="shipping">Đang giao hàng</SelectItem>
                  <SelectItem value="delivered">Đã giao hàng</SelectItem>
                  <SelectItem value="cancelled">Đã hủy</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Mã đơn</TableHead>
                    <TableHead>Ngày tạo</TableHead>
                    <TableHead>Khách hàng</TableHead>
                    <TableHead>Tổng tiền</TableHead>
                    <TableHead>Trạng thái</TableHead>
                    <TableHead className="text-right">Thao tác</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredOrders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell className="font-medium">#{order.id}</TableCell>
                      <TableCell>{formatDate(order.createdAt)}</TableCell>
                      <TableCell>
                        <div>{order.customer.fullName}</div>
                        <div className="text-sm text-gray-500">{order.customer.phone}</div>
                      </TableCell>
                      <TableCell>{formatPrice(order.total)}</TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded-full text-xs ${getStatusClass(order.status)}`}>
                          {getStatusText(order.status)}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-slate-500"
                          onClick={() => handleViewOrder(order)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                  
                  {filteredOrders.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={6} className="h-32 text-center">
                        {orders.length === 0 
                          ? "Chưa có đơn hàng nào."
                          : "Không tìm thấy đơn hàng phù hợp với tìm kiếm."}
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Order Detail Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Chi tiết đơn hàng #{selectedOrder?.id}</DialogTitle>
            <DialogDescription>
              Thông tin chi tiết đơn hàng và tùy chọn cập nhật trạng thái.
            </DialogDescription>
          </DialogHeader>
          
          {selectedOrder && (
            <>
              <div className="grid gap-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Ngày đặt hàng</h3>
                    <p className="text-sm">{formatDate(selectedOrder.createdAt)}</p>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Trạng thái</h3>
                    <span className={`px-2 py-1 rounded-full text-xs ${getStatusClass(selectedOrder.status)}`}>
                      {getStatusText(selectedOrder.status)}
                    </span>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-2">Thông tin khách hàng</h3>
                  <div className="bg-gray-50 p-3 rounded-md text-sm">
                    <p><span className="font-medium">Họ tên:</span> {selectedOrder.customer.fullName}</p>
                    <p><span className="font-medium">Số điện thoại:</span> {selectedOrder.customer.phone}</p>
                    <p><span className="font-medium">Địa chỉ:</span> {selectedOrder.customer.address}, {selectedOrder.customer.ward}, {selectedOrder.customer.district}, {selectedOrder.customer.city}</p>
                    {selectedOrder.customer.note && (
                      <p><span className="font-medium">Ghi chú:</span> {selectedOrder.customer.note}</p>
                    )}
                    <p><span className="font-medium">Phương thức thanh toán:</span> {
                      selectedOrder.customer.paymentMethod === 'cod' 
                        ? 'Thanh toán khi nhận hàng' 
                        : 'Chuyển khoản ngân hàng'
                    }</p>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-2">Sản phẩm</h3>
                  <div className="border rounded-md overflow-hidden">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Sản phẩm</TableHead>
                          <TableHead>Đơn giá</TableHead>
                          <TableHead className="text-center">Số lượng</TableHead>
                          <TableHead className="text-right">Thành tiền</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {selectedOrder.items.map((item) => (
                          <TableRow key={item.id}>
                            <TableCell>
                              <div className="flex items-center">
                                <div className="w-10 h-10 rounded overflow-hidden mr-3">
                                  <img
                                    src={item.image}
                                    alt={item.name}
                                    className="w-full h-full object-cover"
                                  />
                                </div>
                                <div className="font-medium">{item.name}</div>
                              </div>
                            </TableCell>
                            <TableCell>{formatPrice(item.price)}</TableCell>
                            <TableCell className="text-center">{item.quantity}</TableCell>
                            <TableCell className="text-right">{formatPrice(item.price * item.quantity)}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </div>
                
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-md">
                  <span className="font-medium">Tổng cộng:</span>
                  <span className="font-bold text-greenfresh-600 text-lg">{formatPrice(selectedOrder.total)}</span>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-2">Cập nhật trạng thái</h3>
                  <div className="flex flex-wrap gap-2">
                    <Button 
                      size="sm" 
                      variant={selectedOrder.status === 'pending' ? 'default' : 'outline'}
                      onClick={() => handleUpdateStatus('pending')}
                      className={selectedOrder.status === 'pending' ? 'bg-greenfresh-600' : ''}
                    >
                      Chờ xử lý
                    </Button>
                    <Button 
                      size="sm" 
                      variant={selectedOrder.status === 'processing' ? 'default' : 'outline'}
                      onClick={() => handleUpdateStatus('processing')}
                      className={selectedOrder.status === 'processing' ? 'bg-greenfresh-600' : ''}
                    >
                      Đang xử lý
                    </Button>
                    <Button 
                      size="sm" 
                      variant={selectedOrder.status === 'shipping' ? 'default' : 'outline'}
                      onClick={() => handleUpdateStatus('shipping')}
                      className={selectedOrder.status === 'shipping' ? 'bg-greenfresh-600' : ''}
                    >
                      Đang giao hàng
                    </Button>
                    <Button 
                      size="sm" 
                      variant={selectedOrder.status === 'delivered' ? 'default' : 'outline'}
                      onClick={() => handleUpdateStatus('delivered')}
                      className={selectedOrder.status === 'delivered' ? 'bg-greenfresh-600' : ''}
                    >
                      Đã giao hàng
                    </Button>
                    <Button 
                      size="sm" 
                      variant={selectedOrder.status === 'cancelled' ? 'destructive' : 'outline'}
                      onClick={() => handleUpdateStatus('cancelled')}
                    >
                      Hủy đơn
                    </Button>
                  </div>
                </div>
              </div>
              
              <DialogFooter>
                <Button onClick={() => setIsDialogOpen(false)}>Đóng</Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
};

export default AdminOrders;
