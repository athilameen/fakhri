"use client";

import { useSelector } from "react-redux";
import NotificationMessage from '@/components/NotificationMessage';

function IsProfileForm() {
  const getProfileForm = useSelector((state) => state.user.profileForm.form);
  return getProfileForm;
}

export default function ProfessionalPage() {
  
  const profileFormMsg = IsProfileForm();

  let notificationMessage;
  if (profileFormMsg && profileFormMsg === "Success") {
    notificationMessage = (
      <NotificationMessage alertClass="success">
        Your profile has been updated successfully.
      </NotificationMessage>
    )
  }

  return (
    <>
      {notificationMessage}
      <div className="col-lg-12">
        <h1>Professional Page</h1>
      </div>
    </>
  );
}
