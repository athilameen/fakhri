import { NextResponse } from "next/server";
import mysqlDb from "@/lib/mysqldb";

export async function POST(req, { params }) {
  const itsId = params.id;
  const id_user = 545;

  const { profileData } = await req.json();
  const { email, professional, fullname, about_me, age, jamaat, jamiaat, gender, mobile_code, mobile, off_tel_code, off_tel, res_tel_code, res_tel, website, linkedin, twitter, instagram, email_privacy, mobile_privacy, resph_privacy, offph_privacy } =
    profileData;

  const emailPrivacy = (email_privacy) ? 1 : 0;
  const mobilePrivacy = (mobile_privacy) ? 1 : 0;
  const resphPrivacy = (resph_privacy) ? 1 : 0;
  const offphPrivacy = (offph_privacy) ? 1 : 0;

  try {
    const userUpdate = await mysqlDb.query(
      `UPDATE fpa_user SET email="${email}", professional="${professional}" WHERE id_user=${id_user}`
    );
    
    const profileUpdate = await mysqlDb.query(
      `UPDATE fpa_profile SET fullname="${fullname}", educational_background="${about_me}", age="${age}", id_city="${jamaat}", id_country="${jamiaat}", gender="${gender}", mobile_code="${mobile_code}", mobile="${mobile}", off_tel_code="${off_tel_code}", off_tel="${off_tel}", res_tel_code="${res_tel_code}", res_tel="${res_tel}", website="${website}", linkedin="${linkedin}", twitter="${twitter}", instagram="${instagram}", email_privacy="${emailPrivacy}", mobile_privacy="${mobilePrivacy}", resph_privacy="${resphPrivacy}", offph_privacy="${offphPrivacy}"   WHERE id_user=${id_user}`
    );

    if (profileUpdate) {
      return NextResponse.json(
        { message: "Your profile has been updated successfully.", professional:professional },
        { status: 201 }
      );
    } else {
      return NextResponse.json(
        { message: "User data couldn't update", data: [] },
        { status: 204 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { message: "Something wrong while update the user data!" },
      { status: 500 }
    );
  }
}

export async function GET(req, { params }) {
  //const itsId = params.id;
  const id_user = 545;

  try {
    const [userData] = await mysqlDb.execute(
      `SELECT user.id_user, user.email, user.its_id, user.professional, user.image, profile.fullname, profile.gender, profile.age, profile.id_city, profile.id_country, profile.educational_background, profile.off_tel_code, profile.off_tel, profile.res_tel_code, profile.res_tel, profile.mobile_code, profile.mobile, profile.website, profile.linkedin, profile.twitter, profile.instagram, profile.email_privacy, profile.mobile_privacy, profile.resph_privacy, profile.offph_privacy
      FROM fpa_user as user
      INNER JOIN fpa_profile as profile ON profile.id_user = user.id_user
      WHERE user.id_user=${id_user}`
    );

    return NextResponse.json({ message: "User Data", data: userData[0]}, { status: 200 })

    /*if (userData[0]) {
      return NextResponse.json(
        { message: "User data found", data: userData[0] },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { message: "User data not Found!", data: '' },
        { status: 404 }
      );
    }*/

  } catch (error) {
    return NextResponse.json(
      { message: "Something wrong while fetch the user data!!" },
      { status: 500 }
    );
  }
}
