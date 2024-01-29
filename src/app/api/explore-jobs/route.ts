import { db } from '@/lib/db';
import { NextApiRequest } from 'next';
import { NextRequest, NextResponse } from 'next/server';

export default async function handler(req: NextApiRequest) {
  try {
    const jobs = await db.job.findMany();

    return NextResponse.json({ jobs }, { status: 200 });
  } catch (error) {
    console.error('Error fetching jobs:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
  
  }
  export { handler as GET };
