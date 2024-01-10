'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowRight, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { ZodError } from 'zod';

import { Icons } from '@/components/Icons';
import { Button, buttonVariants } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { trpc } from '@/trpc/client';
import {
  AuthCredentialsValidator,
  TAuthCredentialsValidator,
} from '@/validators/auth.validator';

export default function SignUpPage() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TAuthCredentialsValidator>({
    resolver: zodResolver(AuthCredentialsValidator),
  });

  const { mutate, isLoading } = trpc.auth.createPayloadUser.useMutation({
    onError: (error) => {
      if (error.data?.code === 'CONFLICT') {
        toast.error('This email is already taken, sign in instead');
        return;
      }
      if (error instanceof ZodError) {
        toast.error(error.issues[0].message);
        return;
      }

      toast.error('There was a problem. Please try again.');
    },
    onSuccess: ({ sentToEmail }) => {
      toast.success(`Verification email sent to ${sentToEmail}.`);
      router.push(`/verify-email?to=${sentToEmail}`);
    },
  });

  const onSubmit = ({ email, password }: TAuthCredentialsValidator) => {
    mutate({ email, password });
  };

  return (
    <>
      <div className='container relative flex pt-20 flex-col items-center justify-center lg:px-0'>
        <div className='mt-auto flex w-full flex-col justify-center space-x-6 sm:w-[350px]'>
          <div className='flex flex-col items-center space-y-2 text-center'>
            <Icons.logo className='w-20 h-20' />
            <h1 className='text-2xl font-bold'>Create an account</h1>
            <Link
              href='/sign-in'
              className={buttonVariants({
                variant: 'link',
                className: 'gap-1.5',
              })}
            >
              Already have an account? Sign-in
              <ArrowRight className='h-4 w-4' />
            </Link>
          </div>

          <div className='grid gap-6'>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className='grid gap-2'>
                <div className='grid gap-1 py-2'>
                  <Label htmlFor='email'>Email</Label>
                  <Input
                    {...register('email')}
                    placeholder='you@example.com'
                    className={cn({
                      'focus-visible:ring-red-500': errors.email,
                    })}
                  />
                  {errors.email && (
                    <p className='text-sm text-red-500 mt-1'>
                      {errors.email.message}
                    </p>
                  )}
                </div>
                <div className='grid gap-1 py-2'>
                  <Label htmlFor='password'>Password</Label>
                  <Input
                    {...register('password')}
                    type='password'
                    placeholder='Password'
                    className={cn({
                      'focus-visible:ring-red-500': errors.password,
                    })}
                  />
                  {errors.password && (
                    <p className='text-sm text-red-500 mt-1'>
                      {errors.password.message}
                    </p>
                  )}
                </div>
                <Button disabled={isLoading}>
                  {isLoading ? (
                    <Loader2 className='w-6 h-6 animate-spin' />
                  ) : (
                    'Create Account'
                  )}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
