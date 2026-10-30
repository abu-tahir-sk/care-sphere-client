export interface IUser {
  id: string;
  name: string;
  email: string;
  photoURL: string;
  bio?: string;
  role: string;
  createdAt?: string;
}

export type EventType =
  | 'Cleanup'
  | 'Plantation'
  | 'Donation'
  | 'Food Drive'
  | 'Healthcare'
  | 'Education'
  | 'Winter Relief'
  | 'Other';

export interface IEvent {
  _id: string;
  title: string;
  description: string;
  eventType: EventType;
  thumbnail: string;
  location: string;
  eventDate: string;
  organizerEmail: string;
  organizerName: string;
  organizerPhoto?: string;
  participantsCount: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface IJoinedEventItem {
  joinId: string;
  joinedAt: string;
  event: IEvent;
}

export interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
  data?: T;
  count?: number;
  isJoined?: boolean;
  token?: string;
  user?: IUser;
}

