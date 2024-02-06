import { authRouter } from './routers/auth.router';
import { paymentRouter } from './routers/payment.router';
import { productRouter } from './routers/products.router';
import { router } from './trpc';

export const appRouter = router({
  auth: authRouter,
  payment: paymentRouter,
  products: productRouter,
});

export type AppRouter = typeof appRouter;
