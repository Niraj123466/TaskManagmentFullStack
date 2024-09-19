import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const Footer = () => {
  return (
    <div className="fixed bottom-0 w-full h-14 px-4 p-2 border-t bg-zinc-50">
      <div className="md:max-w-screen-xl mx-auto flex items-center w-full justify-between">
        <Logo />
        <div className="space-x-4 md:block md:w-auto flex items-center justify-between w-full">
          <Button size={"sm"} variant={"ghost"} className="text-black" >
            Privacy Policy
          </Button>
          <Button size={"sm"}  variant={"ghost"} className="text-black">
          Terms of Service
          </Button>
        </div>
      </div>
    </div>
  );
};
