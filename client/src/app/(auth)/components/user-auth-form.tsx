import { HTMLAttributes, useState } from "react";
import { z } from "zod";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { PasswordInput } from "@/components/ui/password-input";
import { loginUser } from "@/app/api/auth/login";
import { setCookie } from "cookies-next";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store";
import { setAuthData } from "@/store/slices/authSlices";
import { setProfileData } from "@/store/slices/profileSlice";
import { 
    ToastProvider, 
    Toast, 
    ToastTitle, 
    ToastViewport 
} from "@/components/ui/toast";

interface UserAuthFormProps extends HTMLAttributes<HTMLDivElement> {}

const formSchema = z.object({
    email: z
        .string()
        .min(1, { message: "Please enter your email" })
        .email({ message: "Invalid email address" }),
    password: z
        .string()
        .min(1, { message: "Please enter your password" })
        .min(7, { message: "Password must be at least 7 characters long" }),
});

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
    const [isLoading, setIsLoading] = useState(false);
    const [toastOpen, setToastOpen] = useState(false);
    const [toastMessage, setToastMessage] = useState("");
    const [toastVariant, setToastVariant] = useState<"default" | "destructive">("default");

    const router = useRouter();
    const dispatch = useDispatch<AppDispatch>();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    async function onSubmit(data: z.infer<typeof formSchema>) {
        setIsLoading(true);
        setToastOpen(false); // Close any existing toast messages
        try {
            const res = await loginUser(data.email, data.password);
            setIsLoading(false);

            if (res && res.token) {
                // Ensure the response has a token and merchant
                if (!res.token || !res.merchant) {
                    throw new Error("Invalid response from server");
                }

                // Save token in cookies
                setCookie('nestsiteAuthToken', res.token, {
                    path: '/', // Set cookie on the root path to make it accessible globally
                    domain: window.location.hostname, // Ensure it's set for the current domain
                    maxAge: 60 * 60 * 24, // 1 day expiry
                    secure: process.env.NODE_ENV === 'production', // Only use secure in production
                });

                console.log(res.merchant)
                dispatch(setAuthData({
                    token: res.token,
                    merchant: res.merchant,
                }));
                dispatch(setProfileData(res.merchant));

                setToastMessage(res.message || "Login successful!");
                setToastVariant("default");
                setToastOpen(true);

                // Navigate to the home page
                router.push('/');
            } else {
                // Handle login failure (such as invalid credentials)
                throw new Error(res.message || "Login failed. Please check your credentials.");
            }
        } catch (err: any) {
            console.error("Login error:", err); // Log the error for debugging

            // Set the error message in the toast
            setToastMessage(err.message || "Oops! Something went wrong");
            setToastVariant("destructive");
            setToastOpen(true);
            setIsLoading(false);
        } finally {
            setIsLoading(false); // Ensure loading state is turned off
        }
    }

    return (
        <ToastProvider swipeDirection="right">
            <div className={cn("grid gap-6", className)} {...props}>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <div className="grid gap-4">
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem className="space-y-1">
                                        <FormLabel className="font-semibold">Email Address</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter Email" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem className="space-y-1">
                                        <div className="flex items-center justify-between">
                                            <FormLabel className="font-semibold">Password</FormLabel>
                                        </div>
                                        <FormControl>
                                            <PasswordInput placeholder="********" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <div className="flex justify-end">
                                <Link href="/recover-password" className="text-xs font-medium text-primary">
                                    Forgot Password?
                                </Link>
                            </div>
                            <Button className="mt-2" disabled={isLoading}>
                                {isLoading ? "Verifying..." : "Sign In"}
                            </Button>
                        </div>
                    </form>
                </Form>

                <Toast open={toastOpen} onOpenChange={setToastOpen} variant={toastVariant}>
                    <ToastTitle>{toastMessage}</ToastTitle>
                </Toast>
                <ToastViewport />
            </div>
        </ToastProvider>
    );
}
