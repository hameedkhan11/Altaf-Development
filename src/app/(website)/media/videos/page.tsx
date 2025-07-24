import { Hero } from '@/components/common/Hero'
import VideosPage from '@/components/media/VideoGallery'
import React from 'react'

const page = () => {
  return (
    <>
        <Hero 
        backgroundType='image'
        backgroundSrc='Booking1_rg1bhs'
        fallbackImage='luxury-apartments/hero-contact-fallback'
        height='half'
        overlay='medium'
        contentAlignment='center'
        ariaLabel='Video Gallery Hero Section'
        />
        <VideosPage />
    </>
  )
}

export default page