import React, { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useLocation, useSearchParams } from "react-router-dom";
import { createAvatar } from "@dicebear/core";
import { loreleiNeutral } from "@dicebear/collection";

import Visibility from "@material-ui/icons/Visibility";
import InputAdornment from "@material-ui/core/InputAdornment";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import { TextField, makeStyles } from "@material-ui/core";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
type CustomInputProps = {
  startAdornment?: React.ReactNode | undefined;
  endAdornment?: React.ReactNode | undefined;
};

type CustomTextFieldProps = {
  id: string;
  label: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  InputProps?: CustomInputProps | undefined;
};
const AccountInfo = () => {
  const [seachParams, setSeachParams] = useSearchParams();
  const { state } = useLocation();
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  useEffect(() => {
    console.log(seachParams.get("id"));
    console.log(state);
  }, [seachParams.get("id"), state]);

  const avatar = createAvatar(loreleiNeutral, {
    seed: state.account.userId,
  });

  const svg = avatar.toDataUriSync();

  return (
    <div className="w-full items-center justify-center flex flex-col p-8 ">
      <div className="flex flex-row items-center gap-4 justify-start w-full max-w-md mb-8  ">
        <button className="font-bold">
          <FaArrowLeft />
        </button>
        <h1 className="text-xl font-bold">Account-info</h1>
      </div>
      <section className="gap-20 w-full flex  flex-col items-center justify-center">
        <div className="w-full max-w-md items-center justify-between flex flex-row gap-4 bg-neutral-100 rounded-md shadow-md drop-shadow-md p-4">
          <img src={svg} alt="" className="h-10 w-10 rounded-full" />
          <div className=" flex flex-col items-start justify-center w-full">
            <h3 className="font-bold ">{state.account.app}</h3>
            <p className="">{state.account.domain}</p>
          </div>
          <div className="w-10 h-10 ">
            <div className="w-10 h-10  min-h-10 min-w-10 font-bold text-lg flex justify-center items-center bg-neutral-300 rounded-full ">
              <span className="uppercase">{state.account.app.charAt(0)}</span>
            </div>
          </div>
        </div>
        <section className="gap-20 w-full flex  flex-col  items-center justify-center p-4  relative ">
          <div className="w-full max-w-md rounded-md flex flex-col shadow-md drop-shadow-md  bottom-5 ">
            <button className="absolute -top-5 right-4 bg-pink-300 text-white px-6 py-2 font-semibold text-sm rounded-lg hover:bg-pink-400">
              DETAILS
            </button>
            <div className="w-full max-w-md  items-center justify-center  flex font-bold bg-neutral-100 gap-4 p-4 ">
              <div className="flex items-center justify-center px-2 py-2 bg-blue-300 rounded-md">
                <PersonOutlineIcon className=" font-bold  rounded-md" />
              </div>

              <div className="flex flex-col w-full">
                <label htmlFor="name" className=" text-neutral-600 text-xs ">
                  EMAIL
                </label>
                <input
                  type="name"
                  name="Email"
                  id=""
                  placeholder="example"
                  className=" bg-transparent outline-none "
                />
              </div>
            </div>
            <hr className="w-full  h-0 bg-gray-800  rounded dark:bg-gray-700" />

            <div className="w-full max-w-md  items-center justify-between flex font-bold gap-4 bg-yellow-100 p-4">
              <VpnKeyIcon className="h-10 w-10 rounded-md" />
              <div className="flex flex-col w-full">
                <label htmlFor="name" className=" text-neutral-600 text-xs">
                  PASSWORD
                </label>
                <TextField
                  name="password"
                  id=""
                  placeholder="password"
                  className=" bg-transparent outline-none  "
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  InputProps={
                    {
                      endAdornment: (
                        <div className="outline-none border-none flex items-end justify-end bg-transparent w-full">
                          <InputAdornment position="end">
                            <button onClick={handleTogglePasswordVisibility}>
                              {showPassword ? (
                                <Visibility />
                              ) : (
                                <VisibilityOff />
                              )}
                            </button>
                          </InputAdornment>
                        </div>
                      ),
                    } as CustomTextFieldProps["InputProps"]
                  }
                />
              </div>
            </div>
          </div>
        </section>
      </section>
    </div>
  );
};

export default AccountInfo;
