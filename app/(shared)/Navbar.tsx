import React from "react";
import Link from "next/link";

type Props = {};

const Navbar = (props: Props) => {
  return (
    <header className="mb-5">
      <nav className="flex justify-between items-center w-full bg-wh-900 text-wh-10 px-10 py-4">
        <div className="flex justify-between items-center gap-10">
          <Link href="/upload-holding">Upload Porfolio</Link>
          <Link href="/create-holding">Input Portfolio Manually</Link>
          <Link href="/">Calculate the Capital Gain</Link>
        </div>
        <div>
          <p>Sign In</p>
        </div>
      </nav>

      <hr className="border-1 mx-10" />
    </header>
  );
};

export default Navbar;
