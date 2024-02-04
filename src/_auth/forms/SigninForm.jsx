import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import toast from "react-hot-toast";

import { signInSchema } from "@/lib/validation";
import { Loader } from "@/components";
import { useSignInAccount } from "@/lib/react-query/QueriesAndMutations";
import {
  loginWithGithub as githubLogin,
  saveUserAfterGithubAuth
} from "@/lib/appwrite/api";
import { useUserContext } from "@/context";

export const SigninForm = () => {
  const [isLoadingAuth, setIsLoadingAuth] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const {
    register,
    formState: { errors },
    handleSubmit
  } = useForm({
    defaultValues: {
      email: "",
      password: ""
    },
    resolver: yupResolver(signInSchema)
  });
  const { mutateAsync: signInAccount, isPending: isSigningIn } =
    useSignInAccount();
  const { user, checkAuthUser } = useUserContext();

  const signin = async data => {
    const res = await signInAccount(data);
    if (!res) return toast.error("Wrong email or password");
    toast.success("Login successful");
    await checkAuthUser();
    navigate("/dashboard");
  };

  const loginWithGithub = async () => {
    console.log("loginWithGithub");
    await githubLogin();
  };

  const handleGithubAuth = async () => {
    const params = new URLSearchParams(location.search);
    const authstatus = params.get("authstatus");

    if (authstatus && authstatus === "success") {
      setIsLoadingAuth(true);
      const createdUser = await saveUserAfterGithubAuth();
      if (createdUser?.$id) {
        toast.success("Login in successful");
        await checkAuthUser();
        // navigate("/dashboard");
      } else {
        toast.error("Login failed");
        setIsLoadingAuth(false);
      }
    }

    if (authstatus && authstatus === "fail") {
      toast.error("Login failed");
    }
  };

  useEffect(() => {
    if (!isLoadingAuth) {
      handleGithubAuth();
    }
  }, []);

  return (
      <form onSubmit={handleSubmit(signin)} className="auth_form">
        <h1 className="h3-bold md:h2-bold">Welcoke Back!</h1>
        <div className="my-4">
          <input
            className="form_input"
            placeholder="Email"
            type="email"
            name="email"
            {...register("email")}
          />
          <p className="form_error">{errors?.email && errors.email.message}</p>
        </div>
        <div className="my-4">
          <input
            className="form_input"
            placeholder="Password"
            type="password"
            name="password"
            {...register("password")}
          />
          <p className="form_error">
            {errors?.password && errors.password.message}
          </p>
        </div>
        <div className="text-end">
          <Link className="font-bold" to="/forgot-password">
            Forget password?
          </Link>
        </div>
        <button
          disabled={isSigningIn || isLoadingAuth}
          className="submit_button"
          type="submit"
        >
          {isSigningIn ? (
            <>
              <Loader />
              Logining
            </>
          ) : (
            "Log In"
          )}
        </button>
        <button
          disabled={isLoadingAuth}
          onClick={loginWithGithub}
          className="bg-dark-2 text-white rounded w-full my-2 py-3 flex justify-center items-center gap-2"
          type="button"
        >
          {isLoadingAuth ? (
            <>
              <Loader />
              <img
                className="w-6 rounded-full"
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6dMFApzKfQirskhvPqknEBLdQefLj4YXbAw&usqp=CAU"
                alt="Github logo"
              />
              Logining..
            </>
          ) : (
            <>
              <img
                className="w-6 rounded-full"
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6dMFApzKfQirskhvPqknEBLdQefLj4YXbAw&usqp=CAU"
                alt="Github logo"
              />
              Log in with github
            </>
          )}
        </button>
        <p className="mt-3 text-sm flex gap-2 flex justify-center">
          Dont't have an account?
          <Link className="text-primary-600" to="/sign-up">
            Sign up
          </Link>
        </p>
      </form>
  );
};
