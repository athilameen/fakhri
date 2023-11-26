import Link from "next/link";

const NormalHeader = () => {
  return (
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
  );
};

export default NormalHeader;
