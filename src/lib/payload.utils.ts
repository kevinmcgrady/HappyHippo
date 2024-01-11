import { ReadonlyRequestCookies } from 'next/dist/server/web/spec-extension/adapters/request-cookies';
import { NextRequest } from 'next/server';

import { User } from '../payload-types';

export const getServersideUser = async (
  cookies: NextRequest['cookies'] | ReadonlyRequestCookies,
) => {
  const token = cookies.get('payload-token')?.value;
  const userRequest = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/api/users/me`,
    {
      headers: {
        Authorization: `JWT ${token}`,
      },
    },
  );

  const { user } = (await userRequest.json()) as { user: User | null };

  return { user };
};
