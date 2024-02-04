import React from 'react'

export const NotFound = () => {
  return (
    <div className="px-8 text-center flex flex-col justify-center items-center">
      <div className="md:w-7/12">

        <span className="block my-2 text-gray-600 dark:text-gray-300">
          It looks like the page you're trying to reach has gone on vacation. 🏝️ Please check the URL or go back to our homepage.
        </span>
      </div>
      <div className="md:flex-1">
        <img className="w-full" src="/404.svg" alt="" />
      </div>
    </div>
  )
}

