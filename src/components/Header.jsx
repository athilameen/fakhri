import Image from "next/image";
import Link from "next/link";

const Header = ({ itsLoading }) => {
  return (
    <header>
      <div className="container">
        <div className="row">
          <div className="fakhri-header flex">
            <div className="col-lg-3 col-md-3 col-sm-4 col-xs-12 fakhri-logo-section">
              <h1>
                {itsLoading && (
                  <Image
                    src="/logo.jpg"
                    alt="Fakhri Professional Association"
                    title="Fakhri Professional Association"
                    width={225}
                    height={71}
                    priority
                  />
                )}

                {!itsLoading && (
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
                )}
              </h1>
            </div>

            {!itsLoading && (
              <div className="col-lg-9 col-md-9 col-sm-8 col-xs-12 fakhri-menu-section flex justify-end items-end">
                <div className="fakhri-menus">
                  <ul>
                    <li className="noBorder">
                      <Link href="https://www.its52.com/Login.aspx?OneLogin=fakhri">
                        Sign Up
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
