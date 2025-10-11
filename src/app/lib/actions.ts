"use server";

import { z } from "zod";
import { createSession, deleteSession } from "./session";
import { redirect } from "next/navigation";

// Mock users database (in real app, use a database)
const users = [
  {
    id: "1",
    name: "Test User",
    email: "contact@cosdensolutions.io",
    password: "12345678",
  }
];

// LOGIN VALIDATION SCHEMA
const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }).trim(),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" })
    .trim(),
});

// SIGNUP VALIDATION SCHEMA
const signUpSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }).trim(),
  email: z.string().email({ message: "Invalid email address" }).trim(),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" })
    .trim(),
  confirmPassword: z.string().trim(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

// TYPES
type LoginState = {
  errors?: {
    email?: string[];
    password?: string[];
  };
  message?: string;
} | undefined;

type SignUpState = {
  errors?: {
    name?: string[];
    email?: string[];
    password?: string[];
    confirmPassword?: string[];
  };
  message?: string;
} | undefined;

// LOGIN ACTION
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function login(_prevState: any, formData: FormData): Promise<LoginState> {
  const result = loginSchema.safeParse(Object.fromEntries(formData));
  
  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
    };
  }

  const { email, password } = result.data;
  
  // Authenticate User - find user in the users array
  const user = users.find(u => u.email === email && u.password === password);
  if (!user) {
    return {
      errors: {
        email: ["Invalid email or password"],
        password: ["Invalid email or password"],
      },
    };
  }

  // Create Session
  await createSession(user.id);
  
  // Redirect to Dashboard
  redirect("/dashboard");
}

// SIGNUP ACTION
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function signUp(_prevState: any, formData: FormData): Promise<SignUpState> {
  const result = signUpSchema.safeParse(Object.fromEntries(formData));
  
  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
    };
  }

  const { name, email, password } = result.data;

  // Check if user already exists
  const existingUser = users.find(user => user.email === email);
  if (existingUser) {
    return {
      errors: {
        email: ["An account with this email already exists"],
      },
    };
  }

  // Create new user (in real app, hash password and save to database)
  const newUser = {
    id: Date.now().toString(), // In real app, use proper ID generation
    name,
    email,
    password, // In real app, hash this password
  };
  
  users.push(newUser);

  // Create session and redirect
  await createSession(newUser.id);
  redirect("/dashboard");
}

// LOGOUT ACTION
export async function logout() {
  await deleteSession();
  redirect("/login");
}