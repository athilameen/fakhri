import Link from "next/link";

const ProfileHeader = ({ page }) => {
  return (
    <>
      <div className="col-lg-11 col-md-11 col-sm-11 col-xs-12">
        <ul className="nav nav-tabs mt-8">
          <li className={page === "profile" ? "active" : ""}>
            <Link href="/profile">
              <b>Profile</b>
            </Link>
          </li>
          <li className={page === "professional" ? "active" : ""}>
            <Link href="/user/professional">
              <b>Professional</b>
            </Link>
          </li>
          <li className={page === "achievement" ? "active" : ""}>
            <Link href="/user/achievement">
              <b>Achievements</b>
            </Link>
          </li>
          <li className={page === "maulana" ? "active" : ""}>
            <Link href="/user/maulana">
              <b>Maulana (TUS) Arz Print</b>
            </Link>
          </li>
        </ul>
      </div>

      <div className="col-lg-1 col-md-1 col-sm-1 col-xs-12">
        <Link
          href="/maulana-araz"
          className="btn btn-info btn-lg fak-btn"
          target="_blank"
        >
          Maulana (TUS) Araz Print
        </Link>
      </div>
    </>
  );
};

export default ProfileHeader;
