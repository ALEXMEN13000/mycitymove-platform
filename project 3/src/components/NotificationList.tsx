import React from 'react';
import { Bell, Clock, Tag } from 'lucide-react';
import { Notification } from '../types';

interface NotificationListProps {
  notifications: Notification[];
  onMarkAsRead: (notificationId: string) => void;
}

export function NotificationList({ notifications, onMarkAsRead }: NotificationListProps) {
  const getIcon = (type: Notification['type']) => {
    switch (type) {
      case 'schedule_change':
        return <Clock className="text-blue-500" size={20} />;
      case 'new_slot':
        return <Clock className="text-green-500" size={20} />;
      case 'promotion':
        return <Tag className="text-purple-500" size={20} />;
      default:
        return <Bell className="text-gray-500" size={20} />;
    }
  };

  return (
    <div className="space-y-4">
      {notifications.map((notification) => (
        <div
          key={notification.id}
          className={`p-4 rounded-lg border ${
            notification.read ? 'bg-gray-50' : 'bg-white'
          }`}
        >
          <div className="flex items-start gap-3">
            {getIcon(notification.type)}
            <div className="flex-1">
              <p className="text-gray-900">{notification.message}</p>
              <p className="text-sm text-gray-500 mt-1">
                {new Date(notification.createdAt).toLocaleDateString()}
              </p>
            </div>
            {!notification.read && (
              <button
                onClick={() => onMarkAsRead(notification.id)}
                className="text-sm text-blue-600 hover:text-blue-800"
              >
                Mark as read
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}