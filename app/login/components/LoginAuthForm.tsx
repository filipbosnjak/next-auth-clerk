"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { ClientSafeProvider, LiteralUnion, signIn } from "next-auth/react";
// @ts-ignore
import { BuiltInProviderType } from "next-auth/providers";
import { FcGoogle } from "react-icons/fc";
import { SubmitHandler, useForm } from "react-hook-form";
import { RegisterInput } from "@/app/register/components/RegisterAuthForm";

export type LoginInput = {
  email: string;
  password: string;
};
interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {
  providers: Record<
    LiteralUnion<BuiltInProviderType, string>,
    ClientSafeProvider
  > | null;
}

export function LoginAuthForm({
  className,
  providers,
  ...props
}: UserAuthFormProps) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    getValues,
  } = useForm<RegisterInput>();

  const login: SubmitHandler<RegisterInput> = async (data: LoginInput) => {
    signIn("credentials", {
      callbackUrl: "/",
      email: data.email,
      password: data.password,
    }).then((r) => {
      debugger;
      console.log(r);
    });
  };

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <form onSubmit={handleSubmit(login)}>
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
              placeholder=""
              type="password"
              autoCapitalize="none"
              autoComplete="password"
              autoCorrect="off"
              disabled={isLoading}
              {...register("password", { required: true })}
            />
          </div>
          <Button disabled={isLoading}>
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Sign In with Email
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
          console.log("github");
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
          console.log("google");
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
    </div>
  );
}
