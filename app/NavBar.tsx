"use client";
import {Skeleton} from '@/app/components';
import { AiFillBug } from "react-icons/ai";
import Link from "next/link";
import React, { useState } from "react";
import { usePathname } from "next/navigation";
import classNames from "classnames"; //for checking purpose in here for the active link instead of writing conditional it is best to use the classNames from the package
import { useSession } from "next-auth/react";
import {
  Avatar,
  Box,
  Container,
  DropdownMenu,
  Flex,
  Text,
} from "@radix-ui/themes";
import Image from "next/image";

const NavBar = () => {
  return (
    <nav className="border-b mb-5 px-5 py-3">
      <Container>
        <Flex justify={"between"}>
          <Flex align={"center"} gap={"3"}>
            <Link href="/">
              <AiFillBug />
            </Link>
            <NavLinks />
          </Flex>
          <AuthStatus />
        </Flex>
      </Container>
    </nav>
  );
};

const NavLinks = () => {
  const currentPath = usePathname(); //this will store the current path we are in like /issues //we can use it fot the active link

  const links = [
    //this is considered as the best approach to define the paths on the navbar
    { lable: "Dashboard", href: "/" },
    { lable: "Issues", href: "/issues/list" },
  ];

  return (
    <ul className="flex space-x-6 text-zinc-500 ">
      {links.map((link) => (
        <li key={link.href}>
          <Link
            href={link.href}
            className={classNames({
              "nav-links": true, //always
              "text-zinc-900!": link.href === currentPath, //active
            })}
          >
            {link.lable}
          </Link>
        </li>
      ))}
    </ul>
  );
};

const AuthStatus = () => {
  const { status, data: session } = useSession(); //status will help us to know if the user is authniticated or not based on this we can show either Login or Logout //ALL info from google account

  if (status === "loading") return <Skeleton width='3rem'/>;

  if (status === "unauthenticated")
    return (
      <Link className="nav-link" href="/api/auth/signin">
        Login
      </Link>
    );

  //if it reach the return then we know the user is authniticated
  return (
    <Box>
      <>
        {/* {console.log(session)} */}
        <DropdownMenu.Root>
          <DropdownMenu.Trigger>
            <Avatar
              src={session!.user!.image!}
              className="cursor-pointer"
              fallback={"?"}
              size={"2"}
              radius="full"
              referrerPolicy="no-referrer"
            />
          </DropdownMenu.Trigger>
          <DropdownMenu.Content>
            <DropdownMenu.Label>
              <Text size={"2"}>{session!.user!.email}</Text>
            </DropdownMenu.Label>
            <DropdownMenu.Item color="purple">
              <Link href="/api/auth/signout">SignOut</Link>
            </DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Root>
      </>
    </Box>
  );
};

export default NavBar;
