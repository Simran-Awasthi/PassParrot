import React, { useState } from "react";
import { signUpWithEmailAndPassword, signInWithGoogle } from "../AuthService";
import { UserCredential } from "firebase/auth";
import { Outlet, useNavigate } from "react-router-dom";
import img3 from "@/assets/illustrations/Chubbs DrawKit_Vector_Illustrations-12.png";
import { FaGoogle, FaApple } from "react-icons/fa";

export default function AuthPage() {
  let navigate = useNavigate();
  const handleSignInGoogle = async () => {
    let user: UserCredential | null = await signInWithGoogle();
    console.log(user);
    if (user != null) {
      navigate("/");
    }
  };
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
  const handleSignInEmail: React.FormEventHandler<HTMLFormElement> = async (
    e
  ) => {
    e.preventDefault();
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
    <div className="flex flex-col justify-center items-center w-full relative overflow-hidden font-josefin  bg-white text-black">
      <div className="w-full h-full min-h-screen bg-transparent flex flex-row z-10 justify-start items-center overflow-y-auto scrollbar">
        <div className="w-[40%] hidden h-full min-h-screen lg:flex items-center justify-end p-6">
          <img
            src={img3}
            alt=""
            className="max-w-md scale-x-[-1] translate-x-[150px] "
          />
        </div>
        <div className="w-full lg:w-[60%] justify-center lg:items-start items-center flex flex-col">
          <div className="w-full max-w-lg flex flex-col gap-10 justify-start lg:items-start  items-center p-8">
            <h1 className="font-lobster text-2xl font-black m-0 text-black item ">
              sign in to <span className="text-pink-400"> pass</span>
              <span className="text-green-500">Parrot</span>
            </h1>

            <div className=" bg-white rounded-lg flex flex-col justify-center items-center w-full  max-w-md  dark:bg-white dark:text-black ">
              <button
                onClick={handleSignInGoogle}
                className="w-full border-2 border-neutral-600 border-opacity-30 flex justify-center items-center gap-2 px-6 py-4 rounded-lg font-bold"
              >
                <FaGoogle />
                <span>Continue With Google</span>
              </button>
            </div>
            <div className="flex w-full  justify-center items-center max-w-md">
              <hr className="w-full  border-gray-500"></hr>
              <span className=" w-full mx-2 text-gray-400  min-w-max">
                or sign in with email
              </span>
              <hr className="w-full border-gray-500"></hr>
            </div>
            <div className="w-full max-w-md justify-center items-start p-4 flex flex-col gap-4">
              <label htmlFor="username" className="text-black ">
                username:
              </label>
              <input
                type="text"
                name="username"
                placeholder="Your Username"
                required
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
                className="w-full border-2 border-neutral-600 border-opacity-30 flex justify-center items-center gap-2 px-6 py-2 rounded-lg font-bold"
              />

              <button className="w-full border-2 border-neutral-600 border-opacity-30 flex justify-center items-center px-6 py-4 rounded-lg font-bold bg-black  text-white">
                Sign In
              </button>
            </div>

            <button onClick={() => navigate("/signin")} className="self-center">
              <span className=" underline font-bold dark:text-black">
                Don't have an account? sign up
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
