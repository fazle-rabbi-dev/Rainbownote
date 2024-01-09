import React from "react";

export const About = () => {
  return (
    <div className="px-8 pb-10 md:mx-10">
      <div className="">
        <h2 className="h2-bold mt-2">About</h2>
        <p className="info">
          A vibrant MERN note app with GitHub login, trash management, and
          public note sharing. Personalize notes with covers, icons, and enjoy
          the sleek TinyMCE editor. Powered by Vite React, Appwrite,
          React-Hook-Form, React-Query, and Tailwind CSS.
        </p>
      </div>

      {/*<div className="my-4">
        <h2 className="h2-bold mt-2 mb-4 pb-2 border-b-[1px] border-gray-200">
          🔴 Unveiling the Journey of Building Rainbownote
        </h2>
        <p className="info border-l-4 border-blue-500 pl-3">
          I created this note app to practice Appwrite and enhance my
          React-Query skills. Building this app supercharged my React-Query and
          Appwrite proficiency. I implemented various features, drawing
          inspiration from other note-taking apps. I thoroughly enjoyed this
          project-building journey.
        </p>
      </div>*/}

      <div className="my-4">
        <h3 className="h3-bold">Project Created at</h3>
        <ul className="list-disc">
          <li className="ml-8">🗓 Dec 2023</li>
        </ul>
      </div>

      <div className="my-4">
        <h3 className="h3-bold">Technologies Used ⚒️</h3>
        <ul className="list-disc">
          <li className="ml-8">Vite + React</li>
          <li className="ml-8">TailwindCSS</li>
          <li className="ml-8">React-Query</li>
          <li className="ml-8">React-Hook-Form</li>
          <li className="ml-8">Appwrite (for Authentication & Storage)</li>
        </ul>
      </div>

      <div className="my-4">
        <span className="h3-bold">For more info </span>
        <a
          target="_blank"
          className="text-primary-500 underline "
          href="https://github.com/fazle-rabbi-dev/rainbownote"
        >
          click here.
        </a>
      </div>
    </div>
  );
};
