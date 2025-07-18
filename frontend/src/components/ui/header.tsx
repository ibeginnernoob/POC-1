"use client";

import {
  Navbar,
  NavBody,
  NavItems,
  MobileNav,
  MobileNavHeader,
  MobileNavToggle,
  MobileNavMenu,
  NavbarLogo,
  NavbarButton,
} from "@/components/lovable/resizenavbar";
import { useState } from "react";

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => setIsOpen(!isOpen);

  return (
    <Navbar>
      <NavBody>
        <NavbarLogo />
        <NavItems
          items={[
            { name: "Home", link: "#" },
            { name: "Features", link: "#features" },
          ]}
        />
        {/* <NavbarButton href="/login">Sign In</NavbarButton> */}
        <div className="flex gap-5">
        <NavbarButton variant="primary" href="/login">Sign In</NavbarButton>
        <NavbarButton variant="primary" href="/signup">Sign Up</NavbarButton>
        </div>
        
      </NavBody>

      <MobileNav visible>
        <MobileNavHeader>
          <NavbarLogo />
          <MobileNavToggle isOpen={isOpen} onClick={toggleOpen} />
        </MobileNavHeader>

        <MobileNavMenu isOpen={isOpen} onClose={toggleOpen}>
          <NavItems
            items={[
              { name: "Home", link: "#" },
              { name: "Features", link: "#features" },
              { name: "Pricing", link: "#pricing" },
            ]}
            onItemClick={toggleOpen}
          />
        </MobileNavMenu>
      </MobileNav>
    </Navbar>
  );
};
