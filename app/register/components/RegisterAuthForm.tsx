"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { ClientSafeProvider, LiteralUnion, signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
// @ts-ignore
import { BuiltInProviderType } from "next-auth/providers";
import { SubmitHandler, useForm } from "react-hook-form";

import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";

export type RegisterInput = {
  email: string;
  password: string;
  confirmPassword: string;
};

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {
  providers: Record<
    LiteralUnion<BuiltInProviderType, string>,
    ClientSafeProvider
  > | null;
}

export function RegisterAuthForm({
  className,
  providers,
  ...props
}: UserAuthFormProps) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const { toast } = useToast();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    getValues,
  } = useForm<RegisterInput>();

  const onSubmitHF: SubmitHandler<RegisterInput> = async (
    data: RegisterInput,
  ) => {
    console.log(data);
    fetch("/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then(async (r) => {
      if (r.status === 200) {
        toast({
          title: "User registration successful!",
          description: "Yaay! You have successfully registered.",
          action: (
            <ToastAction
              onClick={() => {
                signIn("credentials", {
                  callbackUrl: "/",
                  email: data.email,
                  password: data.password,
                });
                router.push("/");
              }}
              altText="Home"
            >
              Home
            </ToastAction>
          ),
        });
      } else {
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: "There was a problem with your request.",
          action: <ToastAction altText="Try again">Try again</ToastAction>,
        });
      }
    });
  };

  console.log(watch("email"));

  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }

  return (
    <>
      <div className={cn("grid gap-6", className)} {...props}>
        <form onSubmit={handleSubmit(onSubmitHF)}>
          <div className="grid gap-2">
            <div className="grid gap-1">
              <Label className="sr-only" htmlFor="email">
                Email
              </Label>
              <Input
                id="email"
                placeholder="name@example.com"
                type="email"
                autoCapitalize="none"
                autoComplete="email"
                autoCorrect="off"
                disabled={isLoading}
                {...register("email", { required: true })}
              />
              <Input
                id="password"
                placeholder="********"
                type="password"
                autoCapitalize="none"
                autoComplete="email"
                autoCorrect="off"
                disabled={isLoading}
                {...register("password", { required: true })}
              />
              <Input
                id="confirm-password"
                placeholder="********"
                type="password"
                autoCapitalize="none"
                autoComplete="email"
                autoCorrect="off"
                disabled={isLoading}
                {...register("confirmPassword", { required: true })}
              />
            </div>
            <Button disabled={isLoading} type={"submit"}>
              {isLoading && (
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              )}
              Register with Email
            </Button>
          </div>
        </form>
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">
              Or continue with
            </span>
          </div>
        </div>
        <Button
          variant="outline"
          type="button"
          disabled={isLoading}
          onClick={(e) => {
            e.preventDefault();
            if (providers) {
              signIn("github", {
                callbackUrl: "/",
              }).then((r) => console.log(r));
            }
          }}
        >
          {isLoading ? (
            <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Icons.gitHub className="mr-2 h-4 w-4" />
          )}{" "}
          Github
        </Button>
        <Button
          variant="outline"
          type="button"
          disabled={isLoading}
          onClick={(e) => {
            e.preventDefault();
            if (providers) {
              signIn("google", {
                callbackUrl: "/",
              }).then((r) => console.log(r));
            }
          }}
        >
          {isLoading ? (
            <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <FcGoogle size={21} style={{ marginRight: "4px" }} />
          )}{" "}
          Google
        </Button>
        {/*<div>{getValues("email")}</div>*/}
      </div>
    </>
  );
}
