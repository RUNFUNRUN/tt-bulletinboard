import { apiBaseUrl, newThreadSchema } from '@/api-config';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Link, useNavigate } from '@/router';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';
import { Loader2 } from 'lucide-react';
import { useId } from 'react';
import { useForm } from 'react-hook-form';
import type { z } from 'zod';

export const Home = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const newThreadId = useId();

  const form = useForm<z.infer<typeof newThreadSchema>>({
    resolver: zodResolver(newThreadSchema),
    defaultValues: {
      title: '',
    },
  });

  const onSubmit = async (newThread: z.infer<typeof newThreadSchema>) => {
    try {
      await fetch(new URL('/threads', apiBaseUrl), {
        method: 'POST',
        body: JSON.stringify(newThread),
      });
      await queryClient.invalidateQueries({ queryKey: ['threads'] });
      navigate('/');
    } catch (e) {
      console.log(e);
    }
  };

  const isSubmitting = form.formState.isSubmitting;

  return (
    <>
      <h1 className='text-2xl font-bold py-4'>スレッド新規作成</h1>
      <div className='space-y-4'>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} id={newThreadId}>
            <FormField
              control={form.control}
              name='title'
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      className='md:text-lg bg-white'
                      placeholder='スレッドタイトル'
                    />
                  </FormControl>
                  <FormMessage className='text-red-500' />
                </FormItem>
              )}
            />
          </form>
        </Form>
        <div className='flex gap-12 justify-end'>
          <Link to='/' className='underline text-blue-500 text-xl my-auto'>
            Topに戻る
          </Link>
          <Button
            type='submit'
            form={newThreadId}
            className='w-32 h-10 text-xl'
            disabled={isSubmitting}
          >
            {isSubmitting ? <Loader2 className='animate-spin' /> : '作成'}
          </Button>
        </div>
      </div>
    </>
  );
};

export default Home;
