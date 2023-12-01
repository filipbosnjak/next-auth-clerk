import React from "react";
import { ToastAction } from "@/components/ui/toast";
import { signIn } from "next-auth/react";
import { toast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export type RegisterSuccessProps = {
  email: string;
  password: string;
};

export const SuccessfulRegistrationToast = (
  router: AppRouterInstance,
  data: RegisterSuccessProps,
) => {
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
          }).then((r) => {
            console.log(r);
          });
          router.push("/");
        }}
        altText="Home"
      >
        Home
      </ToastAction>
    ),
  });
};

export const SomethingWentWrongToast = () => {
  toast({
    variant: "destructive",
    title: "Uh oh! Something went wrong.",
    description: "There was a problem with your request.",
    action: <ToastAction altText="Try again">Try again</ToastAction>,
  });
};
