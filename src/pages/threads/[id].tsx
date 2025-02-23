import {
  apiBaseUrl,
  newThreadPostsSchema,
  threadPostsSchema,
} from '@/api-config';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { useParams } from '@/router';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Loader2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import type { z } from 'zod';

const Home = () => {
  const params = useParams('/threads/:id');
  const id = params.id;
  const queryClient = useQueryClient();

  const { data: thread } = useQuery({
    queryKey: [`thread-${id}`],
    queryFn: async () => {
      const res = await fetch(new URL(`/threads/${id}/posts`, apiBaseUrl));
      return threadPostsSchema.safeParse(await res.json());
    },
  });

  const form = useForm<z.infer<typeof newThreadPostsSchema>>({
    resolver: zodResolver(newThreadPostsSchema),
    defaultValues: {
      post: '',
    },
  });

  const onSubmit = async (newThread: z.infer<typeof newThreadPostsSchema>) => {
    try {
      await fetch(new URL(`/threads/${id}/posts`, apiBaseUrl), {
        method: 'POST',
        body: JSON.stringify(newThread),
      });
      await queryClient.refetchQueries({ queryKey: [`thread-${id}`] });
      form.reset();
    } catch (e) {
      console.log(e);
    }
  };

  const isSubmitting = form.formState.isSubmitting;

  return (
    <>
      <h1 className='text-2xl font-bold py-4'>コメント一覧</h1>
      <div className='flex gap-20'>
        <div className='w-full space-y-2'>
          {thread?.data?.posts.map((post) => {
            return (
              <Card key={post.id}>
                <CardContent className='whitespace-pre-wrap'>
                  {post.post}
                </CardContent>
              </Card>
            );
          })}
        </div>
        <div className='w-1/2'>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
              <FormField
                control={form.control}
                name='post'
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Textarea
                        {...field}
                        className='md:text-lg bg-white'
                        placeholder='投稿しよう！'
                        rows={3}
                      />
                    </FormControl>
                    <FormMessage className='text-red-500' />
                  </FormItem>
                )}
              />
              <Button
                type='submit'
                className='text-xl w-full h-10'
                disabled={isSubmitting}
              >
                {isSubmitting ? <Loader2 className='animate-spin' /> : '投稿'}
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </>
  );
};

export default Home;
