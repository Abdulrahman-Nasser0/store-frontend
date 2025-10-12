'use client';

import { login } from "../lib/actions";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import Link from "next/link";

const LoginForm = () => {
    const [state, loginAction] = useActionState(login, undefined);

    return (
        <div className="bg-white py-8 px-6 shadow-xl rounded-lg border border-gray-200">
            <form action={loginAction} className="space-y-6">
                <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                        Email Address
                    </label>
                    <input 
                        type="email" 
                        name="email"
                        id="email"
                        placeholder="Enter your email address" 
                        className="w-full text-black px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                        required
                    />
                    {state?.errors?.email && (
                        <p className="text-red-500 text-sm mt-2 flex items-center">
                            <span className="mr-1">⚠️</span>
                            {state.errors.email[0]}
                        </p>
                    )}
                </div>

                <div>
                    <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">
                        Password
                    </label>
                    <input 
                        type="password" 
                        name="password"
                        id="password"
                        placeholder="Enter your password" 
                        className="w-full text-black px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                        required
                    />
                    {state?.errors?.password && (
                        <p className="text-red-500 text-sm mt-2 flex items-center">
                            <span className="mr-1">⚠️</span>
                            {state.errors.password[0]}
                        </p>
                    )}
                </div>

                {/* Forgot Password Link */}
                <div className="text-right">
                    <Link href="/forgot-password" className="text-sm text-blue-600 hover:text-blue-500 font-medium">
                        Forgot your password?
                    </Link>
                </div>

                <SubmitButton />

                {/* Sign Up Link */}
                <div className="text-center pt-4 border-t border-gray-200">
                    <p className="text-gray-600 text-sm">
                        Don&apos;t have an account?{' '}
                        <Link href="/signup" className="text-blue-600 hover:text-blue-500 font-semibold transition-colors duration-200">
                            Sign up now
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
      className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 px-6 rounded-lg hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-semibold text-sm uppercase tracking-wide"
    >
      {pending ? (
        <>
          <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-white inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Signing In...
        </>
      ) : (
        'Sign In'
      )}
    </button>
  );
}

export default LoginForm;