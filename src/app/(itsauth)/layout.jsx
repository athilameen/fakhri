"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { login } from "../../features/user";
import { useRouter } from "next/navigation";

import AuthHeader from "@/components/AuthHeader";
import Footer from "@/components/Footer";


export default function ItsAuthLayout({ children }) {

  const dispatch = useDispatch();
  const { push } = useRouter();

  const { isPending, isError, data: userData } = useQuery({
    queryKey: ["authByMe"],
    queryFn: () =>
      fetch("/api/auth/me")
        .then((res) => res.json())
        .catch(function (error) {
          fetch("/api/auth/logout")
            .then((res) => res.json())
            .then((data) => {
              //console.log(data);
              push("/");
            });
        }),
  });

  if (isPending) return;

  if(isError) {
    push("/"); 
  }

  if (userData) {
    dispatch(
      login({
        itsId: userData.userItsId,
      })
    );

    return (
      <>
        <AuthHeader />
        <main id="content" role="main">
          <div className="container">
            <div className="row">{children}</div>
          </div>
        </main>
        <Footer />
      </>
    );
  }
}
