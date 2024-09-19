"use client";
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios from "axios";
import Link from "next/link";
import router from "next/navigation";
import { useRouter } from "next/navigation";
import { useState } from "react";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/api/auth/signin', { email, password });
      localStorage.setItem('token', response.data.token);
      router.push('/board');
    } catch (error) {
      console.error('Error signing in:', error);
    }
  };
  return (
    <div className="min-h-screen bg-zinc-950">
      <div className="grid grid-cols-2">
        <div className="col-span-1 h-screen flex justify-center items-center">
          <div className="flex items-center justify-center">
            <h1 className="text-4xl text-white font-bold">Stack'd</h1>
          </div>
        </div>
        <div className="col-span-1 h-screen flex items-center justify-center bg-neutral-200">
          <Card className="min-w-[400px]">
            <CardHeader>
              <CardTitle className="flex items-center justify-center">
                Sign in to Stack'd
              </CardTitle>
              <CardDescription className="flex items-center justify-center">
                Enter your credentials to access Stack'd
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label className="text-black font-semibold">Email</Label>
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="devansh@domain.com"
                  />
                </div>
                <div>
                  <Label className="text-black font-semibold">Password</Label>
                  <Input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="password"
                  />
                </div>
                <Button type="submit" className="w-full mt-4">
                  Submit
                </Button>
              </form>
            </CardContent>
            <CardFooter className="flex items-center justify-center">
              <CardDescription className="">
                Don't have an account?
                <Link href={"/sign-up"}>
                  <span className="text-blue-500"> Sign up</span>
                </Link>
              </CardDescription>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
