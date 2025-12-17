/**
 * AuthProvider component is a wrapper that gives your entire app access to the current user's authentication status.
 *  Any component within this provider can then use the useSession hook from next-auth/react to get the session data.
 */
"use client";
import { SessionProvider } from "next-auth/react";
import React, { PropsWithChildren } from "react";

const AuthProvider = ({ children }: PropsWithChildren) => {
  return <SessionProvider>{children}</SessionProvider>;
};

export default AuthProvider;
