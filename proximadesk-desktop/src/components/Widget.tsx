import { ClerkLoading, SignedIn, useUser } from "@clerk/clerk-react";
import React, { useEffect, useState } from "react";
import Loader from "./Loader";
import { fetchUser } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import MediaResources from "./MediaResources";
import { useMediaResources } from "@/hooks/UseMediaResources";

const Widget = () => {
  const {state, fethMediaResorces} = useMediaResources()
  const [profile, setProfile] = useState<{
    status: number;
    data: {
      subscription: {
        plan: "PRO" | "FREE";
      } | null;
      media: {
        id: string;
        screen: string | null;
        mic: string | null;
        preset: "HD" | "SD";
        camera: string | null;
        userId: string | null;
      } | null;
      id: string;
      email: string;
      firstname: string | null;
      lastname: string | null;
      createdAt: Date;
      clerkId: string;
    };
  } | null>(null);

  const { user } = useUser();
  useEffect(() => {
    if (user && user?.id) {
      fetchUser(user.id)
        .then((res) => {
          setProfile(res);
        })
        .catch((err) => {
          console.log(err);
        });
        fethMediaResorces()
    }
  }, [ user]);


  return (
    <div className=" p-5 ">
      <ClerkLoading>
        <Loader />
      </ClerkLoading>
      <SignedIn>
        {profile ? (
          <MediaResources state={state} data={profile?.data}   />
        ) : (
          <div className=" w-full h-full flex items-center justify-center ">
            <Loader2 className=" animate-spin  " size={20} />
          </div>
        )}
      </SignedIn>
    </div>
  );
};

export default Widget;
