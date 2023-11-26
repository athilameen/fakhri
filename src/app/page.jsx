"use client";

import useSWR from "swr";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

import Image from "next/image";
import Link from "next/link";
import FakhriLogin from "@/components/FakhriLogin";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function Home(props) {
  const [isSubmitted, setIsSubmitted] = useState(true);
  const [fetchITSId, setFetchITSId] = useState();
  const [fetchITSLoading, setFetchITSLoading] = useState(false);
  const userAuth = useSelector((state) => state.user.value);
  const { push } = useRouter();

  if (userAuth.auth) {
    push("/user");
  }

  const searchParams = props.searchParams;
  const itsTerm = searchParams.ITS;

  const loadingCss =
    "flex items-center justify-center text-[#3989c1] text-2xl font-semibold min-h-[281px]";

  let content;
  content = (
    <>
      <h3>Idara al-Ta&apos;reef al-Shakhsi (eJamaat) Authentication </h3>
      <div className="col-md-6 !p-0 text-xl">
        <p>
          In order to view the contents of Fakhri Professionals&apos;
          Association, you must login using your{" "}
          <b>ITS (eJamaat) username and password</b>.
        </p>
        <p>
          Your ITS Username and password is the same as your eJamaat username
          which you use to register for miqaats or print Waaz passes.
        </p>

        <Link
          className="flex max-w-[240px]"
          href="https://www.its52.com/Login.aspx?OneLogin=fakhri"
        >
          <Image
            src="/login-ITS.png"
            alt="Login ITS"
            className=" border-0"
            width={239}
            height={86}
          />
        </Link>
      </div>
      <div className="col-md-6 p-0">
        <div className=" flex max-w-[300px] mx-auto">
          <Image
            src="/network-fpa.jpg"
            alt="FPA Network"
            className=" my-0"
            width={300}
            height={225}
            priority
          />
        </div>
      </div>
    </>
  );

  if (itsTerm) {
    content = <div className={loadingCss}>Loading...</div>;
  }

  useEffect(() => {
    if (itsTerm) {
      fetch("https://fakhriprofessionals.com/restapi/api.php?ITS=" + itsTerm)
        .then((res) => res.json())
        .then((data) => {
          setFetchITSId(data);
        });
    }
  }, [itsTerm]);

  return (
    <>
      {fetchITSId && <FakhriLogin itsId={fetchITSId.data?.itsId} />}
      <Header itsLoading={itsTerm} />
      <div className="col-md-12">{content}</div>
      <Footer />
    </>
  );
}
