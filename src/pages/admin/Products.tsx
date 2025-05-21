
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Table, TableBody, TableCell, TableHead, 
  TableHeader, TableRow 
} from '@/components/ui/table';
import { 
  Dialog, DialogContent, DialogDescription, 
  DialogFooter, DialogHeader, DialogTitle 
} from '@/components/ui/dialog';
import { Plus, Pencil, Trash2, Search } from 'lucide-react';
import AdminLayout from '@/components/admin/AdminLayout';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/components/ui/use-toast';

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
  unit: string;
  available: boolean;
  description?: string;
}

const productsData: Product[] = [
  {
    id: 1,
    name: "Cải bó xôi Organic",
    price: 35000,
    image: "https://cdn.pixabay.com/photo/2018/08/30/20/47/spinach-3643523_1280.jpg",
    category: "Rau lá",
    unit: "bó",
    available: true,
    description: "Rau cải bó xôi organic được trồng theo tiêu chuẩn VietGAP, không sử dụng thuốc trừ sâu."
  },
  {
    id: 2,
    name: "Cà rốt Đà Lạt",
    price: 28000,
    image: "https://cdn.pixabay.com/photo/2018/06/23/15/16/carrots-3493237_1280.jpg",
    category: "Củ",
    unit: "kg",
    available: true,
    description: "Cà rốt Đà Lạt tươi ngon, giàu vitamin A và chất xơ."
  },
  {
    id: 3,
    name: "Táo Envy New Zealand",
    price: 150000,
    image: "https://cdn.pixabay.com/photo/2014/02/01/17/28/apple-256261_1280.jpg",
    category: "Trái cây",
    unit: "kg",
    available: false,
    description: "Táo Envy nhập khẩu từ New Zealand, giòn ngọt và đậm đà hương vị."
  },
  {
    id: 4,
    name: "Xà lách lô lô xanh",
    price: 22000,
    image: "https://cdn.pixabay.com/photo/2018/10/03/22/08/green-3722767_1280.jpg",
    category: "Rau lá",
    unit: "bó",
    available: true,
    description: "Xà lách lô lô xanh tươi ngon, không thuốc trừ sâu."
  },
  {
    id: 5,
    name: "Bông cải xanh",
    price: 48000,
    image: "https://cdn.pixabay.com/photo/2016/03/05/19/02/broccoli-1238250_1280.jpg",
    category: "Rau lá",
    unit: "kg",
    available: true,
    description: "Bông cải xanh tươi ngon, giàu dinh dưỡng."
  }
];

const AdminProducts = () => {
  const navigate = useNavigate();
  const { userRole } = useAuth();

  const [products, setProducts] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<Product | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  
  // Form state
  const [formData, setFormData] = useState<Partial<Product>>({
    name: '',
    price: 0,
    image: '',
    category: '',
    unit: '',
    available: true,
    description: ''
  });
  
  useEffect(() => {
    // Redirect if not admin
    if (userRole !== 'admin') {
      navigate('/');
      return;
    }
    
    // Try to load products from localStorage or use initial data
    const storedProducts = localStorage.getItem('greenfresh-products');
    if (storedProducts) {
      setProducts(JSON.parse(storedProducts));
    } else {
      setProducts(productsData);
      localStorage.setItem('greenfresh-products', JSON.stringify(productsData));
    }
  }, [userRole, navigate]);
  
  // Filter products by search query
  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.category.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'number' ? parseFloat(value) : value
    }));
  };
  
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      available: e.target.checked
    }));
  };
  
  const handleAddProduct = () => {
    setCurrentProduct(null);
    setFormData({
      name: '',
      price: 0,
      image: '',
      category: '',
      unit: '',
      available: true,
      description: ''
    });
    setIsDialogOpen(true);
  };
  
  const handleEditProduct = (product: Product) => {
    setCurrentProduct(product);
    setFormData({
      name: product.name,
      price: product.price,
      image: product.image,
      category: product.category,
      unit: product.unit,
      available: product.available,
      description: product.description || ''
    });
    setIsDialogOpen(true);
  };
  
  const handleDeleteProduct = (product: Product) => {
    setCurrentProduct(product);
    setIsDeleteDialogOpen(true);
  };
  
  const confirmDelete = () => {
    if (!currentProduct) return;
    
    const newProducts = products.filter(p => p.id !== currentProduct.id);
    setProducts(newProducts);
    localStorage.setItem('greenfresh-products', JSON.stringify(newProducts));
    
    toast({
      title: "Đã xóa sản phẩm",
      description: `Sản phẩm "${currentProduct.name}" đã được xóa.`
    });
    
    setIsDeleteDialogOpen(false);
    setCurrentProduct(null);
  };
  
  const handleSubmit = () => {
    // Validate form
    if (!formData.name || !formData.price || !formData.image || !formData.category || !formData.unit) {
      toast({
        title: "Thiếu thông tin",
        description: "Vui lòng điền đầy đủ thông tin sản phẩm.",
        variant: "destructive"
      });
      return;
    }
    
    if (currentProduct) {
      // Update existing product
      const updatedProducts = products.map(p => 
        p.id === currentProduct.id ? { ...p, ...formData } : p
      );
      setProducts(updatedProducts);
      localStorage.setItem('greenfresh-products', JSON.stringify(updatedProducts));
      
      toast({
        title: "Đã cập nhật sản phẩm",
        description: `Sản phẩm "${formData.name}" đã được cập nhật.`
      });
    } else {
      // Add new product
      const newProduct = {
        id: Math.max(0, ...products.map(p => p.id)) + 1,
        name: formData.name!,
        price: formData.price!,
        image: formData.image!,
        category: formData.category!,
        unit: formData.unit!,
        available: formData.available!,
        description: formData.description
      };
      
      const updatedProducts = [...products, newProduct];
      setProducts(updatedProducts);
      localStorage.setItem('greenfresh-products', JSON.stringify(updatedProducts));
      
      toast({
        title: "Đã thêm sản phẩm mới",
        description: `Sản phẩm "${formData.name}" đã được thêm.`
      });
    }
    
    setIsDialogOpen(false);
  };
  
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
  };

  return (
    <AdminLayout>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Quản lý sản phẩm</h1>
          
          <Button onClick={handleAddProduct} className="bg-greenfresh-600 hover:bg-greenfresh-700">
            <Plus className="h-4 w-4 mr-2" />
            Thêm sản phẩm
          </Button>
        </div>
        
        <Card className="mb-6">
          <CardHeader className="pb-3">
            <CardTitle>Danh sách sản phẩm</CardTitle>
            <div className="flex mt-2">
              <div className="relative w-full max-w-sm">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Tìm kiếm sản phẩm..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Sản phẩm</TableHead>
                    <TableHead>Danh mục</TableHead>
                    <TableHead>Đơn vị</TableHead>
                    <TableHead>Giá</TableHead>
                    <TableHead>Trạng thái</TableHead>
                    <TableHead className="text-right">Thao tác</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredProducts.map((product) => (
                    <TableRow key={product.id}>
                      <TableCell>
                        <div className="flex items-center">
                          <div className="w-10 h-10 rounded overflow-hidden mr-3">
                            <img
                              src={product.image}
                              alt={product.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="font-medium">{product.name}</div>
                        </div>
                      </TableCell>
                      <TableCell>{product.category}</TableCell>
                      <TableCell>{product.unit}</TableCell>
                      <TableCell>{formatPrice(product.price)}</TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          product.available 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {product.available ? 'Còn hàng' : 'Hết hàng'}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-slate-500"
                          onClick={() => handleEditProduct(product)}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-red-500"
                          onClick={() => handleDeleteProduct(product)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                  
                  {filteredProducts.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={6} className="h-32 text-center">
                        Không tìm thấy sản phẩm nào.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Add/Edit Product Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[550px]">
          <DialogHeader>
            <DialogTitle>
              {currentProduct ? 'Chỉnh sửa sản phẩm' : 'Thêm sản phẩm mới'}
            </DialogTitle>
            <DialogDescription>
              Điền đầy đủ thông tin sản phẩm vào form bên dưới.
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium">
                  Tên sản phẩm
                </label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Tên sản phẩm"
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="price" className="text-sm font-medium">
                  Giá (VNĐ)
                </label>
                <Input
                  id="price"
                  name="price"
                  type="number"
                  value={formData.price}
                  onChange={handleInputChange}
                  placeholder="Giá sản phẩm"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="image" className="text-sm font-medium">
                URL Hình ảnh
              </label>
              <Input
                id="image"
                name="image"
                value={formData.image}
                onChange={handleInputChange}
                placeholder="URL hình ảnh sản phẩm"
              />
            </div>
            
            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <label htmlFor="category" className="text-sm font-medium">
                  Danh mục
                </label>
                <Input
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  placeholder="Danh mục"
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="unit" className="text-sm font-medium">
                  Đơn vị
                </label>
                <Input
                  id="unit"
                  name="unit"
                  value={formData.unit}
                  onChange={handleInputChange}
                  placeholder="kg, bó, hộp..."
                />
              </div>
              
              <div className="flex items-end space-x-2 h-full pb-2">
                <input
                  type="checkbox"
                  id="available"
                  checked={formData.available}
                  onChange={handleCheckboxChange}
                  className="h-4 w-4 rounded border-gray-300"
                />
                <label htmlFor="available" className="text-sm font-medium">
                  Còn hàng
                </label>
              </div>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="description" className="text-sm font-medium">
                Mô tả
              </label>
              <Input
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Mô tả sản phẩm"
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Hủy
            </Button>
            <Button 
              onClick={handleSubmit} 
              className="bg-greenfresh-600 hover:bg-greenfresh-700"
            >
              {currentProduct ? 'Cập nhật' : 'Thêm mới'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="sm:max-w-[450px]">
          <DialogHeader>
            <DialogTitle>Xác nhận xóa sản phẩm</DialogTitle>
            <DialogDescription>
              Bạn có chắc chắn muốn xóa sản phẩm "{currentProduct?.name}"? Hành động này không thể hoàn tác.
            </DialogDescription>
          </DialogHeader>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Hủy
            </Button>
            <Button 
              variant="destructive" 
              onClick={confirmDelete}
            >
              Xóa
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
};

export default AdminProducts;
