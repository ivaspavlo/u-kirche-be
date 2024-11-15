import { Timestamp } from 'firebase-admin/firestore';

export interface IArticleReq {
  title: string;
  content: string;
  authorId: string;
}

export interface IArticleRes {
  id: string;
  title: string;
  content: string;
  authorId: string;
  createdAt: Timestamp;
}

export interface IArticleFirestore {
  title: string;
  content: string;
  authorId: string;
}
