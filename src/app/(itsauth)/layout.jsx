"use client";

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../features/user";

import { useEffect, useState } from "react";
import axios from "axios";
import AuthHeader from "@/components/AuthHeader";
import Footer from "@/components/Footer";

import { useRouter } from "next/navigation";

export default function ItsAuthLayout({
  children, 
}) {

  const dispatch = useDispatch();
  const { push } = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [userData, setUserData] = useState();

  useEffect(() => {
    setIsLoading(true);
    axios
      .get("/api/auth/me")
      .then(function (response) {
        setUserData(response.data.userItsId);
        dispatch(
          login({
              itsId:response.data.userItsId
          })
        );
      })
      .catch(function (error) {
        fetch("/api/auth/logout")
          .then((res) => res.json())
          .then((data) => {
            //console.log(data);
            push("/");
          });
      });
    setIsLoading(false);
  }, [push, dispatch]);

  if (isLoading) {
    return;
  }

  if (userData) {
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
