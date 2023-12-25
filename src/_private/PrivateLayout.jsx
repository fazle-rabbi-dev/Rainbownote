import {
  useState, useEffect
} from 'react';
import { Outlet, Navigate } from "react-router-dom"
import {BottomTabBar, TopBar, DesktopSideBar, Loader } from "@/components"
import { Dashboard } from "@/_private"
import { useUserContext } from "@/context"

export const PrivateLayout = () => {
  const { isLoading, isLoggedIn } = useUserContext()
  
  if(isLoading){
    return <div className="w-full h-screen flex justify-center items-center">
      <Loader />
    </div>
  }
  
  return (
    <>
      {
        !isLoggedIn ? (
            <Navigate to="/sign-in" />
          ) : (
            <>
              <div className="mb-24 md:ml-[30%]">
                <Outlet />
              </div>
              <BottomTabBar />
              <DesktopSideBar />
            </>
            )
      }
    </>
  )
}