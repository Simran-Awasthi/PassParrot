import React, { HtmlHTMLAttributes, useEffect, useState } from "react";
import { FaBell, FaSignOutAlt, FaSmile, FaUserFriends } from "react-icons/fa";
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
import {
  Query,
  collection,
  doc,
  getDoc,
  onSnapshot,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { auth, firestore } from "@/firebase";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

interface Account {
  id: string;
  app: string;
  domain: string;
  username: string;
  password: string;
}
const Home = () => {
  const [formData, setFormData] = useState({
    app: "",
    domain: "",
    password: "",
    username: "",
  });
  const [dailogOpen, setDailogOpen] = useState(false);
  const [accountsData, setAccountsData] = useState<Array<Account>>([]);
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((data) => ({ ...data, [e.target.name]: e.target.value }));
  };

  const addAccountDetails = async () => {
    var id = crypto.randomUUID();
    await setDoc(doc(firestore, "/accounts/" + id), {
      ...formData,
      id: id,
      userId: auth.currentUser?.uid,
      sharedWith: [],
    });
    setDailogOpen(false);
  };
  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(
        collection(firestore, "accounts"),
        where("userId", "==", auth.currentUser ? auth.currentUser.uid : null)
      ),

      (snap) => {
        const accounts = snap.docs.map((e) => {
          return e.data() as Account;
        });
        setAccountsData(accounts);
      }
    );
    return unsubscribe;
  }, [auth.currentUser !== null]);
  let navigate = useNavigate();

  return (
    <div className="w-full bg-white min-h-screen flex flex-col justify-start items-center relative text-black">
      <div className=" bg-[url('assets/illustrations/star_pattern.png')] w-screen h-screen absolute top-0 left-0 z-0 opacity-[0.03]"></div>
      <div className="w-full max-w-xl flex flex-col items-center justify-start p-8 gap-8 z-10">
        <div className="flex flex-row justify-between items-center w-full">
          <span className="text-2xl font-bold">Accounts </span>
          <div className="flex gap-4 justify-center items-center">
            <button
              onClick={async () => {
                signOut(auth);
              }}
            >
              <FaSignOutAlt></FaSignOutAlt>
            </button>
            <span className="text-2xl">
              <FaBell />
            </span>
          </div>
        </div>
        <div className="flex flex-row justify-between w-full gap-4">
          <div className=" h-[100px] w-full flex flex-col justify-end items-start border-2 border-zinc-400 border-opacity-30 rounded-md p-4 bg-pink-400 bg-opacity-50 shadow-xl relative overflow-clip">
            <div className="text-[8rem] absolute right-5 top-[-5] rotate-[-30deg] opacity-10 ">
              <FaUserFriends />
            </div>
            <span className="text-2xl font-bold ">add friends</span>
          </div>

          <Dialog open={dailogOpen} onOpenChange={setDailogOpen}>
            <DialogTrigger asChild>
              <div className=" h-[100px] w-full  flex flex-col justify-end items-start border-2 border-zinc-400 border-opacity-30 rounded-md p-4 bg--400 shadow-xl bg-opacity-50 relative  overflow-clip">
                <div className="text-[8rem] absolute right-5 top-[-5] rotate-[-30deg] opacity-10 ">
                  <FaSmile />
                </div>
                <span className="text-2xl font-bold ">add login</span>
              </div>
            </DialogTrigger>

            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Add login</DialogTitle>
                <DialogDescription>
                  add your account information here.
                </DialogDescription>
              </DialogHeader>
              <div className=" flex w-full justify-between items-center border border-zinc-400 border-opacity-20 rounded-md p-4  ">
                <input
                  type="text"
                  value={formData.app}
                  name="app"
                  onChange={handleInputChange}
                  className="bg-transparent text-lg font-bold outline-none border-none focus:outline-none"
                  placeholder="App Name"
                />
                <div className="w-10 h-10 rounded-md font-bold text-lg flex justify-center items-center bg-neutral-300 ">
                  <span className="uppercase">
                    {formData.app.length > 0 ? formData.app.charAt(0) : "a"}
                  </span>
                </div>
              </div>
              <div className="grid gap-4 py-4">
                <div className="flex flex-col items-start gap-4">
                  <Label htmlFor="name" className="text-left text-xs pl-2 ">
                    Domain
                  </Label>
                  <Input
                    id="domain"
                    placeholder="website.com"
                    name="domain"
                    value={formData.domain}
                    onChange={handleInputChange}
                    className="col-span-3 "
                  />
                </div>
                <div className="flex flex-col items-start gap-4">
                  <Label htmlFor="username" className="text-left text-xs pl-2">
                    Username
                  </Label>
                  <Input
                    id="username"
                    placeholder="Username"
                    name="username"
                    value={formData.username}
                    onChange={handleInputChange}
                    className="col-span-3"
                  />
                </div>
                <div className="flex flex-col items-start gap-4">
                  <Label htmlFor="username" className="text-left text-xs pl-2">
                    Password
                  </Label>
                  <Input
                    id="password"
                    placeholder="password here"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="col-span-3"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit" onClick={addAccountDetails}>
                  add account
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
        {accountsData.length > 0 ? (
          <div className="w-full flex flex-col justify-start gap-4 py-4   ">
            {accountsData.map((e) => {
              return (
                <div
                  key={e.id}
                  onClick={() => {
                    navigate("/account-info?id=" + e.id, {
                      state: {
                        account: e,
                      },
                    });
                  }}
                  className="w-full flex flex-row gap-4 items-center bg-neutral-100 rounded-md p-3 px-6 text-black shadow-md drop-shadow-lg "
                >
                  <div className="h-10 w-10 flex justify-center items-center font-bold text-lg uppercase bg-pink-400 rounded-md">
                    <span>{e.app.charAt(0)}</span>
                  </div>
                  <div className="flex flex-col items-start justify-start text-neutral-400">
                    <span className="text-black text-lg">{e.app}</span>
                    <span>{e.domain}</span>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="flex flex-col justify-between items-center p-2  py-6  gap-2 text-center ">
            <img
              src={EmptyStateImg}
              alt=""
              className=" px-8 object-contain w-full max-w-[200px] "
            />
            <div className=" w-full flex flex-col justify-center items-center text-center gap-2 max-w-sm">
              <span className="text-lg font-bold ">nothing found yet!</span>
              <span className="text-sm text-neutral-300">
                you have not added any account logins yet. start by adding few
                account details
              </span>
              {/* <Button
              variant="default"
              onClick={() => {}}
              className="bg-pink-500 mt-2 "
            >
              add account
            </Button> */}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
