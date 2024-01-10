'use client';

import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

import { Icons } from '@/components/Icons';
import { Button, buttonVariants } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

export default function SignUpPage() {
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
            <form onSubmit={() => null}>
              <div className='grid gap-2'>
                <div className='grid gap-1 py-2'>
                  <Label htmlFor='email'>Email</Label>
                  <Input
                    placeholder='you@example.com'
                    className={cn({
                      'focus-visible:ring-red-500': true,
                    })}
                  />
                </div>
                <div className='grid gap-1 py-2'>
                  <Label htmlFor='password'>Password</Label>
                  <Input
                    type='password'
                    placeholder='Password'
                    className={cn({
                      'focus-visible:ring-red-500': true,
                    })}
                  />
                </div>
                <Button>Sign up</Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
