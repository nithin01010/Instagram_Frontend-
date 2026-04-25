import type { userBrief } from "./UserBrief";

export interface PostTy {
  id: string;
  user: userBrief;
  caption: string;
  media_url: string;
  media_type: string;
  created_at: string;
  is_deleted: boolean;
  updated_at: string;
  likes_count: number;
  views: number;
}
