"use client"
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { PasswordInput } from '@/components/ui/password-input';
import { Button } from '@/components/ui/button';
import { updatePassword } from '@/app/api/auth/auth';

import {
  ToastProvider,
  Toast,
  ToastTitle,
  ToastViewport,
} from '@/components/ui/toast'; // Import toast components

// Define the validation schema using zod
const formSchema = z.object({
  currentPassword: z.string().min(1, { message: 'Please enter your current password' }),
  newPassword: z
    .string()
    .min(1, { message: 'Please enter a new password' })
    .min(7, { message: 'New password must be at least 7 characters long' }),
});

export function UpdatePasswordPage({  ...props }) {
  const [isLoading, setIsLoading] = useState(false);
  const [toastOpen, setToastOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastVariant, setToastVariant] = useState<'default' | 'destructive'>('default');

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      currentPassword: '',
      newPassword: '',
    },
  });

  // Submit handler for the form
  async function onSubmit(data: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setToastOpen(false); // Close any existing toast messages
    try {
      const response = await updatePassword(data.currentPassword, data.newPassword);

      if (response.message === 'Password updated successfully') {
        setToastMessage('Password updated successfully!');
        setToastVariant('default');
        setToastOpen(true);
        form.reset(); // Reset the form fields
      } else {
        throw new Error(response.message || 'Password update failed. Please try again.');
      }
    } catch (err: any) {
      console.error('Password update error:', err); // Log the error for debugging
      setToastMessage(err.message || 'An error occurred during the password update.');
      setToastVariant('destructive');
      setToastOpen(true);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <ToastProvider swipeDirection="right">
      <div className={cn('grid gap-6 mx-4')} {...props}>
        <h1 className="text-2xl font-semibold">Update Password</h1>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid gap-2">
              {/* Current Password */}
              <FormField
                control={form.control}
                name="currentPassword"
                render={({ field }) => (
                  <FormItem className="space-y-1">
                    <FormLabel>Current Password</FormLabel>
                    <FormControl>
                      <PasswordInput placeholder="********" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* New Password */}
              <FormField
                control={form.control}
                name="newPassword"
                render={({ field }) => (
                  <FormItem className="space-y-1">
                    <FormLabel>New Password</FormLabel>
                    <FormControl>
                      <PasswordInput placeholder="********" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button className="mt-2" disabled={isLoading}>
                {isLoading ? 'Updating Password...' : 'Update Password'}
              </Button>
            </div>
          </form>
        </Form>

        {/* Toast for notifications */}
        <Toast open={toastOpen} onOpenChange={setToastOpen} variant={toastVariant}>
          <ToastTitle>{toastMessage}</ToastTitle>
        </Toast>
        <ToastViewport />
      </div>
    </ToastProvider>
  );
}

export default UpdatePasswordPage;
