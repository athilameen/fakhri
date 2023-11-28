"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Loading from "@/components/Loading";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home(props) {
  const [isLoading, setIsLoading] = useState(false);
  const [fetchITSId, setFetchITSId] = useState();
  const { push } = useRouter();

  const searchParams = props.searchParams;
  const itsTerm = searchParams.ITS;

  if (!isLoading && itsTerm) {
    setIsLoading(true);
  }

  useEffect(() => {

    if (itsTerm) {
      fetch("https://fakhriprofessionals.com/restapi/api.php?ITS=" + itsTerm)
        .then((res) => res.json())
        .then((data) => {
          setFetchITSId(data);
        });
    }

    if (fetchITSId) {
      const itsId = fetchITSId.data.itsId;
      fetch("/api/auth/login", {
        method: "POST",
        body: JSON.stringify({ itsId: itsId }),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          //console.log(data);
          push("/profile");
        });
    }

    setIsLoading(false);

  }, [itsTerm, fetchITSId, push]);

  if (isLoading) {
    return (
      <Loading />
    );
  } else {
    return (
      <>
        <Header itsLoading={itsTerm} />
        <main id="content" role="main">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <h3>
                  Idara al-Ta&apos;reef al-Shakhsi (eJamaat) Authentication{" "}
                </h3>
                <div className="col-md-6 !p-0 text-xl">
                  <p>
                    In order to view the contents of Fakhri Professionals&apos;
                    Association, you must login using your{" "}
                    <b>ITS (eJamaat) username and password</b>.
                  </p>
                  <p>
                    Your ITS Username and password is the same as your eJamaat
                    username which you use to register for miqaats or print Waaz
                    passes.
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
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

}