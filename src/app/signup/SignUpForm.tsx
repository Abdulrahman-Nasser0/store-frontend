'use client';

import { signUp } from "../lib/actions";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import Link from "next/link";

const SignUpForm = () => {
    const [state, signUpAction] = useActionState(signUp, undefined);

    return (
        <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-center mb-6">Create Account</h2>

            <form action={signUpAction} className="space-y-4">
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                        Full Name
                    </label>
                    <input 
                        type="text" 
                        name="name"
                        id="name"
                        placeholder="Enter your full name" 
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                    {state?.errors?.name && (
                        <p className="text-red-500 text-sm mt-1">{state.errors.name[0]}</p>
                    )}
                </div>

                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        Email
                    </label>
                    <input 
                        type="email" 
                        name="email"
                        id="email"
                        placeholder="Enter your email" 
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                    {state?.errors?.email && (
                        <p className="text-red-500 text-sm mt-1">{state.errors.email[0]}</p>
                    )}
                </div>

                <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                        Password
                    </label>
                    <input 
                        type="password" 
                        name="password"
                        id="password"
                        placeholder="Enter your password" 
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                    {state?.errors?.password && (
                        <p className="text-red-500 text-sm mt-1">{state.errors.password[0]}</p>
                    )}
                </div>

                <div>
                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                        Confirm Password
                    </label>
                    <input 
                        type="password" 
                        name="confirmPassword"
                        id="confirmPassword"
                        placeholder="Confirm your password" 
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                    {state?.errors?.confirmPassword && (
                        <p className="text-red-500 text-sm mt-1">{state.errors.confirmPassword[0]}</p>
                    )}
                </div>

                <SubmitButton />

                <div className="text-center">
                    <p className="text-sm text-gray-600">
                        Already have an account?{' '}
                        <Link href="/login" className="font-medium text-blue-600 hover:text-blue-500">
                            Sign in here
                        </Link>
                    </p>
                </div>
            </form>
        </div>
    );
}

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button 
        disabled={pending} 
        type="submit" 
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-400"
    >
      {pending ? 'Creating Account...' : 'Create Account'}
    </button>
  );
}

export default SignUpForm;