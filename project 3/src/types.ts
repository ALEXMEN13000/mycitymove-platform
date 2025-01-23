export interface Review {
  id: string;
  userId: string;
  activityId: string;
  clubId: string;
  rating: number;
  comment: string;
  createdAt: string;
}

export interface Activity {
  id: string;
  name: string;
  clubId: string;
  clubName: string;
  schedule: Schedule[];
  averageRating: number;
  totalReviews: number;
}

export interface Schedule {
  id: string;
  dayOfWeek: string;
  startTime: string;
  endTime: string;
}

export interface Notification {
  id: string;
  activityId: string;
  type: 'schedule_change' | 'new_slot' | 'promotion';
  message: string;
  createdAt: string;
  read: boolean;
}