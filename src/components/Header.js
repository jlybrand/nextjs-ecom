import React from "react";
import Image from "next/image";

function Header() {
  return (
    <header>
      <div>
        <div className="navbar-logo">
          <Image src="/bird-logo.png" width={80} height={80} alt="bird logo" />
        </div>
      </div>
      <div></div>
    </header>
  );
}

export default Header;
