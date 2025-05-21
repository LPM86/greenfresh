
import React, { createContext, useState, useContext, useEffect } from 'react';

export type UserRole = 'user' | 'admin' | null;

interface User {
  id: number;
  name: string;
  email: string;
  role: UserRole;
}

interface AuthContextType {
  currentUser: User | null;
  isAuthenticated: boolean;
  userRole: UserRole;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock data cho user - trong dự án thực tế sẽ được thay thế bằng API
const MOCK_USERS = [
  {
    id: 1,
    name: 'Admin',
    email: 'admin@greenfresh.vn',
    password: 'admin123',
    role: 'admin' as UserRole
  },
  {
    id: 2,
    name: 'Người dùng',
    email: 'user@gmail.com',
    password: 'user123',
    role: 'user' as UserRole
  }
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [userRole, setUserRole] = useState<UserRole>(null);

  // Check localStorage khi khởi động
  useEffect(() => {
    const storedUser = localStorage.getItem('greenfresh-user');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setCurrentUser(user);
      setIsAuthenticated(true);
      setUserRole(user.role);
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Simulate API call
    const user = MOCK_USERS.find(u => u.email === email && u.password === password);
    
    if (user) {
      const { password: _, ...userWithoutPassword } = user;
      setCurrentUser(userWithoutPassword);
      setIsAuthenticated(true);
      setUserRole(user.role);
      
      // Lưu thông tin user vào localStorage
      localStorage.setItem('greenfresh-user', JSON.stringify(userWithoutPassword));
      return true;
    }
    
    return false;
  };

  const register = async (name: string, email: string, password: string): Promise<boolean> => {
    // Kiểm tra email đã tồn tại chưa
    const existingUser = MOCK_USERS.find(u => u.email === email);
    if (existingUser) {
      return false;
    }
    
    // Trong dự án thực tế, đây sẽ là API call để đăng ký
    const newUser = {
      id: MOCK_USERS.length + 1,
      name,
      email,
      role: 'user' as UserRole
    };
    
    setCurrentUser(newUser);
    setIsAuthenticated(true);
    setUserRole('user');
    
    // Lưu thông tin user vào localStorage
    localStorage.setItem('greenfresh-user', JSON.stringify(newUser));
    
    return true;
  };

  const logout = () => {
    setCurrentUser(null);
    setIsAuthenticated(false);
    setUserRole(null);
    localStorage.removeItem('greenfresh-user');
  };

  const value = {
    currentUser,
    isAuthenticated,
    userRole,
    login,
    register,
    logout
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
