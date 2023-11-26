import Link from "next/link";
import Image from "next/image";
import AuthHeader from "@/components/AuthHeader";
import Footer from "@/components/Footer";
import ProfileHeader from "@/components/ProfileHeader";

export default function ProfilePage() {
  return (
    <>
      <AuthHeader />
      <ProfileHeader page="profile" />
      <form id="form-profile">
        <div className="col-md-12 pt-7">
          <div className="row">
            <div className="col-md-2 col-xs-12  text-center">
              <div className=" mt-10 mb-5">
                <Image
                  className="img-thumbnail"
                  src="/logo.jpg"
                  alt="Profile"
                  width={225}
                  height={71}
                />
                <div
                  style={{
                    position: "absolute",
                    top: "190px",
                    left: "20px",
                    width: "155px",
                  }}
                >
                  <Link
                    href="/user/profile-picture"
                    className="btn btn-primary btn-xs"
                  >
                    <i className="fa fa-pencil" aria-hidden="true"></i> Change
                  </Link>
                  <Link
                    href="?remove-picture=1"
                    className="btn btn-primary btn-xs"
                  >
                    <i className="fa fa-trash" aria-hidden="true"></i> Delete
                  </Link>
                </div>
              </div>
            </div>

            <div className="col-md-10 col-xs-12">
              <div className="row">
                <div className="col-md-6">
                  <div className="form-group field-fullname required has-success">
                    <label className="control-label" htmlFor="fullname">
                      Fullname <em>*</em>
                    </label>
                    <input
                      type="text"
                      id="fullname"
                      className="form-control"
                      name="fullname"
                      placeholder="Full Name"
                    />
                    <div className="help-block"></div>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="form-group field-its_id">
                    <label className="control-label" htmlFor="its_id">
                      ITS ID
                    </label>
                    <input
                      type="text"
                      id="its_id"
                      className="form-control"
                      name="its_id"
                    />

                    <div className="help-block"></div>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="form-group field-email required">
                    <label className="control-label" htmlFor="email">
                      Email <em>*</em>
                    </label>
                    <input
                      type="text"
                      id="email"
                      className="form-control"
                      name="email"
                    />

                    <div className="help-block"></div>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="form-group field-jamaat">
                    <label className="control-label" htmlFor="jamaat">
                      Jamaat
                    </label>
                    <select id="jamaat" className="form-control" name="jamaat">
                      <option value="">Select Jamaat</option>
                      <option value="105">ABBASIYA (KUWAIT)</option>
                      <option value="539">ABOTTABAD</option>
                      <option value="301">ABRAQ KHAITAIN (KUWAIT)</option>
                    </select>
                    <div className="help-block"></div>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="form-group field-jamiaat">
                    <label className="control-label" htmlFor="jamiaat">
                      Jamiaat
                    </label>
                    <select
                      id="jamiaat"
                      className="form-control"
                      name="jamiaat"
                    >
                      <option value="">Select Jamiaat</option>
                      <option value="19">Ahmedabad</option>
                      <option value="1">Al-Khaleej</option>
                      <option value="32">Barwani</option>
                    </select>
                    <div className="help-block"></div>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="form-group field-age required">
                    <label className="control-label" htmlFor="age">
                      Age <em>*</em>
                    </label>
                    <input
                      type="text"
                      id="age"
                      className="form-control"
                      name="age"
                    />
                    <div className="help-block"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
      <Footer />
    </>
  );
}
