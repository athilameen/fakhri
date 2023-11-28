"use client";

import Image from "next/image";
import Link from "next/link";

export default function AuthHeader() {

  function logoutHandler() {
    fetch("/api/auth/logout")
        .then((res) => res.json())
        .then((data) => {
          //console.log(data);
          window.location.href = '/';
    });
  }

  return (
    <header>
      <div className="container">
        <div className="row">
          <div className="fakhri-header flex">
            <div className="col-lg-3 col-md-3 col-sm-4 col-xs-12 fakhri-logo-section">
              <h1>
                <Link href="/">
                  <Image
                    src="/logo.jpg"
                    alt="Fakhri Professional Association"
                    title="Fakhri Professional Association"
                    width={225}
                    height={71}
                    priority
                  />
                </Link>
              </h1>
            </div>

            <div className="col-lg-9 col-md-9 col-sm-8 col-xs-12 fakhri-menu-section">
              <div className="fakhri-register">
                <div className="fakhri-caption-section">
                  <span className="caption">
                    Uniting Mumineen Professionals
                  </span>
                </div>
                <a onClick={logoutHandler} className="btn btn-register">
                  Log Out
                </a>
              </div>
              <div className="fakhri-menus">
                <ul>
                  <li>
                    <Link href="/profile">My Profile</Link>
                  </li>
                  <li>
                    <Link href="/directory">Members Directory</Link>
                  </li>
                  <li>
                    <Link href="/about">About</Link>
                  </li>
                  <li>
                    <Link href="/event">Events</Link>
                  </li>
                  <li>
                    <Link href="/careervideos">Career Videos</Link>
                  </li>
                  <li>
                    <Link href="/videos">Videos</Link>
                  </li>
                  <li>
                    <Link href="/contact">Contact</Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );

}
