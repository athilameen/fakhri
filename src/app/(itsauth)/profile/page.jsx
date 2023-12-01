"use client";

import { useState } from "react";
import Image from "next/image";
import ProfileHeader from "@/components/ProfileHeader";
import { useSelector } from "react-redux";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { fetchUserProfile, updateUserProfile } from "@/util/http";

import ProfileLoading from "@/components/ProfileLoading";
import ProfileError from "@/components/ProfileError";

function ITSUser() {
  const userItdId = useSelector((state) => state.user.value.itsId);
  return userItdId;
}

const schema = yup.object().shape({

  fullname: yup.string().required('Fullname cannot be blank'),
  email: yup.string().email('Please enter a valid email!').required('Email cannot be blank'),
  mobile: yup.string().required('Mobile cannot be blank').matches(/^[0-9]+$/, 'Only digits allowed').required('Mobile cannot be blank').min(9, 'Mobile minimum 9 character expected').max(13, 'Mobile shouldn\'t more up to 13 characters'),

});

let renderCounter = 0;

export default function ProfilePage() {

  //renderCounter++;

  const getItsId = ITSUser();
  
  const queryClient = useQueryClient();

  const [fetchItsId, setFetchItsId] = useState(undefined);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isDirty },
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'onChange'
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
    refetchOnWindowFocus: false,
    retry: 2,
    enabled: !fetchItsId,
  });

  const {
    mutate: submitProfile,
    isLoading: submitLoading,
    data: userUpdate,
  } = useMutation({
    mutationFn: async (profileData) => updateUserProfile(profileData),
    onSuccess: () => {
      console.log("Success");
      queryClient.invalidateQueries(["userProfile", getItsId]);
    },
    onError: () => {
      console.log("error");
    },
  });

  if (userDataPending || userDataLoading) return <ProfileLoading />;

  if (userDataError) return <ProfileError>{userDataErrorMessage}</ProfileError>;

  if (userProfileData) {

    const { email, its_id } = userProfileData;

    if (fetchItsId === undefined) {
      setFetchItsId(its_id);
    }

    return (
      <> 
        <ProfileHeader page="profile" />
        {/* <p>Render Counting {renderCounter}</p> */}
        <form
          id="form-profile"
          onSubmit={handleSubmit((profileData) => {
            submitProfile({id:getItsId, profileData})
            console.log(profileData);
          })}
        >

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
                    <a className="btn btn-primary btn-xs">
                      <i className="fa fa-pencil" aria-hidden="true"></i> Change
                    </a>
                    <a className="btn btn-primary btn-xs">
                      <i className="fa fa-trash" aria-hidden="true"></i> Delete
                    </a>
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
                        className="form-control"
                        {...register("fullname", {
                          required: "Fullname cannot be blank",
                        })}
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
                        name="its_id"
                        defaultValue={getItsId}
                        disabled
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
                        className="form-control"
                        defaultValue={email}
                        {...register("email", {
                          required: "Email cannot be blank",
                        })}
                      />
                      <div className="help-block">
                        {errors?.email?.message}
                      </div>
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="form-group field-jamaat">
                      <label className="control-label" htmlFor="jamaat">
                        Jamaat
                      </label>
                      <select
                        id="jamaat"
                        className="form-control"
                        name="jamaat"
                      >
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
                        className="form-control"
                        {...register("age")}
                      />
                      <div className="help-block"></div>
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="form-group field-age required">
                      <label className="control-label" htmlFor="mobile">
                        Mobile <em>*</em>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        {...register("mobile")}
                      />
                      <div className="help-block">
                        {errors?.mobile?.message}
                      </div>
                    </div>
                  </div>
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

            </div>
          </div>

        </form>
      </>
    );
  }

}