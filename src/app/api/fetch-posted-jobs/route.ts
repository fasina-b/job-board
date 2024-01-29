// fetch-posted-jobs.ts

import { NextApiRequest, NextApiResponse } from 'next';
import { db } from '@/lib/db';
import NextAuth, { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { NextResponse } from 'next/server';

export async function handler(req: NextApiRequest) {
  const session = await getServerSession();

    try {
      const jobs = await db.job.findMany({
        where: {
          createdByEmail: session?.user?.email,
        },
      });

      return NextResponse.json({ jobs }, { status: 200 });
    } catch (error) {
      console.error('Error fetching jobs:', error);
      return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
 
}

export { handler as GET};
