'use client'
import { useRouter } from 'next/navigation';
import { signIn } from "next-auth/react";
import React, { useState } from 'react';

import z from 'zod';


const invalid_type_error = 'Invalid type provided for this field';
const required_error = 'This field cannot be blank';

type FormErrors = {
  email?: string;
  password?: string;
};

export const SignInSchema = z.object({
  email: z.string({ invalid_type_error, required_error }).email('Please provide a valid email').min(1, 'Value is too short'),
  password: z.string({ invalid_type_error, required_error }).min(6, 'Password is too short'),
});


const SignInForm = () => {
  const router = useRouter();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [formErrors, setFormErrors] = useState<FormErrors>({});

  const onSubmit = async (e: React.FormEvent)=> {
    e.preventDefault();

    try {
      const validatedData = SignInSchema.parse(formData);
      setFormErrors({});
      await handleSubmit(validatedData);      
      console.log('Form submitted successfully');

    } catch (error) {
      console.error('Form submission error:', error);
      if (error instanceof z.ZodError) {
        const errors: FormErrors = {};
        error.errors.forEach((err) => {
          const fieldName = err.path[0] as keyof FormErrors;
          errors[fieldName] = err.message;
        });
        setFormErrors(errors);
      }
    }

    
  }

  const handleSubmit = async (validatedData: z.infer<typeof SignInSchema>) => {
    try{

      const result = await signIn("credentials",{
        email: validatedData.email,
        password: validatedData.password,
        redirect: false,
        callbackUrl: "/"
      });
    

      console.log(result);

      if (!result?.error) {
        router.push("/");
      } else {
        console.error("Invalid email or password");
      }
    } catch (error) {
      console.error('Authentication error:', error);
    }    
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="h-[100vh] lg:p-10 items-center flex justify-center px-5 ">
      <div className="max-w-screen-xl  bg-white border shadow sm:rounded-lg flex justify-center flex-1">
        
        <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
          <div className=" flex flex-col items-center">
            <div className="text-center">
              <h1 className="text-2xl xl:text-4xl font-extrabold text-btn-orange">    
                Login
              </h1>
              <p className="text-[12px] text-btn-dark-blue">
                Hey enter your details to log into your account
              </p>
            </div>
            <div className="w-full flex-1 mt-8">
              <form onSubmit={onSubmit} className="mx-auto max-w-xs flex flex-col gap-4">
                  <input
                    name="email" 
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-5 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                    type="email"
                    placeholder="Enter your email"
                  />
                  {formErrors.email && <div className="text-red-500">{formErrors.email}</div>}

                
                  <input
                    name="password" 
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full px-5 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                    type="password"
                    placeholder="Enter your password"
                  />
                  {formErrors.password && <div className="text-red-500">{formErrors.password}</div>}
                
                <button type='submit' className="mt-5 tracking-wide font-semibold bg-btn-orange text-gray-100 w-full py-4 rounded-lg hover:bg-btn-orange-hover transition-all duration-500 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none">
                  <svg
                    className="w-6 h-6 -ml-2"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                    <circle cx="8.5" cy="7" r="4" />
                    <path d="M20 8v6M23 11h-6" />
                  </svg>
                  <span className="ml-3">Login</span>
                </button>
                <p className="mt-6 text-xs text-gray-600 text-center">
                  Don&apos;t have an account?{" "}
                  <a href="/sign-up">
                    <span className="text-btn-dark-blue hover:text-btn-orange-hover transition-all duration-500 ease-in-out font-semibold">Sign up</span>
                  </a>
                </p>
              </form>
            </div>
          </div>
        </div>

        <div className="flex-1 bg-background-orange text-center hidden md:flex">
          <div className="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat">
            <img src="/login.svg" alt="job-background" className="background-orange"/>
          </div>
        </div>

      </div>
    </div>
  );
};
export default SignInForm;