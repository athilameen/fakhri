import AuthHeader from '@/components/AuthHeader';
import Footer from "@/components/Footer";
import ProfileHeader from '@/components/ProfileHeader';
import React from 'react'

export default function AchievementPage() {
  return (
    <>
        <AuthHeader />
        <ProfileHeader page="achievement" />
        <h1>Achievement Page</h1>
        <Footer />
    </>
  )
}
