'use client';

import { login } from "../lib/actions";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";

const LoginForm = () => {
    const [state, loginAction] = useActionState(login, undefined);

    return (
        <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
            
            <form action={loginAction} className="space-y-4">
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

                <SubmitButton />
            </form>
        </div>
    );
}

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    // disable button while form is submitting
    <button disabled={pending} type="submit" className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
      Login
    </button>
  );
}

export default LoginForm;