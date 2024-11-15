import { EmailVerificationForm } from "@/components/auth/email-verification-form";
import { Suspense } from 'react'

function VerifyEmailPage() {

  
return ( <div>
  <Suspense>
  <EmailVerificationForm />;
  </Suspense>
 </div> );
}

export default VerifyEmailPage;
