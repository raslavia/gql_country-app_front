interface Extra {
  id: string;
  username: string;
  body?: string;
  createdAt?: string;
}
export interface CommentInterface {
  username: string,
  body: string;
  createdAt: string;
  id: string;
}
export interface PostInterface {
  id: string;
  username: string;
  body: string;
  createdAt?: string;
  likeCount?: string;
  commentCount?: string;
  likes?: Extra[];
  comments?: CommentInterface[];
}
