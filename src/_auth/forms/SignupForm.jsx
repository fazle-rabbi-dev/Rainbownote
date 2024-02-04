import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import toast from "react-hot-toast";

import { signUpSchema } from "@/lib/validation";
import { Loader } from "@/components";
import { useCreateUserAccount } from "@/lib/react-query/QueriesAndMutations";

export const SignupForm = () => {
  const {
    register,
    formState: { errors },
    handleSubmit
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: ""
    },
    resolver: yupResolver(signUpSchema)
  });
  const { mutateAsync: createAccount, isPending: isSigningUp } =
    useCreateUserAccount();
  const navigate = useNavigate();

  const signup = async data => {
    const res = await createAccount(data);

    if(res?.type === "user_already_exists"){
      toast.error(`Oops! this email address already registered.Try another email.`)
    }
    else if (res?.email){
      toast.success("Sign up successfull");
      navigate("/sign-in");
    }
    else{
      toast.error("Oops. Something went wrong.")
    }
  };

  return (
      <form onSubmit={handleSubmit(signup)} className="auth_form">
        <h1 className="h3-bold md:h2-bold">Create an account</h1>
        <div className="my-4">
          <input
            className="form_input"
            placeholder="Name"
            type="text"
            name="name"
            {...register("name")}
          />
          <p className="form_error">{errors?.name && errors.name.message}</p>
        </div>
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
        <button disabled={isSigningUp} className="submit_button" type="submit">
          {isSigningUp ? (
            <>
              <Loader />
              Signing up
            </>
          ) : (
            "Sign Up"
          )}
        </button>
        <p className="mt-3 text-sm flex gap-2 flex justify-center">
          Already have an account?
          <Link className="text-primary-600" to="/sign-in">
            Sign in
          </Link>
        </p>
      </form>
  );
};
