"use client";
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useDispatch, useSelector } from 'react-redux';
import { updateProfile, fetchProfile } from '@/store/slices/profileSlice';
import { RootState, AppDispatch } from '@/store';
import {
  ToastProvider,
  Toast,
  ToastTitle,
  ToastViewport,
} from '@/components/ui/toast';

const formSchema = z.object({
  username: z.string().nullable(),
  firstName: z.string().nullable(),
  lastName: z.string().nullable(),
  secondaryEmail: z.string().nullable(),
  phoneNumber: z.string().nullable(),
  address: z.string().nullable(),
  countryRegion: z.string().nullable(),
  instagramURL: z.string().nullable(),
  facebookURL: z.string().nullable(),
  tiktokURL: z.string().nullable(),
  twitterURL: z.string().nullable(),
});

export function ProfilePage({ ...props }) {
  const dispatch = useDispatch<AppDispatch>();
  const profile = useSelector((state: RootState) => state.profile.profile);
  const [isLoading, setIsLoading] = useState(false);
  const [toastOpen, setToastOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastVariant, setToastVariant] = useState<'default' | 'destructive'>('default');

  useEffect(() => {
    dispatch(fetchProfile());
  }, [dispatch]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: profile?.username ?? '',
      firstName: profile?.firstName ?? '',
      lastName: profile?.lastName ?? '',
      secondaryEmail: profile?.secondaryEmail ?? '',
      phoneNumber: profile?.phoneNumber ?? '',
      address: profile?.address ?? '',
      countryRegion: profile?.countryRegion ?? '',
      instagramURL: profile?.instagramURL ?? '',
      facebookURL: profile?.facebookURL ?? '',
      tiktokURL: profile?.tiktokURL ?? '',
      twitterURL: profile?.twitterURL ?? '',
    },
  });

  useEffect(() => {
    form.reset({
      username: profile?.username ?? '',
      firstName: profile?.firstName ?? '',
      lastName: profile?.lastName ?? '',
      secondaryEmail: profile?.secondaryEmail ?? '',
      phoneNumber: profile?.phoneNumber ?? '',
      address: profile?.address ?? '',
      countryRegion: profile?.countryRegion ?? '',
      instagramURL: profile?.instagramURL ?? '',
      facebookURL: profile?.facebookURL ?? '',
      tiktokURL: profile?.tiktokURL ?? '',
      twitterURL: profile?.twitterURL ?? '',
    });
  }, [profile, form]);

  async function onSubmit(data: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setToastOpen(false);
    try {
      const updatedProfile = {
        ...data,
        id: profile?.id ?? '',
        email: profile?.email ?? '',
        createdAt: profile?.createdAt ?? '',
        updatedAt: profile?.updatedAt ?? '',
        emailVerified: profile?.emailVerified ?? false,
        accountVerified: profile?.accountVerified ?? false,
        role: profile?.role ?? 'merchant',
        profilePhoto: profile?.profilePhoto ?? null,
        subscriptionPlanId: profile?.subscriptionPlanId ?? null,
        twoFactorEnabled: profile?.twoFactorEnabled ?? false,
      };

      const resultAction = await dispatch(updateProfile(updatedProfile));

      if (updateProfile.fulfilled.match(resultAction)) {
        setToastMessage('Profile updated successfully!');
        setToastVariant('default');
        setToastOpen(true);
      } else {
        const errorMessage = resultAction.payload?.message || 'Profile update failed. Please try again.';
        throw new Error(errorMessage);
      }
    } catch (err: any) {
      setToastMessage(err.message || 'An error occurred during the profile update.');
      setToastVariant('destructive');
      setToastOpen(true);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <ToastProvider swipeDirection="right">
      <div className={cn('grid gap-6 mx-4')} {...props}>
        <h1 className="text-2xl font-semibold">Update Profile</h1>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid gap-2">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem className="space-y-1">
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input placeholder="Username" {...field} value={field.value ?? ''} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem className="space-y-1">
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input placeholder="First Name" {...field} value={field.value ?? ''} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem className="space-y-1">
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Last Name" {...field} value={field.value ?? ''} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="secondaryEmail"
                render={({ field }) => (
                  <FormItem className="space-y-1">
                    <FormLabel>Secondary Email</FormLabel>
                    <FormControl>
                      <Input placeholder="Secondary Email" {...field} value={field.value ?? ''} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phoneNumber"
                render={({ field }) => (
                  <FormItem className="space-y-1">
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <Input placeholder="Phone Number" {...field} value={field.value ?? ''} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem className="space-y-1">
                    <FormLabel>Address</FormLabel>
                    <FormControl>
                      <Input placeholder="Address" {...field} value={field.value ?? ''} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="countryRegion"
                render={({ field }) => (
                  <FormItem className="space-y-1">
                    <FormLabel>Country/Region</FormLabel>
                    <FormControl>
                      <Input placeholder="Country/Region" {...field} value={field.value ?? ''} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="instagramURL"
                render={({ field }) => (
                  <FormItem className="space-y-1">
                    <FormLabel>Instagram URL</FormLabel>
                    <FormControl>
                      <Input placeholder="Instagram URL" {...field} value={field.value ?? ''} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="facebookURL"
                render={({ field }) => (
                  <FormItem className="space-y-1">
                    <FormLabel>Facebook URL</FormLabel>
                    <FormControl>
                      <Input placeholder="Facebook URL" {...field} value={field.value ?? ''} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="tiktokURL"
                render={({ field }) => (
                  <FormItem className="space-y-1">
                    <FormLabel>TikTok URL</FormLabel>
                    <FormControl>
                      <Input placeholder="TikTok URL" {...field} value={field.value ?? ''} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="twitterURL"
                render={({ field }) => (
                  <FormItem className="space-y-1">
                    <FormLabel>Twitter URL</FormLabel>
                    <FormControl>
                      <Input placeholder="Twitter URL" {...field} value={field.value ?? ''} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button className="mt-2" disabled={isLoading}>
                {isLoading ? 'Updating Profile...' : 'Update Profile'}
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

export default ProfilePage;
