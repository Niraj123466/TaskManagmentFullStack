
import { Button } from "@/components/ui/button";
import { Medal } from "lucide-react";
import Link from "next/link";

const MarketingPage = () => {
  return (
    <div className="flex items-center justify-center flex-col">
      <div className="flex items-center justify-center flex-col">
        <div className="mb-4 flex items-center border shadow-lg p-4 bg-zinc-50 text-zinc-700 rounded-full uppercase">
          <Medal className="h-6 w-6 mr-3" />
          Manage your tasks efficiently.
        </div>
        <h1 className="text-3xl font-semibold md:text-5xl text-center text-neutral-800 mb-6">
          Manage smart, move fast
        </h1>
      </div>
      <div className="text-sm md:text-xl text-neutral-400 mt-2 max-w-xs md:max-wd-2xl text-center mx-auto">
      </div>
      <Button className="mt-6 font-semibold" size={"lg"}  asChild>
        <Link href={"/sign-up"}>Get Stack'd</Link>
      </Button>
    </div>
  );
};

export default MarketingPage;
