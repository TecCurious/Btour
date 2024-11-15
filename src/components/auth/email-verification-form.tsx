"use client";
import { Suspense } from "react";
import { verifyEmail } from "@/action/VerifyEmail";
import { CardWrapper } from "@/components/auth/card-wrapper";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { BeatLoader } from "react-spinners";
// import { Suspense } from 'react'
export function EmailVerificationForm() {
  const [error, setError] = useState<string | undefined>(undefined);
  const [success, setSuccess] = useState<string | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);

  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const onSubmit = useCallback(() => {
    setIsLoading(true);

    if (!token) {
      setError("Missing token!");
      setIsLoading(false);
      return;
    }

    verifyEmail(token)
      .then((data) => {
        // setError(data.error);
        setSuccess(data.success);
      })
      .catch((err) => {
        console.error("Error during email verification:", err);
        setError("Something went wrong!");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [token]);

  useEffect(() => {
    onSubmit();
  }, [onSubmit]);

  return (
    <Suspense>
    <div className="flex justify-center items-center min-h-screen">
      <CardWrapper
        headerLabel="Confirming your verification"
        backButtonLabel="Back to login"
        backButtonHref="/auth/login"
      >
        <div className="flex w-full items-center justify-center">
          {isLoading && <BeatLoader />}
          <FormError message={error} />
          <FormSuccess message={success} />
        </div>
      </CardWrapper>
    </div>
    </Suspense>
  );
}
