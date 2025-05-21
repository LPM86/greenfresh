
import { useState, useEffect } from 'react';

export interface Notification {
  id: number;
  type: 'order' | 'promotion' | 'product' | 'system';
  title: string;
  message: string;
  isRead: boolean;
  createdAt: string;
}

export function useNotifications() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  
  // Load notifications from localStorage
  useEffect(() => {
    const storedNotifications = localStorage.getItem('greenfresh-notifications');
    if (storedNotifications) {
      setNotifications(JSON.parse(storedNotifications));
    }
  }, []);
  
  // Count unread notifications
  const unreadCount = notifications.filter(n => !n.isRead).length;
  
  // Mark notification as read
  const markAsRead = (id: number) => {
    const updatedNotifications = notifications.map(n => 
      n.id === id ? { ...n, isRead: true } : n
    );
    setNotifications(updatedNotifications);
    localStorage.setItem('greenfresh-notifications', JSON.stringify(updatedNotifications));
  };
  
  // Mark all as read
  const markAllAsRead = () => {
    const updatedNotifications = notifications.map(n => ({ ...n, isRead: true }));
    setNotifications(updatedNotifications);
    localStorage.setItem('greenfresh-notifications', JSON.stringify(updatedNotifications));
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
    localStorage.setItem('greenfresh-notifications', JSON.stringify(updatedNotifications));
    
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
