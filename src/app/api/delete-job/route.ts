// delete-job.ts

import { NextApiRequest, NextApiResponse } from 'next';
import { db } from '@/lib/db';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';

export async function handler(req: NextRequest) {
  const session = await getServerSession();

    try {
      const searchParams = req.nextUrl.searchParams;
      const id = searchParams.get('id');
      console.log('Received request with jobId:', id); // Add this line for debugging


      if (!id) {
        return NextResponse.json({ message: 'Job ID is required for deletion'}, { status: 400 });
      }


      // Make sure the job belongs to the logged-in user
      const job = await db.job.findUnique({
        where: {
          id: Number(id),
        },
      });

      if (!job || job.createdByEmail !== session?.user?.email) {
      return NextResponse.json({ message: 'UNAUTHORIZED'}, { status: 500 });
      }

      // Delete the job
      await db.job.delete({
        where: {
          id: Number(id),
        },
      });

      return NextResponse.json({ message: 'Job Deleted sucessfully'}, { status: 200 });
    } catch (error) {
      console.error('Error deleting job:', error);
      return NextResponse.json({ message: 'Internal server error'}, { status: 500 });
    }
}
export { handler as DELETE };
