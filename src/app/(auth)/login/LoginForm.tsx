'use client';

import { login } from "@/lib/actions";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/Button";
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
        <Button
            type="submit"
            loading={pending}
            fullWidth
            className="uppercase tracking-wide font-semibold text-sm"
        >
            {pending ? "Signing In..." : "Sign In"}
        </Button>
    );
}

export default LoginForm;