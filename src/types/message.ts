export interface MessageWithRelations {
  id: string;
  content: string;
  type: string;
  userId: string;
  userName?: string | null;
  userImage?: string | null;
  roomId: string;
  createdAt: Date;
  user?: {
    id: string;
    email: string;
    image: string | null;
  };
}
