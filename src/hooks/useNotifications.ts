
import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';

export interface Notification {
  id: number;
  type: 'order' | 'promotion' | 'product' | 'system';
  title: string;
  message: string;
  isRead: boolean;
  createdAt: string;
  orderId?: number; // Optional order ID for order-related notifications
}

export function useNotifications() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const { currentUser } = useAuth();
  
  // Load notifications from localStorage
  useEffect(() => {
    const loadNotifications = () => {
      // For regular users, load user-specific notifications if logged in
      if (currentUser?.id) {
        const userNotificationsKey = `greenfresh-user-notifications-${currentUser.id}`;
        const storedNotifications = localStorage.getItem(userNotificationsKey);
        if (storedNotifications) {
          setNotifications(JSON.parse(storedNotifications));
          return;
        }
      }

      // For admin or fallback, load general notifications
      const storedNotifications = localStorage.getItem('greenfresh-notifications');
      if (storedNotifications) {
        setNotifications(JSON.parse(storedNotifications));
      }
    };

    loadNotifications();
    // Listen for storage changes
    window.addEventListener('storage', loadNotifications);
    
    return () => {
      window.removeEventListener('storage', loadNotifications);
    };
  }, [currentUser]);
  
  // Save notifications to localStorage when they change
  useEffect(() => {
    if (notifications.length > 0) {
      if (currentUser?.id) {
        const userNotificationsKey = `greenfresh-user-notifications-${currentUser.id}`;
        localStorage.setItem(userNotificationsKey, JSON.stringify(notifications));
      } else {
        localStorage.setItem('greenfresh-notifications', JSON.stringify(notifications));
      }
    }
  }, [notifications, currentUser]);
  
  // Count unread notifications
  const unreadCount = notifications.filter(n => !n.isRead).length;
  
  // Mark notification as read
  const markAsRead = (id: number) => {
    const updatedNotifications = notifications.map(n => 
      n.id === id ? { ...n, isRead: true } : n
    );
    setNotifications(updatedNotifications);
  };
  
  // Mark all as read
  const markAllAsRead = () => {
    const updatedNotifications = notifications.map(n => ({ ...n, isRead: true }));
    setNotifications(updatedNotifications);
  };
  
  // Add new notification
  const addNotification = (notification: Omit<Notification, 'id' | 'createdAt' | 'isRead'>) => {
    const newNotification: Notification = {
      ...notification,
      id: Date.now(),
      isRead: false,
      createdAt: new Date().toISOString()
    };
    
    const updatedNotifications = [newNotification, ...notifications];
    setNotifications(updatedNotifications);
    
    // Store in the appropriate localStorage key
    if (currentUser?.id) {
      const userNotificationsKey = `greenfresh-user-notifications-${currentUser.id}`;
      localStorage.setItem(userNotificationsKey, JSON.stringify(updatedNotifications));
    } else {
      localStorage.setItem('greenfresh-notifications', JSON.stringify(updatedNotifications));
    }
    
    return newNotification;
  };
  
  return {
    notifications,
    unreadCount,
    markAsRead,
    markAllAsRead,
    addNotification
  };
}
