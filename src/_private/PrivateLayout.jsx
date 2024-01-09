import { useState, useEffect } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { BottomTabBar, TopBar, DesktopSideBar, PageLoader } from "@/components";
import { Dashboard } from "@/_private";
import { useUserContext } from "@/context";

export const PrivateLayout = () => {
  const { isLoading, isLoggedIn } = useUserContext();

  if (isLoading) <PageLoader />;

  return (
    <>
      {!isLoggedIn ? (
        <Navigate to="/sign-in" />
      ) : (
        <>
          <section className="mb-24 md:ml-[30%]">
            <Outlet />
          </section>
          <BottomTabBar />
          <DesktopSideBar />
        </>
      )}
    </>
  );
};
