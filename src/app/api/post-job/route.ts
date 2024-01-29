import { NextApiRequest, NextApiResponse } from 'next/index';
import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import z from 'zod';
import { CustomUser } from '@/lib/types';
import { getSession, useSession } from 'next-auth/react';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';


const invalid_type_error = 'Invalid type provided for this field';
const required_error = 'This field cannot be blank';

export const PostJobSchema = z.object({
  title: z.string({ invalid_type_error, required_error }).min(1, 'Value is required'),
  salary: z.string({ invalid_type_error, required_error }).min(1, 'Value is required'),
  company: z.string({ invalid_type_error, required_error }).min(1, 'Value is required'),
  description: z.string({ invalid_type_error, required_error }).min(1, 'Value is required'),
  experience: z.string({ invalid_type_error, required_error }).min(1, 'Value is required'),
  job_type: z.string().refine(value => value === 'fulltime' || value === 'parttime' || value === 'internship' || value === 'contract', { message: 'Job type' }),
  job_area: z.string({ invalid_type_error, required_error }).min(1, 'Value is required'),

});

export async function handler(req: Request, res: NextApiResponse) {
  try {

    const body = await req.json();
    const { title, salary, company, description, job_area, experience, job_type } = PostJobSchema.parse(body);
    console.log(body);

    const session = await getServerSession()
    console.log('Session:', session);


    if (!session?.user) {
      console.log('Unauthorized');
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const newJob = await db.job.create({
      data: {
        title,
        company,
        job_area,
        description,
        salary,
        experience,
        job_type,
        createdByEmail: session.user.email
      },
    });

    console.log('Job posted successfully:', newJob);

    return NextResponse.json({ job: newJob, message: 'Job posted successfully' }, { status: 201 });
  } catch (error) {
    console.error('Error posting job:', error);

    if (error instanceof z.ZodError) {
      console.error('Zod Error:', error.issues);
    }

    return NextResponse.json({ message: 'Internal' }, { status: 500 });
  }
}
export {handler as POST };
