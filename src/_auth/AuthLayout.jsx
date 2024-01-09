import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { MobileNav, DesktopNav, Loader } from "@/components";
import { useUserContext } from "@/context";

export const AuthLayout = () => {
  const { isLoading, isLoggedIn } = useUserContext();

  if (isLoading) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <Loader />
      </div>
    );
  }

  return (
    <>
      {isLoggedIn ? (
        <Navigate to="/dashboard" />
      ) : (
        <>
          <MobileNav />
          <DesktopNav />

          <section className="px-8">
            <div className="md:flex md:items-center md:justify-between md:gap-2">
              <div className="md:w-5/12">
                <Outlet />
              </div>

              <div className="flex-1">
                <img
                  className="w-full hidden md:block"
                  src="/auth-illustration.svg"
                  alt="Auth Illustration"
                />
              </div>
            </div>
          </section>
        </>
      )}
    </>
  );
};
