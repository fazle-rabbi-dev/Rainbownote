import { Outlet, Navigate } from "react-router-dom";
import { MobileNav, DesktopNav, Footer, PageLoader } from "@/components";
import { useUserContext } from "@/context"

export const RootLayout = () => {
  const { isLoggedIn, isLoading } = useUserContext()
  
  if(isLoading){
    return <PageLoader />
  }
  
  return (
    <>
      {isLoggedIn ? (
        <Navigate to="/dashboard" />
      ) : (
        <section className="">
          <MobileNav />
          <DesktopNav />
          <Outlet />
          <Footer />
        </section>
      )}
    </>
  );
};
