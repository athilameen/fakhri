import AuthHeader from '@/components/AuthHeader';
import Footer from "@/components/Footer";
import ProfileHeader from '@/components/ProfileHeader';
import React from 'react'

export default function ProfessionalPage() {
  return (
    <>
        <AuthHeader />
        <ProfileHeader page="professional" />
        <h1>Professional Page</h1>
        <Footer />
    </>
  )
}
