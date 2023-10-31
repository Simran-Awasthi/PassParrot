import React, { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import {
  Navigate,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { createAvatar } from "@dicebear/core";
import { loreleiNeutral } from "@dicebear/collection";

import { Button } from "@/components/ui/button";
import { Lock, PersonStanding, User } from "lucide-react";
import AddFriend from "./AddFriend";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import {
  DocumentData,
  DocumentSnapshot,
  doc,
  getDoc,
} from "firebase/firestore";
import { firestore } from "@/firebase";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const AccountInfo = () => {
  let navigate = useNavigate();
  const [seachParams, setSeachParams] = useSearchParams();
  const { state } = useLocation();

  useEffect(() => {
    console.log(seachParams.get("id"));
    console.log(state);
  }, [seachParams.get("id"), state]);

  const avatar = createAvatar(loreleiNeutral, {
    seed: state.account.userId,
  });

  const svg = avatar.toDataUriSync();

  return (
    <div className="w-full h-screen overflow-y-auto items-center justify-center flex flex-col p-8  ">
      <div className="flex flex-row items-center gap-4 justify-start w-full max-w-md mb-8   ">
        <button className="font-bold">
          <FaArrowLeft />
        </button>
        <h1 className="text-xl font-bold">Account-info</h1>
      </div>
      <section className="gap-12 w-full flex  flex-col items-center justify-center">
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
            <div className="w-full rounded-md flex flex-col">
              <div className="w-full max-w-md  items-center justify-center  flex  bg-neutral-100 gap-4 p-4 ">
                <div className="flex items-center justify-center px-2 py-2 bg-blue-300 rounded-md">
                  <User className=" font-bold  rounded-md" />
                </div>

                <div className="flex flex-col w-full">
                  <label htmlFor="name" className=" text-neutral-600 text-xs ">
                    EMAIL
                  </label>
                  <input
                    type="text"
                    value={state.account.email}
                    name="Email"
                    id=""
                    placeholder="example"
                    className=" bg-transparent outline-none "
                  />
                </div>
              </div>
              <hr className="w-full  h-0 bg-gray-800  rounded dark:bg-gray-700" />

              <div className="w-full max-w-md  items-center justify-between flex font-bold gap-4 bg-yellow-100 p-4">
                <div className=" flex items-center justify-center px-2 py-2 bg-yellow-200 rounded-md">
                  <Lock className="" />
                </div>

                <div className="flex flex-col w-full">
                  <label htmlFor="name" className=" text-neutral-600 text-xs">
                    PASSWORD
                  </label>
                  <div>
                    <input
                      name="password"
                      type="password"
                      readOnly
                      value={state.account.password}
                      id=""
                      placeholder="password"
                      className="bg-transparent outline-none"
                    />
                  </div>
                </div>
                <Button
                  variant={"outline"}
                  size={"sm"}
                  className=" bg-transparent hover:bg-yellow-300"
                >
                  Copy
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full flex  flex-col  items-center justify-center p-4  relative ">
          <div className="w-full max-w-md rounded-md flex flex-col shadow-md drop-shadow-md  bottom-5 ">
            <button className="absolute -top-5 right-4 bg-pink-300 text-white px-6 py-2 font-semibold text-sm rounded-lg hover:bg-pink-400">
              ADD FRIENDS
            </button>
            <div className="max-w-md  flex bg-neutral-100 py-10   px-12 items-center gap-8 rounded-md ">
              <div className="flex items-center [&>*:not(:first-child)]:-translate-x-4">
                {state.account.sharedWith.map((e: string) => {
                  return <UserAvtar uid={e} />;
                })}
              </div>
              <div className="flex max-w-md  ">
                <AddFriend account={state.account} />
              </div>
            </div>
          </div>
        </section>
      </section>
    </div>
  );
};

export default AccountInfo;
const UserAvtar = ({ uid }: { uid: string }) => {
  const [userData, setUserData] = useState<DocumentSnapshot<
    DocumentData,
    DocumentData
  > | null>(null);
  const getData = async () => {
    const userDoc = await getDoc(doc(firestore, "users", uid));
    setUserData(userDoc);
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Avatar>
            <AvatarImage
              src={`https://api.dicebear.com/7.x/lorelei-neutral/svg?seed=${userData?.get(
                "email"
              )}`}
              className=" border-2 rounded-full i"
            ></AvatarImage>
          </Avatar>
        </TooltipTrigger>
        <TooltipContent>
          <p className=" text-gray-400 text-lg font-serif  p-2">
            {userData?.get("name")}
          </p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
