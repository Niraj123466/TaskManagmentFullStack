
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const Navbar = () => {
  return (
    <div className="fixed top-0 w-full h-14 px-4  bg-zinc-950 shadow-sm flex items-center">
      <div className="md:max-w-screen-xl mx-auto flex items-center w-full justify-between">
        <Logo/>
        <div className="space-x-4 md:block md:w-auto flex items-center justify-between w-full">
          <Button size={"sm"} variant={"default"} className="text-white font-semibold" asChild>
            <Link href={"/sign-in"}>Login</Link>
          </Button>
          <Button size={"sm"} variant={"outline"} className="font-semibold bg-white hover:bg-zinc-200" asChild>
            <Link href={"/sign-up"} className="text-black">Get Stack'd for free</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};
