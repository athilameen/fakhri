'use client'
 
import { usePathname } from 'next/navigation'
import ProfileHeader from "@/components/ProfileHeader";
import { useSelector } from "react-redux";

function IsUserProfessional() {
  const isProfessional = useSelector((state) => state.user.professional.isProfessional);
  return isProfessional;
}

export default function UserTemplate({ children }) {

    const getIsUserProfessional = IsUserProfessional();
    // console.log(getIsUserProfessional);

    // if(!getIsUserProfessional){
    //   window.location.href = '/profile';
    //   return;
    // }

    const pathname = usePathname();
    const getPage = (pathname === '/user') ? 'profile' : pathname;
    const page = getPage.replace('/user/', '');

  return (
    <>
      <ProfileHeader page={page} />
      {children}
    </>
  );
}
