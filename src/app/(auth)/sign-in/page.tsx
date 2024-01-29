'use client'
import SignInForm, { SignInSchema } from "@/components/form/SignInForm";
import Link from "next/link";

const SignIn = () => {
  

  return (
    <div>
      <div className="flex relative justify-center top-40">
        <Link href="/" className="bg-btn-orange text-white px-4 py-2 rounded-md hover:bg-btn-orange-hover transition-all duration-300">
          Back to Homepage
      </Link>
      </div>  
      <SignInForm></SignInForm>     
    </div>

  );
};
export default SignIn;