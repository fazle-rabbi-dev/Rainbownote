import {
  useState, useEffect
} from 'react';
import { Outlet, Navigate } from "react-router-dom"
import {BottomTabBar, TopBar, Loader } from "@/components"
import { Dashboard } from "@/_private"
import { useUserContext } from "@/context"

// const isLoading = true;
// const isLoggedin = true;

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
            <section>
                <div className="mb-24">
                  <Outlet />
                </div>
                <BottomTabBar />
            </section>
            )
      }
    </>
  )
}