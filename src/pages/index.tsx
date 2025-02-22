import { apiBaseUrl, threadsSchema } from '@/api-config';
import { Card, CardContent } from '@/components/ui/card';
import { useQuery } from '@tanstack/react-query';

const Home = () => {
  const { data: threads } = useQuery({
    queryKey: ['threads'],
    queryFn: async () => {
      const res = await fetch(new URL('/threads', apiBaseUrl));
      return threadsSchema.safeParse(await res.json());
    },
  });

  return (
    <>
      <h1 className='text-2xl font-bold py-4'>新着スレッド</h1>
      <div className='space-y-2'>
        {threads?.data?.map((thread) => {
          return (
            <Card key={thread.id}>
              <CardContent className='text-xl'>{thread.title}</CardContent>
            </Card>
          );
        })}
      </div>
    </>
  );
};

export default Home;
