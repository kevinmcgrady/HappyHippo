import { fetchRequestHandler } from '@trpc/server/adapters/fetch';

import { appRouter } from '@/trpc';

const handler = (req: Request) => {
  fetchRequestHandler({
    endpoint: '/api/trpc',
    req,
    router: appRouter,
    // @ts-ignore context passed from express middleware
    createContext: () => ({}),
  });
};

export { handler as GET, handler as POST };
