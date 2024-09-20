"use client";
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export const Navbar = () => {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState<string | null>(null);

  useEffect(()=>{
    const token = localStorage.getItem('token');
    const storedUsername = localStorage.getItem('username');
    if(token){
      setIsAuthenticated(true);
      setUsername(storedUsername);
    } else{
      setIsAuthenticated(false);
      setUsername(null);
    }
  },[]);

  const handleLogout = () =>{
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    router.push('/sign-in');
  }
  if(isAuthenticated){
    return(
    <div className="fixed top-0 w-full h-14 px-4 border-b border-zinc-800 bg-zinc-950 shadow-sm flex items-center">
      <div className="md:max-w-screen-xl mx-auto flex items-center w-full justify-between">
      <div className="hover:opacity-75 transition items-center gap-x-2 hidden md:flex hover:cursor-pointer">
      <h3 className="text-2xl font-bold inline-flex bg-gradient-to-r from-neutral-100 via-slate-500 to-neutral-500 bg-[200%_auto] bg-clip-text leading-tight text-transparent dark:from-neutral-100 dark:via-slate-400 dark:to-neutral-400">
      Stack&apos;d
    </h3>
      </div>
        <div className="space-x-4 md:block md:w-auto flex items-center justify-between w-full">
          <Button
          onClick={handleLogout}
           size={"sm"} 
           variant={"outline"}
           className="font-semibold hover:bg-zinc-800 hover:text-white">
            Logout
          </Button>
          <div className="text-white text-xl">
            {username}
          </div>
        </div>
      </div>
    </div>
    );
  }
  else{
  return (
    <div className="fixed top-0 w-full h-14 px-4 border-b border-zinc-800 bg-zinc-950 shadow-sm flex items-center">
      <div className="md:max-w-screen-xl mx-auto flex items-center w-full justify-between">
        <Logo/>
        <div className="space-x-4 md:block md:w-auto flex items-center justify-between w-full">
          <Button size={"sm"} variant={"outline"} className="font-semibold hover:bg-zinc-800 hover:text-white" asChild>
            <Link href={"/sign-in"} className="text-white border-2">Login</Link>
          </Button>
          <Button size={"sm"} className="font-semibold bg-white text-black hover:bg-zinc-200" asChild>
            <Link href={"/sign-up"} className="text-black">Get Stack&apos;d for free</Link>
          </Button>
        </div>
      </div>
    </div>
  );
  }
};
