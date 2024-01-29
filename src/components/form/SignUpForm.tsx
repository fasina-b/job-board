'use client'
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import z from 'zod';

const invalid_type_error = 'Invalid type provided for this field';
const required_error = 'This field cannot be blank';

interface SignUpFormProps {
  onSubmit: (values: z.infer<typeof SignUpSchema>) => Promise<void>;
}

type FormErrors = {
  firstname?: string;
  lastname?: string;
  email?: string;
  password?: string;
  role?: string;
};

export const SignUpSchema = z.object({
  userid: z.string(),
  firstname: z.string({ invalid_type_error, required_error }).min(1, 'Value is too short'),
  lastname: z.string({ invalid_type_error, required_error }).min(1, 'Value is too short'),
  email: z.string({ invalid_type_error, required_error }).email('Please provide a valid email').min(1, 'Value is too short'),
  password: z.string({ invalid_type_error, required_error }).min(6, 'Password is too short'),
  role: z.string().refine(value => value === 'admin' || value === 'seeker', { message: 'Invalid role' })

});


const SignUpForm: React.FC<SignUpFormProps> = ({ onSubmit }) => {
  const router = useRouter();

  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    role: '',
    userid: '',
  });
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleRoleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, role: e.target.value });
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.role) {
      setFormErrors((prevErrors) => ({ ...prevErrors, role: 'Please select a job type' }));
      return;
    }
    try {
      SignUpSchema.parse(formData);
      console.log('Form submitted successfully');
      setFormErrors({});
      onSubmit(formData);
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
  };


  
  

  return (
    <div className="h-[100vh] lg:p-10 items-center flex justify-center px-5 ">
      <div className="max-w-screen-xl  bg-white border shadow sm:rounded-lg flex justify-center flex-1">
        <div className="flex-1 bg-background-orange text-center hidden md:flex">
          <div className="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat">
            <img src="/jobhunt.svg" alt="job-background" className="background-orange"/>
          </div>
        </div>
        <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
          <div className=" flex flex-col items-center">
            <div className="text-center">
              <h1 className="text-2xl xl:text-4xl font-extrabold text-btn-orange">
                Sign up
              </h1>
              <p className="text-[12px] text-btn-dark-blue">
                Hey enter your details to create your account
              </p>
            </div>
            <div className="w-full flex-1 mt-8">
              <form onSubmit={handleSubmit} className="mx-auto max-w-xs flex flex-col gap-2">
                <input
                  name="firstname" 
                  value={formData.firstname}
                  onChange={handleChange}
                  className="w-full px-5 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                  type="text"
                  placeholder="Enter your firstname"
                />
                {formErrors.firstname && <div className="text-red-500">{formErrors.firstname}</div>}

                <input
                  name="lastname" 
                  value={formData.lastname}
                  onChange={handleChange}
                  className="w-full px-5 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                  type="text"
                  placeholder="Enter your lastname"
                />
                {formErrors.lastname && <div className="text-red-500">{formErrors.lastname}</div>}

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
                  placeholder="Password"
                />
                {formErrors.password && <div className="text-red-500">{formErrors.password}</div>}

                <div>
                  <ul className="grid w-full gap-6 md:grid-cols-2">
                      <li>
                          <input type="radio" id="admin" name="role" value="admin" className="hidden peer" checked={formData.role === 'admin'} onChange={handleRoleChange}/>
                          <label htmlFor="admin" className="inline-flex items-center justify-between w-full p-3 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-btn-orange peer-checked:border-btn-orange peer-checked:text-btn-orange hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700">                           
                              <div className="block">
                                  <div className="w-full text-sm font-semibold">Post job</div>
                              </div>
                              <svg className="w-5 h-5 ms-3 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                              </svg>
                          </label>
                      </li>
                      <li>
                          <input type="radio" id="seeker" name="role" value="seeker" className="hidden peer" checked={formData.role === 'seeker'} onChange={handleRoleChange}/>
                          <label htmlFor="seeker" className="inline-flex items-center justify-between w-full p-3 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-btn-orange peer-checked:border-btn-orange peer-checked:text-btn-orange hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700">
                              <div className="block">
                                  <div className="w-full text-sm font-semibold">Find job</div>
                              </div>
                              <svg className="w-5 h-5 ms-3 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                              </svg>
                          </label>
                      </li>
                  </ul>
                  {formErrors.role && <div className="text-red-500">{formErrors.role}</div>}
                </div>

                <button type="submit" className="mt-5 tracking-wide font-semibold bg-btn-orange text-gray-100 w-full py-4 rounded-lg hover:bg-btn-orange-hover transition-all duration-500 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none">
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
                  <span className="ml-3">Sign Up</span>
                </button>
                <p className="mt-6 text-xs text-gray-600 text-center">
                  Already have an account?{" "}
                  <a href="/sign-in">
                    <span className="text-btn-dark-blue hover:text-btn-orange-hover transition-all duration-500 ease-in-out font-semibold">Sign in</span>
                  </a>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SignUpForm;