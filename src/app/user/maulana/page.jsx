import AuthHeader from '@/components/AuthHeader';
import Footer from "@/components/Footer";
import ProfileHeader from '@/components/ProfileHeader';
import React from 'react'

export default function MaulanaPage() {
  return (
    <>
        <AuthHeader />
        <ProfileHeader page="maulana" />
        <h1>Maulana Page</h1>
        <Footer />
    </>
  )
}
