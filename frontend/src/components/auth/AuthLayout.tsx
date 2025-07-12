import type { ReactNode } from "react";
import image from "../../../public/imgs/ChatGPT Image Jul 8, 2025, 12_48_59 PM.png";
import logo from '../../../public/imgs/Screenshot 2025-07-12 at 5.47.16 PM.png'
interface AuthLayoutProps {
  children: ReactNode;
  heading: string;
}

const AuthLayout = ({ children, heading }: AuthLayoutProps) => {
  return (
    <div className="min-h-screen flex flex-wrap md:flex-nowrap">

<div className="w-full md:w-1/2 relative overflow-hidden h-64 md:h-screen order-1 md:order-2">
  <img 
    src={image}
    alt="Technology background"
    className="w-full h-full object-cover"
  />
</div>

<div className="w-full md:w-1/2 bg-background flex flex-col items-center justify-center p-8 order-2 md:order-1 relative">
  <div className="relative md:absolute md:top-6 md:left-6 z-50 flex items-center justify-center md:justify-start mb-6 md:mb-0">
  <img
  src={logo}
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
