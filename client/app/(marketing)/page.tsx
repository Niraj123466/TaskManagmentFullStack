
import { Button } from "@/components/ui/button";
import { Medal } from "lucide-react";
import Link from "next/link";

const MarketingPage = () => {
  return (
    <div className="flex items-center justify-center flex-col">
      <div className="flex items-center justify-center flex-col">
        <div className="mb-4 flex items-center border-2 border-neutral-700  shadow-lg p-4 bg-neutral-950 text-zinc-50 rounded-full uppercase">
          <Medal className="h-6 w-6 mr-3" />
          Manage your tasks efficiently.
        </div>
        <h1 className="text-4xl font-bold inline-flex bg-gradient-to-r from-neutral-100 via-slate-500 to-neutral-500 bg-[200%_auto] bg-clip-text leading-tight text-transparent dark:from-neutral-100 dark:via-slate-400 dark:to-neutral-400">
          Manage smart, move fast
        </h1>
      </div>
      <div className="text-sm md:text-xl text-neutral-400 mt-2 max-w-xs md:max-wd-2xl text-center mx-auto">
      </div>
      <Button className="mt-6 font-semibold bg-white text-black hover:bg-zinc-300 hover:text-black" size={"lg"}  asChild>
        <Link href={"/sign-up"} >Get Stack&apos;d</Link>
      </Button>
    </div>
  );
};

export default MarketingPage;
