
import { Navigate } from "react-router-dom";
import { useAuth, UserRole } from "@/contexts/AuthContext";
import { toast } from "@/components/ui/use-toast";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: UserRole;
}

const ProtectedRoute = ({ children, requiredRole }: ProtectedRouteProps) => {
  const { isAuthenticated, userRole } = useAuth();

  // Kiểm tra đăng nhập
  if (!isAuthenticated) {
    toast({
      title: "Yêu cầu đăng nhập",
      description: "Vui lòng đăng nhập để tiếp tục.",
      variant: "destructive",
    });
    return <Navigate to="/login" replace />;
  }

  // Kiểm tra role nếu được yêu cầu
  if (requiredRole && userRole !== requiredRole) {
    toast({
      title: "Không có quyền truy cập",
      description: "Bạn không có quyền truy cập vào trang này.",
      variant: "destructive",
    });
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
