'use client'
 
import { usePathname } from 'next/navigation'
import ProfileHeader from "@/components/ProfileHeader";

export default function UserTemplate({ children }) {

    const pathname = usePathname();
    const page = (pathname === '/user') ? 'profile' : pathname.replace('/user/', '');

  return (
    <>
      <ProfileHeader page={page} />
      {children}
    </>
  );
}
