import { NextRequest, NextResponse } from 'next/server';

import { getServersideUser } from './lib/payload.utils';

export async function middleware(req: NextRequest) {
  const { nextUrl, cookies } = req;
  const { user } = await getServersideUser(cookies);

  if (user && ['/sign-in', '/sign-up'].includes(nextUrl.pathname)) {
    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_SERVER_URL}/`);
  }

  return NextResponse.next();
}
