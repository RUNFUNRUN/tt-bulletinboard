import { z } from 'zod';

export const apiBaseUrl = new URL(
  'https://railway.bulletinboard.techtrain.dev',
);

export const threadSchema = z.object({
  id: z.string(),
  title: z.string(),
});

export const threadsSchema = z.array(threadSchema);

export const newThreadSchema = z.object({
  title: z.string().min(1, 'スレッドのタイトルを入力してください。'),
});
