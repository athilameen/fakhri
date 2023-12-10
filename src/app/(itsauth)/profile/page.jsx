"use client";

import { IoCloudUploadOutline } from "react-icons/io5";
import { FaPlusCircle } from "react-icons/fa";
import { FaPencilAlt } from "react-icons/fa";
import { RiDeleteBin5Fill } from "react-icons/ri";

import { UploadButton, UploadDropzone, Uploader } from "@/lib/uploadthing";

import axios from "axios";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import ProfileHeader from "@/components/ProfileHeader";
import { useSelector, useDispatch } from "react-redux";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  fetchUserProfile,
  updateUserProfile,
  fetchCityList,
  fetchCountryList,
} from "@/util/http";

import ProfileLoading from "@/components/ProfileLoading";
import ProfileError from "@/components/ProfileError";

import { professional, profileForm } from "../../../features/user";
import NotificationMessage from "@/components/NotificationMessage";

function ITSUser() {
  const getItsId = useSelector((state) => state.user.value.itsId);
  const isProfessional = useSelector(
    (state) => state.user.professional.isProfessional
  );
  return [getItsId, isProfessional];
}

function IsProfileNotification() {
  const getProfileNotification = useSelector(
    (state) => state.user.profileForm.notification
  );
  return getProfileNotification;
}

const schema = yup.object().shape({
  fullname: yup.string().required("Fullname cannot be blank"),
  email: yup
    .string()
    .email("Please enter a valid email!")
    .required("Email cannot be blank"),
  mobile: yup
    .string()
    .required("Mobile cannot be blank")
    .matches(/^[0-9]/, "Only digits allowed")
    .min(9, "Mobile minimum 9 character expected")
    .max(13, "Mobile shouldn't more up to 13 characters"),
  jamaat: yup.string().required("Jamaat cannot be blank"),
  jamiaat: yup.string().required("Jamiaat cannot be blank"),
  age: yup
    .string()
    .required("Age cannot be blank")
    .matches(/^[0-9]/, "Only digits allowed")
    .min(2, "Age should be 2 digits"),
  gender: yup.string().required("Gender cannot be blank"),
  mobile_code: yup.string().required("Mobile Code cannot be blank"),
  about_me: yup.string().required("About Me cannot be blank"),
  professional: yup.string().required("Are you a Professional?"),
});

export default function ProfilePage() {

  const profileNotificationMsg = IsProfileNotification();
  const [areProfessional, setAreProfessional] = useState();
  const [emailPrivacy, setEmailPrivacy] = useState(false);
  const [mobilePrivacy, setMobilePrivacy] = useState(false);
  const [resphPrivacy, setResphPrivacy] = useState(false);
  const [offphPrivacy, setOffphPrivacy] = useState(false);
  const [fetchItsId, setFetchItsId] = useState(undefined);

  const [uploading, setUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  const [selectedFile, setSelectedFile] = useState();
  const [profileImage, setProfileImage] = useState('/user_img/profile-picture.jpeg');

  const [getItsId, isProfessional] = ITSUser();

  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const { push } = useRouter();

  useEffect(() => {
    dispatch(
      profileForm({
        notification: {
          success: "",
          error: "",
        },
      })
    );
  }, []);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isValid, isDirty },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const { data: cityList } = useQuery({
    queryKey: ["cityList"],
    queryFn: ({ signal }) => fetchCityList({ signal }),
    enabled: !fetchItsId,
  });

  const { data: countryList } = useQuery({
    queryKey: ["countryList"],
    queryFn: ({ signal }) => fetchCountryList({ signal }),
    enabled: !fetchItsId,
  });

  const {
    data: userProfileData,
    isPending: userDataPending,
    isLoading: userDataLoading,
    isError: userDataError,
    error: userDataErrorMessage,
  } = useQuery({
    queryKey: ["userProfile", getItsId],
    queryFn: ({ signal }) => fetchUserProfile({ signal, its_id: getItsId }),
    enabled: !fetchItsId,
    staleTime: 100,
    gcTime: 100,
  });

  const {
    mutate: submitProfile,
    isLoading: submitLoading,
    data: userUpdate,
  } = useMutation({
    mutationFn: async (profileData) => updateUserProfile(profileData),
    onSuccess: ({ data }) => {
      queryClient.invalidateQueries(["userProfile", getItsId]);

      dispatch(
        professional({
          isProfessional: data?.professional,
        })
      );

      if (data?.professional === "1") {
        dispatch(
          profileForm({
            form: "Success",
          })
        );
        push("/user/professional");
      } else {
        dispatch(
          profileForm({
            notification: {
              success: data.message,
            },
          })
        );
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
      }
    },
    onError: () => {
      console.log("error");
    },
  });

  const handleUpload = async (e) => {
    e.preventDefault();

    if (!selectedFile) return;

    setUploading(true);

    try {
      const pictureData = new FormData();
      pictureData.set("upload_pic", selectedFile);

      const { data } = await axios.post("/api/users/upload", pictureData);

      setProfileImage(data.image);
      setSelectedImage("");

      dispatch(
        profileForm({
          notification: {
            success: data.message,
          },
        })
      );
    } catch (e) {
      setUploadSuccess(true);
      dispatch(
        profileForm({
          notification: {
            error: e.response.data.message,
          },
        })
      );
    }

    setUploading(false);
  };

  const handleChangeProfile = async (e) => {
    e.preventDefault();
    setProfileImage("");
  };

  const handleDeleteProfile = async (e) => {
    e.preventDefault();

    if (!profileImage) return;

    try {
      const { data } = await axios.delete("/api/users/upload");
      setProfileImage("");

      dispatch(
        profileForm({
          notification: {
            success: data.message,
          },
        })
      );
    } catch (e) {
      // Handle errors here
      dispatch(
        profileForm({
          notification: {
            error: e.response.data.message,
          },
        })
      );
    }
  };

  let notificationMessage;
  if (
    profileNotificationMsg &&
    (profileNotificationMsg.success || profileNotificationMsg.error)
  ) {
    notificationMessage = (
      <NotificationMessage
        alertClass={profileNotificationMsg.success ? "success" : "danger"}
      >
        {profileNotificationMsg.success
          ? profileNotificationMsg.success
          : profileNotificationMsg.error}
      </NotificationMessage>
    );
  }

  if (userDataPending || userDataLoading) return <ProfileLoading />;

  if (userDataError) return <ProfileError>{userDataErrorMessage}</ProfileError>;

  if (userProfileData) {
    const {
      id_user,
      email,
      its_id,
      professional,
      image,
      fullname,
      gender,
      age,
      id_city,
      id_country,
      educational_background,
      off_tel_code,
      off_tel,
      res_tel_code,
      res_tel,
      mobile_code,
      mobile,
      website,
      linkedin,
      twitter,
      instagram,
      email_privacy,
      mobile_privacy,
      resph_privacy,
      offph_privacy,
    } = userProfileData;

    if (fetchItsId === undefined) {
      console.log("run");
      setFetchItsId(its_id);

      if (image) {
        setProfileImage(image);
      }

      if (professional === 1) {
        setAreProfessional(true);
      } else {
        setAreProfessional(false);
      }

      if (email_privacy === 1) {
        setEmailPrivacy(true);
      }

      if (mobile_privacy === 1) {
        setMobilePrivacy(true);
      }

      if (resph_privacy === 1) {
        setResphPrivacy(true);
      }

      if (offph_privacy === 1) {
        setOffphPrivacy(true);
      }
    }

    console.log(selectedImage);

    return (
      <>
        {isProfessional === "" ? (
          professional === 0 ? (
            <div className="col-md-12">
              <h3>Profile</h3>
            </div>
          ) : (
            <ProfileHeader page="profile" />
          )
        ) : isProfessional === "0" ? (
          <div className="col-md-12">
            <h3>Profile</h3>
          </div>
        ) : (
          <ProfileHeader page="profile" />
        )}
        {notificationMessage}

        <form
          id="form-profile"
          onSubmit={handleSubmit((profileData) => {
            submitProfile({ id: getItsId, profileData });
          })}
        >
          <div className="col-md-12 pt-7">
            <div className="row">
              <div className="col-md-2 col-xs-12 text-center">
                <div className=" relative mt-8 mb-5 h-[180px] rounded flex items-center justify-center border-2 border-dashed cursor-pointer">
                  {profileImage ? (
                    <div id="profileChange">
                      <Image
                        className="p-3"
                        src={profileImage}
                        alt="Profile"
                        width={140}
                        height={152}
                        quality={75}
                        priority
                      />

                      <div className="flex justify-center absolute bottom-6 left-0 right-0 ">
                        {profileImage === "/user_img/profile-picture.jpeg" ? (
                          <button
                            onClick={handleChangeProfile}
                            className=" !flex items-center btn btn-primary btn-xs mx-auto"
                          >
                            <FaPlusCircle className=" mr-1" /> Add
                          </button>
                        ) : (
                          <>
                            <button
                              onClick={handleChangeProfile}
                              className=" !flex items-center btn btn-primary btn-xs mx-1"
                            >
                              <FaPencilAlt className=" mr-1" />
                              Change
                            </button>
                            <button
                              onClick={handleDeleteProfile}
                              className=" !flex items-center btn btn-primary btn-xs mx-1"
                            >
                              <RiDeleteBin5Fill className=" mr-1" />
                              Delete
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                  ) : (
                    <div id="profileUpload" className=" w-full h-full">
                      <div className=" flex items-center justify-center mx-auto h-full text-5xl text-[#caccd2]">
                        <UploadButton
                          endpoint="profilePicture"
                          onClientUploadComplete={(res) => {
                            setProfileImage(res[0].url);
                            console.log("Files: ", res);
                            dispatch(
                              profileForm({
                                notification: {
                                  success:
                                    "Profile picture updated successfully",
                                },
                              })
                            );
                            setUploadSuccess(true);
                          }}
                          onUploadError={(error) => {
                            dispatch(
                              profileForm({
                                notification: {
                                  error: error.message,
                                },
                              })
                            );
                            setUploadSuccess(false);
                          }}
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="col-md-10 col-xs-12">
                <div className="row">
                  <div className="col-md-6">
                    <div
                      className={
                        "form-group field-fullname " +
                        (errors?.fullname ? "has-error" : "")
                      }
                    >
                      <label className="control-label" htmlFor="fullname">
                        Fullname <em>*</em>
                      </label>
                      <input
                        className="form-control"
                        defaultValue={fullname}
                        {...register("fullname")}
                      />
                      <div className="help-block">
                        {errors?.fullname?.message}
                      </div>
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
                        value={getItsId}
                        disabled
                      />
                      <div className="help-block"></div>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6">
                    <div
                      className={
                        "form-group field-fullname " +
                        (errors?.email ? "has-error" : "")
                      }
                    >
                      <label className="control-label" htmlFor="email">
                        Email <em>*</em>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        defaultValue={email}
                        {...register("email")}
                      />
                      <div className="help-block">{errors?.email?.message}</div>
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div
                      className={
                        "form-group field-jamaat " +
                        (errors?.jamaat ? "has-error" : "")
                      }
                    >
                      <label className="control-label" htmlFor="jamaat">
                        Jamaat
                      </label>
                      <select
                        id="jamaat"
                        className="form-control"
                        defaultValue={id_city}
                        {...register("jamaat")}
                      >
                        <option value="">Select Jamaat</option>
                        {cityList &&
                          cityList.map((city) => (
                            <option key={city.id_city} value={city.id_city}>
                              {city.name}
                            </option>
                          ))}
                      </select>
                      <div className="help-block">
                        {errors?.jamaat?.message}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6">
                    <div
                      className={
                        "form-group field-jamiaat " +
                        (errors?.jamiaat ? "has-error" : "")
                      }
                    >
                      <label className="control-label" htmlFor="jamiaat">
                        Jamiaat
                      </label>
                      <select
                        id="jamiaat"
                        className="form-control"
                        defaultValue={id_country}
                        {...register("jamiaat")}
                      >
                        <option value="">Select Jamiaat</option>
                        {countryList &&
                          countryList.map((country) => (
                            <option
                              key={country.id_country}
                              value={country.id_country}
                            >
                              {country.name}
                            </option>
                          ))}
                      </select>
                      <div className="help-block">
                        {errors?.jamiaat?.message}
                      </div>
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div
                      className={
                        "form-group field-age " +
                        (errors?.age ? "has-error" : "")
                      }
                    >
                      <label className="control-label" htmlFor="age">
                        Age <em>*</em>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        defaultValue={age}
                        {...register("age")}
                      />
                      <div className="help-block">{errors?.age?.message}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-6">
            <div
              className={
                "form-group field-gender " + (errors?.gender ? "has-error" : "")
              }
            >
              <label className="control-label" htmlFor="gender">
                Gender
              </label>
              <select
                className="form-control"
                defaultValue={gender}
                {...register("gender")}
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>

              <div className="help-block">{errors?.gender?.message}</div>
            </div>
          </div>

          <div className="col-md-6">
            <div
              className={
                "form-group field-mobile_code " +
                (errors?.mobile_code ? "has-error" : "")
              }
            >
              <label className="control-label" htmlFor="mobile_code">
                Mobile <em>*</em>
              </label>
              <input
                type="text"
                id="mobile_code"
                className="form-control"
                placeholder="Code"
                defaultValue={mobile_code}
                {...register("mobile_code")}
              />

              <div className="help-block mobileErrorDisplay">
                {errors?.mobile_code?.message}
              </div>
            </div>

            <div
              className={
                "form-group field-mobile " + (errors?.mobile ? "has-error" : "")
              }
            >
              <input
                type="text"
                className="form-control"
                defaultValue={mobile}
                {...register("mobile")}
              />
              <div className="help-block">{errors?.mobile?.message}</div>
            </div>
          </div>

          <div className="col-md-6">
            <div className="form-group field-res_tel_code">
              <label className="control-label" htmlFor="res_tel_code">
                Res. phone
              </label>
              <input
                type="text"
                id="res_tel_code"
                className="form-control"
                placeholder="Code"
                defaultValue={res_tel_code}
                {...register("res_tel_code")}
              />
              <div className="help-block"></div>
            </div>
            <div className="form-group field-res_tel">
              <label className="control-label" htmlFor="res_tel">
                &nbsp;
              </label>
              <input
                type="text"
                id="res_tel"
                className="form-control"
                style={{ marginLeft: "5%" }}
                defaultValue={res_tel}
                {...register("res_tel")}
              />
              <div className="help-block"></div>
            </div>
          </div>

          <div className="col-md-6">
            <div className="form-group field-off_tel_code">
              <label className="control-label" htmlFor="off_tel_code">
                Off. phone
              </label>
              <input
                type="text"
                id="off_tel_code"
                className="form-control"
                placeholder="Code"
                defaultValue={off_tel_code}
                {...register("off_tel_code")}
              />
              <div className="help-block"></div>
            </div>
            <div className="form-group field-off_tel">
              <label className="control-label" htmlFor="off_tel">
                &nbsp;
              </label>
              <input
                type="text"
                id="off_tel"
                className="form-control"
                style={{ marginLeft: "5%" }}
                defaultValue={off_tel}
                {...register("off_tel")}
              />
              <div className="help-block"></div>
            </div>
          </div>

          <div className="col-md-12">
            <div
              className={
                "form-group field-about_me " +
                (errors?.about_me ? "has-error" : "")
              }
            >
              <label className="control-label" htmlFor="about_me">
                About Me <em>*</em>
              </label>
              <textarea
                id="about_me"
                className="form-control"
                rows="3"
                defaultValue={educational_background}
                {...register("about_me")}
              ></textarea>
              <div className="help-block">{errors?.about_me?.message}</div>
            </div>
          </div>

          <div className="col-md-12">
            <div
              className={
                "form-group field-professional " +
                (errors?.professional ? "has-error" : "")
              }
            >
              <label className="control-label">
                Are you a Professional? <em>*</em>
              </label>
              {areProfessional}
              <div id="professional" role="radiogroup">
                <label>
                  <input
                    type="radio"
                    defaultValue="1"
                    {...register("professional", {
                      onChange: (e) => {
                        setAreProfessional(areProfessional);
                      },
                    })}
                    checked={areProfessional === true ? areProfessional : ""}
                  />
                  Yes
                </label>
                <label>
                  <input
                    type="radio"
                    defaultValue="0"
                    {...register("professional", {
                      onChange: (e) => {
                        setAreProfessional(!areProfessional);
                      },
                    })}
                    checked={areProfessional === false ? true : ""}
                  />
                  No
                </label>
              </div>
              <div className="help-block">{errors?.professional?.message}</div>
            </div>
          </div>

          <div className="col-md-6">
            <div className="form-group field-website">
              <label className="control-label" htmlFor="website">
                Website URL
              </label>
              <input
                type="text"
                id="website"
                className="form-control"
                placeholder="Website URL"
                defaultValue={website}
                {...register("website")}
              />
              <div className="help-block"></div>
            </div>
          </div>

          <div className="col-md-6">
            <div className="form-group field-twitter">
              <label className="control-label" htmlFor="twitter">
                Twitter Profile
              </label>
              <input
                type="text"
                id="twitter"
                className="form-control"
                placeholder="Twitter Profile"
                defaultValue={twitter}
                {...register("twitter")}
              />
              <div className="help-block"></div>
            </div>
          </div>

          <div className="col-md-6">
            <div className="form-group field-linkedin">
              <label className="control-label" htmlFor="linkedin">
                Linkedin Profile
              </label>
              <input
                type="text"
                id="linkedin"
                className="form-control"
                name="linkedin"
                placeholder="Linkedin Profile"
                defaultValue={linkedin}
                {...register("linkedin")}
              />
              <div className="help-block"></div>
            </div>
          </div>

          <div className="col-md-6">
            <div className="form-group field-instagram">
              <label className="control-label" htmlFor="instagram">
                Instagram Profile
              </label>
              <input
                type="text"
                id="instagram"
                className="form-control"
                placeholder="Instagram Profile"
                defaultValue={instagram}
                {...register("instagram")}
              />
              <div className="help-block"></div>
            </div>
          </div>

          <div className="col-md-12 privacySettings">
            <h3>
              Privacy Settings - Hide personal information to other FPA members
            </h3>
            <div className="form-group field-email_privacy">
              <label>
                <input
                  type="checkbox"
                  id="email_privacy"
                  {...register("email_privacy", {
                    onChange: (e) => {
                      setValue(
                        "email_privacy",
                        e.target.checked ? "yes" : "no"
                      );
                      setEmailPrivacy(!emailPrivacy);
                    },
                  })}
                  checked={emailPrivacy}
                />
                Email
              </label>
              <div className="help-block"></div>
            </div>

            <div className="form-group field-mobile_privacy">
              <label>
                <input
                  type="checkbox"
                  id="mobile_privacy"
                  {...register("mobile_privacy", {
                    onChange: (e) => {
                      setValue(
                        "mobile_privacy",
                        e.target.checked ? "yes" : "no"
                      );
                      setMobilePrivacy(!mobilePrivacy);
                    },
                  })}
                  checked={mobilePrivacy}
                />
                Mobile
              </label>
              <div className="help-block"></div>
            </div>

            <div className="form-group field-resph_privacy">
              <label>
                <input
                  type="checkbox"
                  id="resph_privacy"
                  {...register("resph_privacy", {
                    onChange: (e) => {
                      setValue(
                        "resph_privacy",
                        e.target.checked ? "yes" : "no"
                      );
                      setResphPrivacy(!resphPrivacy);
                    },
                  })}
                  checked={resphPrivacy}
                />
                Res. phone
              </label>
              <div className="help-block"></div>
            </div>

            <div className="form-group field-offph_privacy">
              <label>
                <input
                  type="checkbox"
                  id="offph_privacy"
                  {...register("offph_privacy", {
                    onChange: (e) => {
                      setValue(
                        "offph_privacy",
                        e.target.checked ? "yes" : "no"
                      );
                      setOffphPrivacy(!offphPrivacy);
                    },
                  })}
                  checked={offphPrivacy}
                />
                Off. phone
              </label>
              <div className="help-block"></div>
            </div>
          </div>

          <div className="col-md-12">
            <button
              type="submit"
              className="btn btn-success pull-right profile-update-btn"
              name="profile-update"
              disabled={isDirty && !isValid}
              title="On the next page you have to update your professional details"
              data-toggle="tooltip"
              data-placement="top"
            >
              Step 2: Save and Continue
            </button>
          </div>
        </form>
      </>
    );
  }
}
