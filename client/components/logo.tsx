import Link from "next/link";

export const Logo = () => {
  return (
    <Link href={"/"}>
      <div className="hover:opacity-75 transition items-center gap-x-2 hidden md:flex ">
      <h3 className="text-2xl font-bold inline-flex bg-gradient-to-r from-neutral-100 via-slate-500 to-neutral-500 bg-[200%_auto] bg-clip-text leading-tight text-transparent dark:from-neutral-100 dark:via-slate-400 dark:to-neutral-400">
      Stack&apos;d
    </h3>
      </div>
    </Link>
  );
};
