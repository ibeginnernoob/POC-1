import type { ReactNode } from "react";
interface AuthLayoutProps {
  children: ReactNode;
  heading: string;
}

const AuthLayout = ({ children, heading }: AuthLayoutProps) => {
  return (
    <div className="min-h-screen flex flex-wrap md:flex-nowrap">

<div className="w-full md:w-1/2 relative overflow-hidden h-64 md:h-screen order-1 md:order-2">
  <img 
    src={'../../../public/imgs/auth-tejas.png'}
    alt="Technology background"
    className="w-full h-full object-cover"
  />
</div>

<div className="w-full md:w-1/2 bg-background flex flex-col items-center justify-center p-8 order-2 md:order-1 relative">
  <div className="relative md:absolute md:top-6 md:left-6 z-50 flex items-center justify-center md:justify-start mb-6 md:mb-0">
  <img
  src={'../../../public/imgs/hal-logo.png'}
  alt="HAL Logo"
  className="h-10 sm:h-20 w-auto"
/>

  </div>

    {/* Form Container */}
  <div className="w-full max-w-md mt-4 md:mt-0">
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-bold text-foreground mb-6">{heading}</h1>
      </div>
      <div className=" flex-col items-center justify-center">
        {children}
      </div>
    </div>
  </div>
</div>
  );
};

export default AuthLayout;
