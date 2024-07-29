"use client";
import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

function Header() {
  const path = usePathname();
  useEffect(() => {});
  return (
    <div className="flex p-4 justify-between bg-secondary shadow-sm">
      <Image alt="logo" src={"/logo.svg"} width={50} height={50} />
      <ul className="hidden md:flex gap-6 items-center">
        <li
          className={`hover:text-orange-500 hover:font-bold transition-all cursor-pointer
        ${path === "/dashboard" && "text-orange-500 font-bold"}
        `}
        >
          Dashboard
        </li>
        <li
          className={`hover:text-orange-500 hover:font-bold transition-all cursor-pointer
        ${path === "/questions" && "text-orange-500 font-bold"}
        `}
        >
          Questions
        </li>
        <li
          className={`hover:text-orange-500 hover:font-bold transition-all cursor-pointer
        ${path === "/upgrade" && "text-orange-500 font-bold"}
        `}
        >
          Upgrade
        </li>
        <li
          className={`hover:text-orange-500 hover:font-bold transition-all cursor-pointer
        ${path === "/howitworks" && "text-orange-500 font-bold"}
        `}
        >
          How it works?
        </li>
      </ul>
      <div>
        {/* TODO: add shimmer until this loads taking some time to load */}
        <UserButton />
      </div>
    </div>
  );
}

export default Header;
