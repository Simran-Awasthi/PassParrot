import { Avatar, AvatarImage } from "@/components/ui/avatar";
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
import { auth, firestore } from "@/firebase";
import { loreleiNeutral } from "@dicebear/collection";
import { createAvatar } from "@dicebear/core";
import {
  DocumentData,
  QueryDocumentSnapshot,
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import _, { update } from "lodash";
import { Plus } from "lucide-react";

import React, { useState } from "react";
type AddFriendsParms = {
  account: {
    sharedWith: string[];
    [key: string]: any;
  };
};

const AddFriend = ({ account }: AddFriendsParms) => {
  const [sharedWith, setSharedWith] = useState(account.sharedWith);
  const [usersFound, setUsersFound] = useState<
    QueryDocumentSnapshot<DocumentData, DocumentData>[]
  >([]);
  const findUsers = async (value: string) => {
    const userDocs = await getDocs(
      query(
        collection(firestore, `users`),
        where("email", ">=", value),
        where("email", "<=", value + "~")
      )
    );
    setUsersFound(userDocs.docs);
  };
  const debouncedFindUser = _.debounce(findUsers, 200);
  const addUserIdToAccount = async (uid: string) => {
    await updateDoc(doc(firestore, `accounts/${account.id}`), {
      sharedWith: [...sharedWith, uid],
    });
    setSharedWith([...sharedWith, uid]);
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className=" items-center  justify-center flex  bg-pink-400 rounded-full "
          variant={"outline"}
          size={"icon"}
        >
          <Plus className="text-white font-black" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add friends</DialogTitle>
          <DialogDescription>
            select friends and share this account.
          </DialogDescription>
        </DialogHeader>
        <div>
          <Input
            type="text"
            onChange={(e) => {
              debouncedFindUser(e.target.value);
            }}
          />
          <hr />
          <div>
            {usersFound
              .filter(
                (item) =>
                  item.get("uid") !== auth.currentUser?.uid &&
                  !sharedWith.includes(item.get("uid"))
              )
              .map((e) => {
                return (
                  <div className="w-full flex  justify-start items-center my-4 gap-2">
                    <Avatar>
                      <AvatarImage
                        src={`https://api.dicebear.com/7.x/lorelei-neutral/svg?seed=${e.get(
                          "email"
                        )}`}
                        className=" border-2 rounded-full"
                      ></AvatarImage>
                    </Avatar>
                    <p className="w-full">{e.get("email")}</p>
                    <Button
                      size={"sm"}
                      variant={"outline"}
                      onClick={async () => {
                        await addUserIdToAccount(e.get("uid"));
                      }}
                    >
                      <Plus size={12} />
                      Add
                    </Button>
                  </div>
                );
              })}
          </div>
        </div>
        <DialogFooter>
          <Button>Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddFriend;
