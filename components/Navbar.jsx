"use client";
import React from "react";
import { assets, BagIcon, BoxIcon, CartIcon, HomeIcon } from "@/assets/assets";
import Link from "next/link";
import { useAppContext } from "@/context/AppContext";
import Image from "next/image";
import { useClerk, UserButton } from "@clerk/nextjs";

const Navbar = () => {
  const { isSeller, router, user } = useAppContext();
  const { openSignIn } = useClerk();
  return (
    <nav className="flex items-center justify-between px-6 md:px-16 lg:px-32 py-3 border-b border-gray-300 text-white font-normal">
      <Image
        className="cursor-pointer w-90 md:w-90"
        onClick={() => router.push("/")}
         width={200}
  height={60}
        src={assets.logo}
        alt="logo"
      />
      <div className="flex items-center gap-4 lg:gap-8 max-md:hidden">
        <Link href="/" className="hover:opacity-80 transition">
          Home
        </Link>
        <Link href="/all-products" className="hover:opacity-80 transition">
          Shop
        </Link>
       <Link href="/#contact" scroll={true} className="hover:opacity-80 transition">
About Us
</Link>
        <Link href="/#contact" scroll={true} className="hover:opacity-80 transition">
  Contact
</Link>

       <button
  onClick={() => router.push("/seller")}
  className="text-xs border border-white text-white px-4 py-1.5 rounded-full hover:bg-white hover:text-black transition"
>
  Seller Dashboard
</button>

      </div>

      <ul className="hidden md:flex items-center gap-4 ">
        {user ? (
          <>
          <UserButton>
            <UserButton.MenuItems>
              <UserButton.Action label="Cart" labelIcon={<CartIcon/>} onClick={() => router.push("/cart")} />
            </UserButton.MenuItems>
            <UserButton.MenuItems>
              <UserButton.Action label="My Orders" labelIcon={<BagIcon/>} onClick={() => router.push("/my-orders")} />
            </UserButton.MenuItems>
            </UserButton> </>
        ) : (
          <button
            onClick={openSignIn}
            className="flex items-center gap-2 hover:opacity-80 transition"
          >
            <Image src={assets.user_icon} alt="user icon" />
            Account
          </button>
        )}
      </ul>

      <div className="flex items-center md:hidden gap-3">
        {isSeller && (
          <button
            onClick={() => router.push("/seller")}
            className="text-xs border px-4 py-1.5 rounded-full"
          >
            Seller Dashboard
          </button>
        )}
        {user ? (
          <>
          <UserButton>
             <UserButton.MenuItems>
              <UserButton.Action label="Home" labelIcon={<HomeIcon/>} onClick={() => router.push("/")} />
            </UserButton.MenuItems>
             <UserButton.MenuItems>
              <UserButton.Action label="Products" labelIcon={<BoxIcon/>} onClick={() => router.push("/all-products")} />
            </UserButton.MenuItems>
            <UserButton.MenuItems>
              <UserButton.Action label="Cart" labelIcon={<CartIcon/>} onClick={() => router.push("/cart")} />
            </UserButton.MenuItems>
            <UserButton.MenuItems>
              <UserButton.Action label="My Orders" labelIcon={<BagIcon/>} onClick={() => router.push("/my-orders")} />
            </UserButton.MenuItems>
            </UserButton> </>
        ) : (
          <button
            onClick={openSignIn}
            className="flex items-center gap-2 hover:opacity-80 transition"
          >
            <Image src={assets.user_icon} alt="user icon" />
            Account
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
