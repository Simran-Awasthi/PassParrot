import React from "react";
import { FaBell, FaSmile, FaUserFriends } from "react-icons/fa";
import EmptyStateImg from "@/assets/illustrations/Chubbs DrawKit_Vector_Illustrations-11.png";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const Home = () => {
  return (
    <div className="w-full bg-neutral-700 min-h-screen flex flex-col justify-start items-center relative text-white">
      <div className=" bg-[url('assets/illustrations/star_pattern.png')] w-screen h-screen absolute top-0 left-0 z-0 opacity-5"></div>
      <div className="w-full max-w-xl flex flex-col items-center justify-start p-8 gap-8 z-10">
        <div className="flex flex-row justify-between items-center w-full">
          <span className="text-2xl font-bold">Accounts </span>
          <span className="text-2xl">
            <FaBell />
          </span>
        </div>
        <div className="flex flex-row justify-between w-full gap-4">
          <div className=" h-[100px] w-full flex flex-col justify-end items-start border-2 border-zinc-400 border-opacity-30 rounded-md p-4 bg-pink-400 bg-opacity-50 shadow-xl relative overflow-clip">
            <div className="text-[8rem] absolute right-5 top-[-5] rotate-[-30deg] opacity-10 ">
              <FaUserFriends />
            </div>
            <span className="text-2xl font-bold">add friends</span>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <div className=" h-[100px] w-full  flex flex-col justify-end items-start border-2 border-zinc-400 border-opacity-30 rounded-md p-4 bg-pink-400 shadow-xl bg-opacity-50 relative  overflow-clip">
                <div className="text-[8rem] absolute right-5 top-[-5] rotate-[-30deg] opacity-10 ">
                  <FaSmile />
                </div>

                <span className="text-2xl font-bold">add login</span>
              </div>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Edit profile</DialogTitle>
                <DialogDescription>
                  Make changes to your profile here. Click save when you're
                  done.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Name
                  </Label>
                  <Input
                    id="name"
                    value="Pedro Duarte"
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="username" className="text-right">
                    Username
                  </Label>
                  <Input
                    id="username"
                    value="@peduarte"
                    className="col-span-3"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">Save changes</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
        <div className="flex flex-row justify-between items-center p-2 border border-opacity-10 border-neutral-400 shadow-xl  bg-neutral-800  rounded-md py-6  gap-2 text-center ">
          <img
            src={EmptyStateImg}
            alt=""
            className=" px-8 object-contain h-[120px] "
          />
          <div className=" w-full flex flex-col justify-center items-start text-left gap-2">
            <span className="text-lg font-bold ">nothing found yet!</span>
            <span className="text-sm text-neutral-300">
              you have not added any account logins yet. start by adding few
              account details
            </span>
            <Button
              variant="default"
              onClick={() => {}}
              className="bg-pink-500 mt-2 "
            >
              add account
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
