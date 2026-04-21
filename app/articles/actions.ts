"use server";

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

/**
 * Saves the "subscribed" status in a cookie for 1 week.
 */
export async function subscribeAction(slug: string) {
  const cookieStore = await cookies();
  
  // 1 week = 7 days * 24 hours * 60 minutes * 60 seconds
  const ONE_WEEK_IN_SECONDS = 60 * 60 * 24 * 7;

  cookieStore.set('subscribed', 'true', {
    maxAge: ONE_WEEK_IN_SECONDS,
    path: '/',         // Ensures the cookie is available across the entire site
    httpOnly: true,    // Prevents client-side JS from accessing the cookie (security best practice)
    secure: true,      // Ensures the cookie is sent over HTTPS
    sameSite: 'lax',   // Protects against CSRF while allowing standard navigation
  });

  redirect(`/articles/${slug}`);
}

/**
 * Deletes the "subscribed" key from the cookies.
 */
export async function unsubscribeAction(slug: string) {
  const cookieStore = await cookies();
  cookieStore.delete('subscribed');

  redirect(`/articles/${slug}/preview`);
}