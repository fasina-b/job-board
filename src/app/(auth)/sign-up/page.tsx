'use client'
import SignUpForm, { SignUpSchema } from "@/components/form/SignUpForm";
import Link from "next/link";
import { useRouter } from 'next/navigation';
import z from 'zod';



const SignUp = () => {
  const router = useRouter();
  const onSubmit = async (values: z.infer<typeof SignUpSchema>) => {
    const response = await fetch('/api/user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        firstname: values.firstname,
        lastname: values.lastname,
        email: values.email,
        password: values.password,
        userid: values.userid,
        role: values.role,
      }),
    });

    if (response.ok){
      
      router.push('/sign-in');
    } else {
      console.error('Registration failed')
    }
  }

  return (
    <div>
      <div className="flex relative justify-center top-24">
        <Link href="/" className="bg-btn-orange text-white px-4 py-2 rounded-md hover:bg-btn-orange-hover transition-all duration-300">
          Back to Homepage
      </Link>
      </div>
      <SignUpForm onSubmit={onSubmit}></SignUpForm>
    </div>
  );
};
export default SignUp;