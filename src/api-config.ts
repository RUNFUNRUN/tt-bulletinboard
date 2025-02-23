import { z } from 'zod';

export const apiBaseUrl = new URL(import.meta.env.VITE_API_BASE_URL);

export const threadSchema = z.object({
  id: z.string(),
  title: z.string(),
});

export const threadsSchema = z.array(threadSchema);

export const newThreadSchema = z.object({
  title: z.string().min(1, 'スレッドのタイトルを入力してください。'),
});

export const threadPostsSchema = z.object({
  threadId: z.string(),
  posts: z.array(
    z.object({
      id: z.string(),
      post: z.string(),
    }),
  ),
});

export const newThreadPostsSchema = z.object({
  post: z.string().min(1, '投稿内容を入力してください。'),
});
