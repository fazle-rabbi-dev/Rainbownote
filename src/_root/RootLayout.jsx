import { Outlet, Navigate } from "react-router-dom";
import { MobileNav, DesktopNav, Footer } from "@/components";

const isLoggedin = false;

export const RootLayout = () => {
  return (
    <>
      {isLoggedin ? (
        <Navigate to="/dashboard" />
      ) : (
        <>
          <MobileNav />
          <DesktopNav />
          <Outlet />
          <Footer />
        </>
      )}
    </>
  );
};
