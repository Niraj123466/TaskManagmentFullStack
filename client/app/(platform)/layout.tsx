// import { Navbar } from "@/app/(platform)/_components/navbar";
import { Navbar } from "../(marketing)/_components/navbar";
import { Footer } from "../(marketing)/_components/footex";

const PlatformLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen max-w-screen-2xl bg-zinc-950">
        <Navbar />
      <main className=" pt-12 pb-20">{children}</main>
      <Footer/>
    </div>
  );
};

export default PlatformLayout;
