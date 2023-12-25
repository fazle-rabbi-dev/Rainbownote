import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { MobileNav, DesktopNav, Loader } from "@/components";
import { useUserContext } from "@/context"

export const AuthLayout = () => {
  const { isLoading, isLoggedIn } = useUserContext()
  
  if(isLoading){
    return <div className="w-full h-screen flex justify-center items-center">
      <Loader />
    </div>
  }
  
  return (
    <>
      {isLoggedIn ? (
        <Navigate to="/dashboard" />
      ) : (
        <section className="px-8 md:px-10">
          <MobileNav padding="px-0" />
          <DesktopNav padding="px-0" />
          <Outlet />
        </section>
      )}
    </>
  );
};
