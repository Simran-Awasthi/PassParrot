import { signUpWithEmailAndPassword } from "@/Authservice";
import { auth } from "@/firebase";
import { UserCredential, signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  let navigate = useNavigate();
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const handleDataChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData((data) => ({
      ...data,
      [e.target.name]: e.target.value,
    }));
  };
  const handleSignUpEmail = async () => {
    const user: UserCredential | null = await signUpWithEmailAndPassword(
      data.name,
      data.email,
      data.password
    );
    console.log(user);
    if (user != null) {
      navigate("/");
    }
  };
  return (
    <div className="flex flex-col items-center w-full justify-center">
      <div className="flex flex-col justify-center items-center w-full relative overflow-hidden font-josefin  bg-white text-black"></div>
      <div className="w-full  justify-center  items-center flex flex-col">
        <div className="w-full max-w-lg flex flex-col gap-10 justify-start   items-center p-8">
          <h1 className="font-lobster text-2xl font-black m-0 text-black item ">
            create your <span className="text-pink-400">pass</span>
            <span className="text-green-500">Parrot </span>
            account
          </h1>

          <div className="w-full max-w-md justify-center items-start p-4 flex flex-col gap-4">
            <label htmlFor="name" className="text-black ">
              name:
            </label>
            <input
              type="text"
              name="name"
              placeholder="Your name"
              required
              onChange={handleDataChanged}
              className="w-full border-2 border-neutral-600 border-opacity-30 flex justify-center items-center gap-2 px-6 py-2 rounded-lg font-bold  "
            />
            <label htmlFor="email" className="text-black ">
              email:
            </label>
            <input
              type="text"
              name="email"
              placeholder="Your email"
              required
              onChange={handleDataChanged}
              className="w-full border-2 border-neutral-600 border-opacity-30 flex justify-center items-center gap-2 px-6 py-2 rounded-lg font-bold  "
            />
            <label htmlFor="password" className="text-black">
              password:
            </label>
            <input
              type="password"
              name="password"
              placeholder="Your Password"
              required
              onChange={handleDataChanged}
              className="w-full border-2 border-neutral-600 border-opacity-30 flex justify-center items-center gap-2 px-6 py-2 rounded-lg font-bold"
            />

            <button
              className="w-full border-2 border-neutral-600 border-opacity-30 flex justify-center items-center px-6 py-4 rounded-lg font-bold bg-black  text-white"
              onClick={handleSignUpEmail}
            >
              Create Account
            </button>
          </div>

          <button onClick={() => navigate("/auth")} className="self-center">
            <span className=" underline font-bold dark:text-black">
              Already have an account? sign in
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
