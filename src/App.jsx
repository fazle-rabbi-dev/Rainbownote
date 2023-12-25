import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import eruda from "eruda";
import toast, { Toaster } from "react-hot-toast";

import { AuthLayout, SigninForm, SignupForm } from "@/_auth";
import { RootLayout, Home, About, NotFound } from "@/_root";
import {
  PrivateLayout,
  Dashboard,
  CreateNote,
  ViewNote,
  Trash,
  Archive,
  FavouriteNote,
  UpdateNote,
  DeleteNote,
  Settings
} from "@/_private";

function App() {
  /*useEffect(() => {
    eruda.init({
      element: document.getElementById("console"),
      tools: ["console", "network"]
    });
  }, []);*/

  return (
    <>
      <Routes>
        {/* Auth Route */}
        <Route element={<AuthLayout />}>
          <Route path="/sign-in" element={<SigninForm />} />
          <Route path="/sign-up" element={<SignupForm />} />
        </Route>

        {/* Public Route */}
        <Route element={<RootLayout />}>
          <Route index element={<Home />} />
          <Route path="/sign-in" element={<SigninForm />} />
          <Route path="/sign-up" element={<SignupForm />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<NotFound />} />
        </Route>

        {/* Private Route */}
        <Route element={<PrivateLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/create-note" element={<CreateNote />} />
          <Route path="/view-note/:noteid" element={<ViewNote />} />
          <Route path="/trash" element={<Trash />} />
          <Route path="/archive" element={<Archive />} />
          <Route path="/favourite-notes" element={<FavouriteNote />} />
          <Route path="/edit-note/:noteid" element={<UpdateNote />} />
          <Route path="/delete-note/:noteid" element={<DeleteNote />} />
          <Route path="/settings" element={<Settings />} />
        </Route>
      </Routes>
      <ToastContainer />
      <div id="console"></div>
      <Toaster position="top-center" reverseOrder={false} />
    </>
  );
}

export default App;
