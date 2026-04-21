"use client";

import React, { useTransition } from "react";
import { subscribeAction, unsubscribeAction } from "../app/articles/actions";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Loader2, Bell, BellOff } from "lucide-react";

interface SubscriptionProps {
  slug: string;
  isSubscribed: boolean;
}

export function SubscriptionCard({ slug, isSubscribed }: SubscriptionProps) {
  const [isPending, startTransition] = useTransition();

  const handleAction = () => {
    startTransition(async () => {
      if (isSubscribed) {
        await unsubscribeAction(slug);
      } else {
        await subscribeAction(slug);
      }
    });
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {isSubscribed ? (
            <Bell className="h-5 w-5 text-green-500" />
          ) : (
            <BellOff className="h-5 w-5 text-slate-400" />
          )}
          {isSubscribed ? "You're Subscribed!" : "Subscribe for Updates"}
        </CardTitle>
        <CardDescription>
          {isSubscribed
            ? null
            : "Stay in the loop with our latest developer updates."}
        </CardDescription>
      </CardHeader>

      <CardContent>
        <p className="text-sm text-muted-foreground">
          {isSubscribed
            ? "Your subscription gives you full access to our latest stories and more exclusive content."
            : "By subscribing, you'll get full access to our latest stories and more exclusive content. Don't miss out!"}
        </p>
      </CardContent>

      <CardFooter>
        <Button
          variant={isSubscribed ? "destructive" : "default"}
          className="w-full"
          disabled={isPending}
          onClick={handleAction}
        >
          {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {isSubscribed ? "Unsubscribe" : "Subscribe Now"}
        </Button>
      </CardFooter>
    </Card>
  );
}
