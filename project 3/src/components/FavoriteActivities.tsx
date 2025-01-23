import React from 'react';
import { Heart, Star, Bell, Clock } from 'lucide-react';
import { Activity } from '../types';

interface FavoriteActivitiesProps {
  activities: Activity[];
  onRemoveFavorite: (activityId: string) => void;
}

export function FavoriteActivities({ activities, onRemoveFavorite }: FavoriteActivitiesProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {activities.map((activity) => (
        <div key={activity.id} className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-xl font-semibold mb-1">
                <a
                  href={`/activity/${activity.id}`}
                  className="text-blue-600 hover:underline"
                >
                  {activity.name}
                </a>
              </h3>
              <a
                href={`/club/${activity.clubId}`}
                className="text-gray-600 hover:underline text-sm"
              >
                {activity.clubName}
              </a>
            </div>
            <button
              onClick={() => onRemoveFavorite(activity.id)}
              className="p-2 text-red-500 hover:text-red-600"
              title="Remove from favorites"
            >
              <Heart className="fill-current" size={24} />
            </button>
          </div>

          <div className="flex items-center mb-4">
            <Star className="text-yellow-400 fill-current" size={20} />
            <span className="ml-1 text-gray-700">
              {activity.averageRating.toFixed(1)}/5
            </span>
            <span className="text-gray-500 text-sm ml-2">
              ({activity.totalReviews} reviews)
            </span>
          </div>

          <div className="space-y-2 mb-4">
            <h4 className="font-medium flex items-center">
              <Clock size={16} className="mr-2" /> Upcoming Classes
            </h4>
            {activity.schedule.slice(0, 3).map((slot) => (
              <div key={slot.id} className="text-sm text-gray-600 ml-6">
                {slot.dayOfWeek}: {slot.startTime} - {slot.endTime}
              </div>
            ))}
            {activity.schedule.length > 3 && (
              <a
                href={`/activity/${activity.id}#schedule`}
                className="text-sm text-blue-600 hover:underline ml-6"
              >
                View all times
              </a>
            )}
          </div>

          <div className="flex items-center text-sm text-gray-600">
            <Bell size={16} className="mr-2" />
            <span>Notifications enabled</span>
          </div>
        </div>
      ))}
    </div>
  );
}