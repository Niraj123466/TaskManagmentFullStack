import { Footer } from "./_components/footex";
import { Navbar } from "./_components/navbar";


const MarketingLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen bg-zinc-50">
        <Navbar />
      <main className=" pt-40 pb-20">{children}</main>
      <Footer/>
    </div>
  );
};

export default MarketingLayout;
