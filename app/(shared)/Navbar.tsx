"use client";

import React from "react";
import Link from "next/link";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Fade from "@mui/material/Fade";

type Props = {};

const Navbar = (props: Props) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <header className="mb-5">
      <nav className="flex justify-between items-center w-full bg-wh-900 text-wh-10 px-10 py-4">
        <div className="flex justify-between items-center gap-10">
          <Button
            id="holding-button"
            aria-controls={open ? "holding-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
          >
            Functions
          </Button>
          <Menu
            id="holding-menu"
            MenuListProps={{
              "aria-labelledby": "holding-button",
            }}
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            TransitionComponent={Fade}
          >
            <MenuItem onClick={handleClose}>
              <Link href="/upload-holding">Upload Porfolio</Link>
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <Link href="/create-holding">Input Portfolio Manually</Link>
            </MenuItem>

            <MenuItem onClick={handleClose}>
              <Link href="/upload-exchange-rate-yearly">
                Upload Exchange Rate Yearly
              </Link>
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <Link href="/upload-exchange-rate-monthly">
                Upload Exchange Rate Monthly
              </Link>
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <Link href="/upload-interest">Upload Interest</Link>
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <Link href="/upload-dividend">Upload Dividend</Link>
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <Link href="/dashboard">Dashboard</Link>
            </MenuItem>
          </Menu>
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
