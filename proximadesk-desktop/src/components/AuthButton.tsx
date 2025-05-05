import { SignedOut, SignInButton, SignOutButton } from "@clerk/clerk-react";
import { Button } from "./ui/button";


const AuthButton = () => {
  return (
    <SignedOut>
      <div className=" flex items-center justify-center gap-x-3 h-screen ">
        <SignInButton>
            <Button  className=" bg-white!  text-zinc-900 hover:bg-zinc-200  " >
                Sign In
            </Button>
        </SignInButton>
        <SignOutButton>
            <Button className="  " >
                Sign Out
            </Button>
        </SignOutButton>
      </div>
    </SignedOut>
  );
};

export default AuthButton;
