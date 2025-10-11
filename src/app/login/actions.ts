"use server";

import { z } from "zod";
import { createSession, deleteSession } from "../lib/session";
import { redirect } from "next/navigation";
import { error } from "console";

const testUser = {
  id: "1",
  email: "contact@cosdensolutions.io",
  password: "12345678",
};

// Validation Using Zod
const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }).trim(),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" })
    .trim(),
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function login(prevState: any, formData: FormData) {
    const result = loginSchema.safeParse(Object.fromEntries(formData));
    if (!result.success) {
        return {
            errors: result.error.flatten().fieldErrors, // Return array of strings of errors
        };
    }
     
    const { email, password } = result.data;
    
    // Authenticate User 
    if (email !== testUser.email || password !== testUser.password) {
        return {
            errors: {
                email: ["Invalid email or password"],
                password: ["Invalid email or password"],
            },
        };
    }

    // Create Session
    await createSession(testUser.id);
    
    // Redirect to Dashboard
    redirect("/dashboard");

}

export async function logout() {
  await deleteSession();
  redirect("/login");
}