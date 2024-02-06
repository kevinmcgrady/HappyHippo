'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import { trpc } from '@/trpc/client';

type PaymentStatusProps = {
  orderEmail: string;
  orderId: string;
  isPaid: boolean;
};

export const PaymentStatus = ({
  isPaid,
  orderEmail,
  orderId,
}: PaymentStatusProps) => {
  const router = useRouter();

  const { data } = trpc.payment.pollOrderStatus.useQuery(
    { orderId },
    {
      enabled: isPaid === false,
      refetchInterval: (data) => (data?.isPaid ? false : 1000),
    },
  );

  useEffect(() => {
    if (data?.isPaid) router.refresh();
  }, [data?.isPaid, router]);

  return (
    <div className='mt-16 grid grid-cols-2 gap-x-4 text-sm text-gray-600'>
      <div>
        <p className='font-medium text-gray-900'>Shipping To</p>
        <p className=''>{orderEmail}</p>
      </div>

      <div>
        <p className='font-medium text-gray-900'>Order Status</p>
        <p>{isPaid ? 'Payment successfull' : 'Pending payment'}</p>
      </div>
    </div>
  );
};
