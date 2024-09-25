import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";

export const Footer = () => {
  return (
    <div className="fixed bottom-0 w-full h-20 px-4 p-2 border-t border-zinc-700 bg-zinc-950">
      <div className="md:max-w-screen-xl mx-auto flex flex-col md:flex-row items-center justify-between w-full">
        <Logo />
        <div className="flex items-center justify-between w-full md:w-auto space-y-2 md:space-y-0">
          <div className="text-white text-sm md:text-base space-x-4 flex flex-col md:flex-row">
            <a href="mailto:moreniraj49@gmail.com" className="hover:underline">moreniraj49@gmail.com</a>
            <span>|</span>
            <a href="tel:+919579531214" className="hover:underline">+91 95795 31214</a>
          </div>
          <div className="space-x-4 md:block flex items-center justify-between w-full md:w-auto">
            <Button size={"sm"} variant={"ghost"} className="text-white">
              Privacy Policy
            </Button>
            <Button size={"sm"} variant={"ghost"} className="text-white">
              Terms of Service
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
